import { createClient } from '@/lib/supabase/server'
import { UnitsContent } from '@/components/units/units-content'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function UnitsPage() {
  const supabase = await createClient()
  const user = ADMIN_USER // Usuario admin sin validación

  // Obtener todas las unidades con conteo de pacientes
  const { data: units } = await supabase
    .from('hospital_units')
    .select('*')
    .order('code', { ascending: true })

  const { data: activeStays } = await supabase
    .from('unit_stays')
    .select('id, unit_id')
    .eq('status', 'active')

  const unitsWithPatients = (units || []).map(unit => ({
    ...unit,
    type: unit.code, // Mapear code a type para compatibilidad con el componente
    activePatients: (activeStays || []).filter(s => s.unit_id === unit.id).length
  }))

  return <UnitsContent units={unitsWithPatients} user={user} />
}
