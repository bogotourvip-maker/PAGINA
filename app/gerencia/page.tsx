'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Bed,
  Users,
  Clock,
  DollarSign,
  AlertTriangle,
  Activity,
  Building2,
  Calendar,
  FileBarChart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react'
import { ADMIN_USER } from '@/lib/mock-user'

// Tipos para KPIs
interface KPIData {
  label: string
  value: number | string
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  unit?: string
  target?: number
}

interface UnitOccupancy {
  name: string
  code: string
  totalBeds: number
  occupiedBeds: number
  avgStayDays: number
  turnoverRate: number
}

export default function GerenciaPage() {
  const [period, setPeriod] = useState('month')
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Datos simulados para KPIs (en producción vendrían de la base de datos)
  const [kpis, setKpis] = useState<Record<string, KPIData>>({
    totalPatients: { label: 'Pacientes Activos', value: 47, change: 12, trend: 'up' },
    admissionsToday: { label: 'Ingresos Hoy', value: 8, change: -2, trend: 'down' },
    dischargesToday: { label: 'Egresos Hoy', value: 5, change: 1, trend: 'up' },
    avgStayDays: { label: 'Promedio Estancia', value: 4.2, unit: 'días', change: -0.3, trend: 'down' },
    occupancyRate: { label: 'Ocupación General', value: 78, unit: '%', target: 85 },
    bedTurnover: { label: 'Giro de Cama', value: 5.8, unit: 'pacientes/cama/mes', change: 0.4, trend: 'up' },
    triageWaiting: { label: 'Espera en Triage', value: 3, trend: 'neutral' },
    avgTriageTime: { label: 'Tiempo Promedio Triage', value: 18, unit: 'min', target: 15 },
  })

  // Ocupación por unidad
  const [unitsOccupancy, setUnitsOccupancy] = useState<UnitOccupancy[]>([
    { name: 'UCI', code: 'uci', totalBeds: 8, occupiedBeds: 7, avgStayDays: 6.5, turnoverRate: 3.2 },
    { name: 'Intermedios', code: 'intermedios', totalBeds: 10, occupiedBeds: 8, avgStayDays: 4.2, turnoverRate: 5.1 },
    { name: 'Hospitalización', code: 'hospitalizacion', totalBeds: 50, occupiedBeds: 35, avgStayDays: 3.8, turnoverRate: 6.8 },
    { name: 'Observación', code: 'observacion', totalBeds: 15, occupiedBeds: 12, avgStayDays: 1.2, turnoverRate: 18.5 },
    { name: 'Urgencias', code: 'urgencias', totalBeds: 20, occupiedBeds: 14, avgStayDays: 0.5, turnoverRate: 45.2 },
  ])

  // Indicadores financieros (simulados)
  const financialKpis = {
    avgCostPerPatient: { value: 2450000, label: 'Costo Promedio/Paciente', unit: 'COP' },
    avgBillingPerPatient: { value: 3200000, label: 'Facturación Promedio/Paciente', unit: 'COP' },
    glosaRate: { value: 8.5, label: 'Tasa de Glosas', unit: '%', target: 5 },
    collectability: { value: 92, label: 'Recaudabilidad', unit: '%', target: 95 },
  }

  // Cargar datos de localStorage
  useEffect(() => {
    loadDataFromStorage()
  }, [])

  const loadDataFromStorage = () => {
    setIsLoading(true)
    
    // Cargar pacientes hospitalizados
    const hospitalized = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
    const movements = JSON.parse(localStorage.getItem('patientMovements') || '[]')
    const triagePatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
    
    // Calcular KPIs reales
    const today = new Date().toDateString()
    const todayMovements = movements.filter((m: { date: string }) => 
      new Date(m.date).toDateString() === today
    )
    
    const admissionsToday = todayMovements.filter((m: { type: string }) => m.type === 'ingreso').length
    const dischargesToday = todayMovements.filter((m: { type: string }) => m.type === 'alta').length
    
    setKpis(prev => ({
      ...prev,
      totalPatients: { ...prev.totalPatients, value: hospitalized.length },
      admissionsToday: { ...prev.admissionsToday, value: admissionsToday },
      dischargesToday: { ...prev.dischargesToday, value: dischargesToday },
      triageWaiting: { ...prev.triageWaiting, value: triagePatients.length },
    }))

    // Actualizar ocupación por unidad
    const updatedUnits = unitsOccupancy.map(unit => {
      const patientsInUnit = hospitalized.filter((p: { unitCode: string }) => 
        p.unitCode === unit.code
      ).length
      return { ...unit, occupiedBeds: patientsInUnit || unit.occupiedBeds }
    })
    setUnitsOccupancy(updatedUnits)
    
    setLastUpdate(new Date())
    setIsLoading(false)
  }

  const refreshData = () => {
    loadDataFromStorage()
  }

  // Calcular ocupación total
  const totalOccupancy = Math.round(
    (unitsOccupancy.reduce((sum, u) => sum + u.occupiedBeds, 0) / 
     unitsOccupancy.reduce((sum, u) => sum + u.totalBeds, 0)) * 100
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Dashboard Gerencial</h1>
              <p className="text-muted-foreground">
                Indicadores clave de gestión hospitalaria
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Última actualización: {lastUpdate.toLocaleTimeString('es-CO')}
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
        </div>

        {/* KPIs principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pacientes Activos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.totalPatients.value}</div>
              <div className="flex items-center text-sm mt-1">
                {kpis.totalPatients.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={kpis.totalPatients.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {kpis.totalPatients.change}
                </span>
                <span className="text-muted-foreground ml-1">vs ayer</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ocupación General
              </CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalOccupancy}%</div>
              <Progress value={totalOccupancy} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Meta: {kpis.occupancyRate.target}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Promedio Estancia
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.avgStayDays.value} <span className="text-lg font-normal">días</span></div>
              <div className="flex items-center text-sm mt-1">
                <ArrowDownRight className="h-4 w-4 text-green-500" />
                <span className="text-green-500">{Math.abs(kpis.avgStayDays.change || 0)}</span>
                <span className="text-muted-foreground ml-1">días (mejora)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Giro de Cama
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.bedTurnover.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                pacientes/cama/mes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ingresos y Egresos */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Ingresos Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{kpis.admissionsToday.value}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-blue-500" />
                Egresos Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{kpis.dischargesToday.value}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                En Espera Triage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-yellow-600">{kpis.triageWaiting.value}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="occupancy" className="space-y-6">
          <TabsList>
            <TabsTrigger value="occupancy">Ocupación por Unidad</TabsTrigger>
            <TabsTrigger value="financial">Indicadores Financieros</TabsTrigger>
            <TabsTrigger value="quality">Calidad</TabsTrigger>
          </TabsList>

          {/* Ocupación por Unidad */}
          <TabsContent value="occupancy">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unitsOccupancy.map((unit) => {
                const occupancyPercent = Math.round((unit.occupiedBeds / unit.totalBeds) * 100)
                const isHighOccupancy = occupancyPercent >= 90
                const isCritical = occupancyPercent >= 95

                return (
                  <Card key={unit.code} className={isCritical ? 'border-red-500' : ''}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {unit.name}
                        </CardTitle>
                        <Badge variant={isCritical ? 'destructive' : isHighOccupancy ? 'secondary' : 'default'}>
                          {occupancyPercent}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Ocupación</span>
                          <span>{unit.occupiedBeds} / {unit.totalBeds} camas</span>
                        </div>
                        <Progress 
                          value={occupancyPercent} 
                          className={isCritical ? '[&>div]:bg-red-500' : isHighOccupancy ? '[&>div]:bg-yellow-500' : ''}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">Prom. Estancia</p>
                          <p className="font-semibold">{unit.avgStayDays} días</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Giro Cama</p>
                          <p className="font-semibold">{unit.turnoverRate}</p>
                        </div>
                      </div>

                      {isCritical && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                          <AlertTriangle className="h-4 w-4" />
                          Ocupación crítica
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Indicadores Financieros */}
          <TabsContent value="financial">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Costo Promedio/Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${(financialKpis.avgCostPerPatient.value / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-muted-foreground">COP</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Facturación Promedio/Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${(financialKpis.avgBillingPerPatient.value / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-muted-foreground">COP</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Tasa de Glosas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {financialKpis.glosaRate.value}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Meta: {financialKpis.glosaRate.target}%
                  </p>
                  <Progress value={financialKpis.glosaRate.value * 10} className="mt-2 [&>div]:bg-red-500" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Recaudabilidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {financialKpis.collectability.value}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Meta: {financialKpis.collectability.target}%
                  </p>
                  <Progress value={financialKpis.collectability.value} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Análisis de Rentabilidad por Servicio
                </CardTitle>
                <CardDescription>
                  Comparación de costos vs facturación por unidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unitsOccupancy.map((unit) => {
                    const margin = Math.random() * 30 + 10 // Simulado
                    return (
                      <div key={unit.code} className="flex items-center gap-4">
                        <div className="w-32 font-medium">{unit.name}</div>
                        <div className="flex-1">
                          <Progress value={margin + 50} />
                        </div>
                        <div className={`w-20 text-right font-semibold ${margin > 20 ? 'text-green-600' : 'text-yellow-600'}`}>
                          +{margin.toFixed(1)}%
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Indicadores de Calidad */}
          <TabsContent value="quality">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Oportunidad en Triage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{kpis.avgTriageTime.value} min</div>
                  <p className="text-xs text-muted-foreground">Meta: {kpis.avgTriageTime.target} min</p>
                  <Progress 
                    value={100 - ((kpis.avgTriageTime.value as number) / 30 * 100)} 
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Reingresos a 30 días</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">Meta: &lt;5%</p>
                  <Badge variant="default" className="mt-2 bg-green-500">Cumple</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Satisfacción del Paciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.5/5</div>
                  <p className="text-xs text-muted-foreground">Basado en 234 encuestas</p>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-4 h-4 rounded ${i <= 4 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Eventos Adversos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                  <Badge variant="secondary" className="mt-2">En seguimiento</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Adherencia a Protocolos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">Meta: 95%</p>
                  <Progress value={94} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Infecciones Asociadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1.2%</div>
                  <p className="text-xs text-muted-foreground">Meta: &lt;2%</p>
                  <Badge variant="default" className="mt-2 bg-green-500">Cumple</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
