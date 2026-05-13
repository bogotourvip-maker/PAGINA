import { createClient } from '@/lib/supabase/server'
import { TriageContent } from '@/components/triage/triage-content'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function TriagePage() {
  const supabase = await createClient()

  // Obtener pacientes en triage (con admisión en estado triage)
  const { data: admissions, error: admError } = await supabase
    .from('admissions')
    .select('*')
    .eq('status', 'triage')
    .order('admission_date', { ascending: true })

  // Obtener los pacientes correspondientes
  const patientIds = (admissions || []).map(a => a.patient_id)
  
  let patients: Array<Record<string, unknown>> = []
  if (patientIds.length > 0) {
    const { data: patientsData } = await supabase
      .from('patients')
      .select('*')
      .in('id', patientIds)
    
    patients = (patientsData || []).map(patient => {
      const admission = (admissions || []).find(a => a.patient_id === patient.id)
      return { ...patient, admission }
    })
  }

  // Obtener unidades disponibles para hospitalización
  const { data: units } = await supabase
    .from('hospital_units')
    .select('*')
    .order('code', { ascending: true })

  // Unidades por defecto para pruebas
  const defaultUnits = [
    { id: '1', name: 'Urgencias', code: 'urgencias', total_beds: 20, available_beds: 15 },
    { id: '2', name: 'Observación', code: 'observacion', total_beds: 15, available_beds: 10 },
    { id: '3', name: 'Hospitalización', code: 'hospitalizacion', total_beds: 50, available_beds: 35 },
    { id: '4', name: 'Unidad de Intermedios', code: 'intermedios', total_beds: 10, available_beds: 6 },
    { id: '5', name: 'UCI', code: 'uci', total_beds: 8, available_beds: 3 },
  ]

  // Pacientes de demostración para Triage
  const demoPatients = [
    {
      id: 'demo-1',
      document_type: 'CC',
      document_number: '1234567890',
      first_name: 'María',
      last_name: 'García López',
      date_of_birth: '1985-03-15',
      gender: 'F',
      phone: '3001234567',
      insurance_provider: 'EPS Sura',
      admission: {
        id: 'adm-1',
        admission_reason: 'Dolor abdominal intenso desde hace 2 días',
        admission_date: new Date(Date.now() - 30 * 60000).toISOString(), // 30 min ago
        status: 'triage'
      }
    },
    {
      id: 'demo-2',
      document_type: 'CC',
      document_number: '9876543210',
      first_name: 'Carlos',
      last_name: 'Rodríguez Pérez',
      date_of_birth: '1970-08-22',
      gender: 'M',
      phone: '3109876543',
      insurance_provider: 'Nueva EPS',
      admission: {
        id: 'adm-2',
        admission_reason: 'Dificultad respiratoria y fiebre alta',
        admission_date: new Date(Date.now() - 15 * 60000).toISOString(), // 15 min ago
        status: 'triage'
      }
    },
    {
      id: 'demo-3',
      document_type: 'TI',
      document_number: '1001234567',
      first_name: 'Sofía',
      last_name: 'Martínez Ruiz',
      date_of_birth: '2010-12-01',
      gender: 'F',
      phone: '3201112233',
      insurance_provider: 'Sanitas',
      admission: {
        id: 'adm-3',
        admission_reason: 'Caída de bicicleta con golpe en la cabeza',
        admission_date: new Date(Date.now() - 5 * 60000).toISOString(), // 5 min ago
        status: 'triage'
      }
    },
  ]

  // Usar pacientes reales si existen, sino usar demo
  const finalPatients = patients.length > 0 ? patients : demoPatients

  return (
    <TriageContent 
      patients={finalPatients as never[]} 
      units={units && units.length > 0 ? units : defaultUnits} 
      user={ADMIN_USER} 
    />
  )
}
