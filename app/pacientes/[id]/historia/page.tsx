import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MedicalRecordContent } from '@/components/medical-records/medical-record-content'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function MedicalRecordPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const user = ADMIN_USER

  // Obtener paciente
  const { data: patient } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single()

  if (!patient) {
    redirect('/pacientes')
  }

  // Obtener registros médicos
  const { data: medicalRecords } = await supabase
    .from('medical_records')
    .select(`
      *,
      created_by_user:user_profiles!medical_records_created_by_fkey(full_name, role)
    `)
    .eq('patient_id', id)
    .order('record_date', { ascending: false })

  return (
    <MedicalRecordContent
      patient={patient}
      medicalRecords={medicalRecords || []}
      user={user}
    />
  )
}
