import { createClient } from '@/lib/supabase/server'
import { NewPatientForm } from '@/components/patients/new-patient-form'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function NewPatientPage() {
  const supabase = await createClient()
  const user = ADMIN_USER

  // Obtener unidades disponibles
  const { data: units, error } = await supabase
    .from('hospital_units')
    .select('id, name, code, total_beds, available_beds')
    .order('code', { ascending: true })

  console.log('[v0] Units query result:', { units, error })

  // Si hay error o no hay unidades, mostrar unidades por defecto para pruebas
  const defaultUnits = [
    { id: '1', name: 'Urgencias', code: 'urgencias', total_beds: 20, available_beds: 15 },
    { id: '2', name: 'Observación', code: 'observacion', total_beds: 15, available_beds: 10 },
    { id: '3', name: 'Hospitalización', code: 'hospitalizacion', total_beds: 50, available_beds: 35 },
    { id: '4', name: 'Unidad de Intermedios', code: 'intermedios', total_beds: 10, available_beds: 6 },
    { id: '5', name: 'UCI', code: 'uci', total_beds: 8, available_beds: 3 },
  ]

  return <NewPatientForm units={units && units.length > 0 ? units : defaultUnits} user={user} />
}
