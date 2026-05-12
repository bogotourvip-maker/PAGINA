import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TransferPatientForm } from '@/components/patients/transfer-patient-form'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function TransferPatientPage({
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
    .select(`
      *,
      unit:units!patients_current_unit_id_fkey(id, name, type)
    `)
    .eq('id', id)
    .eq('status', 'activo')
    .single()

  if (!patient) {
    redirect('/pacientes')
  }

  // Obtener unidades disponibles
  const { data: units } = await supabase
    .from('units')
    .select('id, name, type, available_beds')
    .order('type', { ascending: true })

  return <TransferPatientForm patient={patient} units={units || []} user={user} />
}
