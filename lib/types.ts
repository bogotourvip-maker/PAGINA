export type UserRole =
  | 'medico'
  | 'enfermera'
  | 'auxiliar_enfermeria'
  | 'terapia_fisica'
  | 'terapia_ocupacional'
  | 'terapia_respiratoria'
  | 'especialista'
  | 'admin'

export type UnitType =
  | 'triage'
  | 'consulta_externa'
  | 'urgencias'
  | 'observacion'
  | 'hospitalizacion'
  | 'intermedios'
  | 'uci'

export type PatientStatus = 'activo' | 'dado_de_alta' | 'trasladado' | 'fallecido'

export type TriageLevel = 1 | 2 | 3 | 4 | 5 // 1 = Resucitación (más grave), 5 = No urgente

export type AdmissionStatus = 
  | 'triage'           // En espera de valoración
  | 'consulta_externa' // Enviado a consulta externa
  | 'active'           // Hospitalizado
  | 'discharged'       // Dado de alta
  | 'transferred'      // Trasladado a otra institución

export type Gender = 'masculino' | 'femenino' | 'otro'

export interface UserProfile {
  id: string
  full_name: string
  role: UserRole
  license_number: string
  created_at: string
  updated_at: string
}

export interface Unit {
  id: string
  name: string
  code: UnitType
  description?: string
  total_beds: number
  available_beds: number
  created_at: string
  updated_at: string
}

export interface Patient {
  id: string
  document_type: string
  document_number: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  blood_type?: string
  phone?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  address?: string
  city?: string
  insurance_provider?: string
  insurance_number?: string
  allergies?: string
  chronic_conditions?: string
  current_medications?: string
  created_at: string
  updated_at: string
  // Campos calculados/joins
  current_admission?: Admission
  current_stay?: UnitStay
}

export interface Admission {
  id: string
  patient_id: string
  admission_date: string
  discharge_date?: string
  admission_reason: string
  admission_diagnosis?: string
  discharge_diagnosis?: string
  status: AdmissionStatus
  triage_level?: TriageLevel
  triage_notes?: string
  triage_date?: string
  attending_physician_id?: string
  created_at: string
  updated_at: string
}

export interface UnitStay {
  id: string
  admission_id: string
  patient_id: string
  unit_id: string
  entry_date: string
  exit_date?: string
  days_count: number
  bed_number?: string
  status: 'active' | 'completed'
  created_at: string
  updated_at: string
  unit?: Unit
}

export interface Transfer {
  id: string
  patient_id: string
  from_unit_id?: string
  to_unit_id: string
  transfer_date: string
  reason?: string
  authorized_by: string
  notes?: string
  days_in_previous_unit?: number
  created_at: string
  patient?: Patient
  from_unit?: Unit
  to_unit?: Unit
  authorized_user?: UserProfile
}

export interface MedicalRecord {
  id: string
  patient_id: string
  created_by: string
  record_date: string
  chief_complaint?: string
  history_present_illness?: string
  past_medical_history?: string
  medications?: string
  allergies?: string
  physical_examination?: string
  diagnosis?: string
  treatment_plan?: string
  notes?: string
  created_at: string
  updated_at: string
  patient?: Patient
  created_by_user?: UserProfile
}

export interface SpecialtyNote {
  id: string
  patient_id: string
  created_by: string
  specialty_type: UserRole
  note_date: string
  assessment?: string
  intervention?: string
  plan?: string
  progress?: string
  notes?: string
  created_at: string
  updated_at: string
  patient?: Patient
  created_by_user?: UserProfile
}

export interface VitalSign {
  id: string
  patient_id: string
  recorded_by: string
  recorded_at: string
  temperature?: number
  heart_rate?: number
  blood_pressure_systolic?: number
  blood_pressure_diastolic?: number
  respiratory_rate?: number
  oxygen_saturation?: number
  weight?: number
  height?: number
  bmi?: number
  notes?: string
  created_at: string
  patient?: Patient
  recorded_by_user?: UserProfile
}

export interface DashboardStats {
  totalPatients: number
  activePatients: number
  totalUnits: number
  occupiedBeds: number
  availableBeds: number
  urgenciasPatients: number
  observacionPatients: number
  hospitalizacionPatients: number
  intermediosPatients: number
  uciPatients: number
}
