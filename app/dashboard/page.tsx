import { createClient } from '@/lib/supabase/server'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import type { DashboardStats } from '@/lib/types'
import { ADMIN_USER } from '@/lib/mock-user'

export default async function DashboardPage() {
  const supabase = await createClient()
  const user = ADMIN_USER // Usuario admin sin validación

  // Obtener estadísticas del dashboard
  const [patientsResult, unitsResult, activeStaysResult] = await Promise.all([
    supabase.from('patients').select('id'),
    supabase.from('hospital_units').select('id, name, code, total_beds, available_beds'),
    supabase.from('unit_stays').select('id, unit_id, patient_id').eq('status', 'active'),
  ])

  const patients = patientsResult.data || []
  const units = unitsResult.data || []
  const activeStays = activeStaysResult.data || []

  const activePatients = activeStays
  
  const totalBeds = units.reduce((sum, unit) => sum + unit.total_beds, 0)
  const availableBeds = units.reduce((sum, unit) => sum + unit.available_beds, 0)
  const occupiedBeds = totalBeds - availableBeds

  const getPatientsByUnit = (unitCode: string) => {
    const unitIds = units.filter((u) => u.code === unitCode).map((u) => u.id)
    return activeStays.filter((s) => unitIds.includes(s.unit_id)).length
  }

  const stats: DashboardStats = {
    totalPatients: patients.length,
    activePatients: activePatients.length,
    totalUnits: units.length,
    occupiedBeds,
    availableBeds,
    urgenciasPatients: getPatientsByUnit('urgencias'),
    observacionPatients: getPatientsByUnit('observacion'),
    hospitalizacionPatients: getPatientsByUnit('hospitalizacion'),
    intermediosPatients: getPatientsByUnit('intermedios'),
    uciPatients: getPatientsByUnit('uci'),
  }

  return <DashboardContent stats={stats} units={units} user={user} />
}
