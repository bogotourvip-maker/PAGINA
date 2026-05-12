-- Sistema Hospitalario - Esquema Base de Datos
-- Creación de tablas principales para gestión de pacientes, unidades y personal

-- Tabla de perfiles de usuario (médicos, enfermeras, auxiliares, terapeutas)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'medico', 'enfermera', 'auxiliar_enfermeria', 'terapia_fisica', 'terapia_ocupacional', 'terapia_respiratoria', 'especialista')),
  specialty TEXT, -- Para médicos especialistas
  license_number TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de unidades hospitalarias
CREATE TABLE IF NOT EXISTS public.hospital_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL CHECK (code IN ('urgencias', 'observacion', 'hospitalizacion', 'intermedios', 'uci')),
  description TEXT,
  total_beds INTEGER NOT NULL DEFAULT 0,
  available_beds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de pacientes
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type TEXT NOT NULL CHECK (document_type IN ('CC', 'TI', 'CE', 'RC', 'PA')),
  document_number TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('M', 'F', 'Otro')),
  blood_type TEXT CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  phone TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  address TEXT,
  city TEXT,
  insurance_provider TEXT,
  insurance_number TEXT,
  allergies TEXT,
  chronic_conditions TEXT,
  current_medications TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de ingresos hospitalarios (admisiones)
CREATE TABLE IF NOT EXISTS public.admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  admission_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  discharge_date TIMESTAMPTZ,
  admission_reason TEXT NOT NULL,
  admission_diagnosis TEXT,
  discharge_diagnosis TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'discharged', 'transferred')),
  attending_physician_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de traslados entre unidades
CREATE TABLE IF NOT EXISTS public.unit_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_id UUID NOT NULL REFERENCES public.admissions(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  from_unit_id UUID REFERENCES public.hospital_units(id),
  to_unit_id UUID NOT NULL REFERENCES public.hospital_units(id),
  transfer_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  transfer_reason TEXT NOT NULL,
  authorized_by_id UUID REFERENCES public.profiles(id),
  bed_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de estancias en unidades (tracking de días por unidad)
CREATE TABLE IF NOT EXISTS public.unit_stays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_id UUID NOT NULL REFERENCES public.admissions(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  unit_id UUID NOT NULL REFERENCES public.hospital_units(id),
  entry_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  exit_date TIMESTAMPTZ,
  days_count INTEGER DEFAULT 0,
  bed_number TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de historias clínicas
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  admission_id UUID REFERENCES public.admissions(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL CHECK (record_type IN ('ingreso', 'evolucion', 'procedimiento', 'orden_medica', 'nota_enfermeria', 'nota_auxiliar')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  vital_signs JSONB, -- {temperatura, presion_arterial, frecuencia_cardiaca, frecuencia_respiratoria, saturacion_oxigeno}
  created_by_id UUID NOT NULL REFERENCES public.profiles(id),
  created_by_role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de notas de especialidades
CREATE TABLE IF NOT EXISTS public.specialty_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  admission_id UUID REFERENCES public.admissions(id) ON DELETE CASCADE,
  specialty TEXT NOT NULL CHECK (specialty IN ('terapia_fisica', 'terapia_ocupacional', 'terapia_respiratoria', 'cardiologia', 'neurologia', 'cirugia', 'psicologia', 'nutricion', 'trabajo_social', 'otro')),
  title TEXT NOT NULL,
  assessment TEXT NOT NULL, -- Evaluación
  plan TEXT NOT NULL, -- Plan de tratamiento
  progress TEXT, -- Progreso
  recommendations TEXT, -- Recomendaciones
  next_session_date DATE,
  created_by_id UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de signos vitales
CREATE TABLE IF NOT EXISTS public.vital_signs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  admission_id UUID REFERENCES public.admissions(id) ON DELETE CASCADE,
  temperature DECIMAL(4,1), -- °C
  systolic_bp INTEGER, -- mmHg
  diastolic_bp INTEGER, -- mmHg
  heart_rate INTEGER, -- bpm
  respiratory_rate INTEGER, -- rpm
  oxygen_saturation INTEGER, -- %
  pain_scale INTEGER CHECK (pain_scale >= 0 AND pain_scale <= 10),
  weight DECIMAL(5,2), -- kg
  height DECIMAL(5,2), -- cm
  notes TEXT,
  recorded_by_id UUID NOT NULL REFERENCES public.profiles(id),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de medicamentos administrados
CREATE TABLE IF NOT EXISTS public.medication_administration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  admission_id UUID REFERENCES public.admissions(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  dose TEXT NOT NULL,
  route TEXT NOT NULL, -- via: oral, IV, IM, SC, etc.
  frequency TEXT NOT NULL,
  administered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  administered_by_id UUID NOT NULL REFERENCES public.profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_admissions_patient ON public.admissions(patient_id);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admissions(status);
CREATE INDEX IF NOT EXISTS idx_unit_transfers_admission ON public.unit_transfers(admission_id);
CREATE INDEX IF NOT EXISTS idx_unit_stays_admission ON public.unit_stays(admission_id);
CREATE INDEX IF NOT EXISTS idx_unit_stays_unit ON public.unit_stays(unit_id);
CREATE INDEX IF NOT EXISTS idx_unit_stays_status ON public.unit_stays(status);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient ON public.medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_admission ON public.medical_records(admission_id);
CREATE INDEX IF NOT EXISTS idx_specialty_notes_patient ON public.specialty_notes(patient_id);
CREATE INDEX IF NOT EXISTS idx_vital_signs_patient ON public.vital_signs(patient_id);
CREATE INDEX IF NOT EXISTS idx_medication_administration_patient ON public.medication_administration(patient_id);

-- Insertar unidades hospitalarias por defecto
INSERT INTO public.hospital_units (name, code, description, total_beds, available_beds) VALUES
  ('Urgencias', 'urgencias', 'Área de atención de emergencias y urgencias médicas', 20, 20),
  ('Observación', 'observacion', 'Área de observación y monitoreo de pacientes', 15, 15),
  ('Hospitalización', 'hospitalizacion', 'Área de hospitalización general', 40, 40),
  ('Unidad de Intermedios', 'intermedios', 'Unidad de cuidados intermedios', 12, 12),
  ('Unidad de Cuidados Intensivos (UCI)', 'uci', 'Unidad de cuidados intensivos', 10, 10)
ON CONFLICT (code) DO NOTHING;
