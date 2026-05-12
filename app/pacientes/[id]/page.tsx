import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PatientDetails } from '@/components/patients/patient-details'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const user = ADMIN_USER

  // Obtener datos del paciente
  const { data: patient } = await supabase
    .from('patients')
    .select(`
      *,
      unit:units!patients_current_unit_id_fkey(id, name, type)
    `)
    .eq('id', id)
    .single()

  if (!patient) {
    redirect('/pacientes')
  }

  // Obtener historial de traslados
  const { data: transfers } = await supabase
    .from('transfers')
    .select(`
      *,
      from_unit:units!transfers_from_unit_id_fkey(name, type),
      to_unit:units!transfers_to_unit_id_fkey(name, type),
      authorized_user:user_profiles!transfers_authorized_by_fkey(full_name, role)
    `)
    .eq('patient_id', id)
    .order('transfer_date', { ascending: false })

  // Obtener signos vitales recientes
  const { data: vitalSigns } = await supabase
    .from('vital_signs')
    .select(`
      *,
      recorded_by_user:user_profiles!vital_signs_recorded_by_fkey(full_name, role)
    `)
    .eq('patient_id', id)
    .order('recorded_at', { ascending: false })
    .limit(10)

  return (
    <PatientDetails
      patient={patient}
      transfers={transfers || []}
      vitalSigns={vitalSigns || []}
      user={user}
    />
  )
}
