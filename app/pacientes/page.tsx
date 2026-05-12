import { createClient } from '@/lib/supabase/server'
import { PatientsContent } from '@/components/patients/patients-content'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function PatientsPage() {
  const supabase = await createClient()
  const user = ADMIN_USER // Usuario admin sin validación

  // Obtener todos los pacientes
  const { data: patients } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false })

  // Obtener admisiones activas
  const { data: admissions } = await supabase
    .from('admissions')
    .select('*')
    .eq('status', 'active')

  // Obtener estancias activas con unidades
  const { data: stays } = await supabase
    .from('unit_stays')
    .select(`
      *,
      unit:hospital_units(id, name, code)
    `)
    .eq('status', 'active')

  // Combinar datos
  const patientsWithData = (patients || []).map(patient => {
    const admission = (admissions || []).find(a => a.patient_id === patient.id)
    const stay = (stays || []).find(s => s.patient_id === patient.id)
    return {
      ...patient,
      identification: patient.document_number,
      status: admission ? 'activo' : 'dado_de_alta',
      current_admission: admission,
      current_stay: stay,
      unit: stay?.unit,
      current_bed_number: stay?.bed_number,
      diagnosis: admission?.admission_diagnosis,
    }
  })

  return <PatientsContent patients={patientsWithData} user={user} />
}
