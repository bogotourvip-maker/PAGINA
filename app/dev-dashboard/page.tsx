import { createClient } from '@/lib/supabase/server'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import type { DashboardStats } from '@/lib/types'

export default async function DevDashboardPage() {
  const supabase = await createClient()

  // Usuario mock para desarrollo
  const mockUser = {
    id: 'dev-user-123',
    email: 'admin@hospital.com',
    user_metadata: {
      full_name: 'Administrador Demo',
      role: 'admin',
      license_number: 'ADMIN-001',
    },
  }

  // Obtener estadísticas del dashboard
  const [patientsResult, unitsResult] = await Promise.all([
    supabase.from('patients').select('id, status, current_unit_id'),
    supabase.from('units').select('id, name, type, total_beds, available_beds'),
  ])

  const patients = patientsResult.data || []
  const units = unitsResult.data || []

  const activePatients = patients.filter((p) => p.status === 'activo')
  
  const totalBeds = units.reduce((sum, unit) => sum + unit.total_beds, 0)
  const availableBeds = units.reduce((sum, unit) => sum + unit.available_beds, 0)
  const occupiedBeds = totalBeds - availableBeds

  const getPatientsByUnit = (unitType: string) => {
    const unitIds = units.filter((u) => u.type === unitType).map((u) => u.id)
    return activePatients.filter((p) => unitIds.includes(p.current_unit_id || '')).length
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

  return (
    <div>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p className="font-bold">Modo Desarrollo</p>
        <p className="text-sm">Estás usando el dashboard de desarrollo sin autenticación.</p>
      </div>
      <DashboardContent stats={stats} units={units} user={mockUser as any} />
    </div>
  )
}
