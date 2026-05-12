-- Row Level Security (RLS) Policies para el Sistema Hospitalario

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospital_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unit_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unit_stays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialty_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_administration ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles (usuarios autenticados pueden ver todos los perfiles)
CREATE POLICY "profiles_select_authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Políticas para hospital_units (todos los usuarios autenticados pueden ver las unidades)
CREATE POLICY "units_select_authenticated" ON public.hospital_units FOR SELECT TO authenticated USING (true);
CREATE POLICY "units_update_authenticated" ON public.hospital_units FOR UPDATE TO authenticated USING (true);

-- Políticas para patients (personal médico puede ver y gestionar pacientes)
CREATE POLICY "patients_select_authenticated" ON public.patients FOR SELECT TO authenticated USING (true);
CREATE POLICY "patients_insert_authenticated" ON public.patients FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "patients_update_authenticated" ON public.patients FOR UPDATE TO authenticated USING (true);

-- Políticas para admissions
CREATE POLICY "admissions_select_authenticated" ON public.admissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "admissions_insert_authenticated" ON public.admissions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admissions_update_authenticated" ON public.admissions FOR UPDATE TO authenticated USING (true);

-- Políticas para unit_transfers
CREATE POLICY "transfers_select_authenticated" ON public.unit_transfers FOR SELECT TO authenticated USING (true);
CREATE POLICY "transfers_insert_authenticated" ON public.unit_transfers FOR INSERT TO authenticated WITH CHECK (true);

-- Políticas para unit_stays
CREATE POLICY "stays_select_authenticated" ON public.unit_stays FOR SELECT TO authenticated USING (true);
CREATE POLICY "stays_insert_authenticated" ON public.unit_stays FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "stays_update_authenticated" ON public.unit_stays FOR UPDATE TO authenticated USING (true);

-- Políticas para medical_records
CREATE POLICY "records_select_authenticated" ON public.medical_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "records_insert_authenticated" ON public.medical_records FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "records_update_own" ON public.medical_records FOR UPDATE TO authenticated USING (created_by_id = auth.uid());

-- Políticas para specialty_notes
CREATE POLICY "specialty_notes_select_authenticated" ON public.specialty_notes FOR SELECT TO authenticated USING (true);
CREATE POLICY "specialty_notes_insert_authenticated" ON public.specialty_notes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "specialty_notes_update_own" ON public.specialty_notes FOR UPDATE TO authenticated USING (created_by_id = auth.uid());

-- Políticas para vital_signs
CREATE POLICY "vital_signs_select_authenticated" ON public.vital_signs FOR SELECT TO authenticated USING (true);
CREATE POLICY "vital_signs_insert_authenticated" ON public.vital_signs FOR INSERT TO authenticated WITH CHECK (true);

-- Políticas para medication_administration
CREATE POLICY "medication_select_authenticated" ON public.medication_administration FOR SELECT TO authenticated USING (true);
CREATE POLICY "medication_insert_authenticated" ON public.medication_administration FOR INSERT TO authenticated WITH CHECK (true);
