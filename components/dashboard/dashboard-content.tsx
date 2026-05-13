'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Activity, Bed, Building2, Users, UserPlus, Stethoscope, ClipboardList, ArrowRight } from 'lucide-react'
import type { DashboardStats, Unit } from '@/lib/types'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { DashboardHeader } from './dashboard-header'

interface DashboardContentProps {
  stats: DashboardStats
  units: Unit[]
  user: User
}

interface LocalStats {
  triagePatients: number
  hospitalizedTotal: number
  urgenciasPatients: number
  observacionPatients: number
  hospitalizacionPatients: number
  intermediosPatients: number
  uciPatients: number
  dischargedPatients: number
  totalMovements: number
}

export function DashboardContent({ stats, units, user }: DashboardContentProps) {
  const [localStats, setLocalStats] = useState<LocalStats>({
    triagePatients: 0,
    hospitalizedTotal: 0,
    urgenciasPatients: 0,
    observacionPatients: 0,
    hospitalizacionPatients: 0,
    intermediosPatients: 0,
    uciPatients: 0,
    dischargedPatients: 0,
    totalMovements: 0,
  })

  useEffect(() => {
    const loadLocalStats = () => {
      const triagePatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
      const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
      const dischargedPatients = JSON.parse(localStorage.getItem('dischargedPatients') || '[]')
      const movements = JSON.parse(localStorage.getItem('patientMovements') || '[]')

      const countByUnit = (unitCode: string) => 
        hospitalizedPatients.filter((p: { unitCode?: string }) => p.unitCode === unitCode).length

      setLocalStats({
        triagePatients: triagePatients.length,
        hospitalizedTotal: hospitalizedPatients.length,
        urgenciasPatients: countByUnit('urgencias'),
        observacionPatients: countByUnit('observacion'),
        hospitalizacionPatients: countByUnit('hospitalizacion'),
        intermediosPatients: countByUnit('intermedios'),
        uciPatients: countByUnit('uci'),
        dischargedPatients: dischargedPatients.length,
        totalMovements: movements.length,
      })
    }

    loadLocalStats()
    
    // Actualizar cada 5 segundos
    const interval = setInterval(loadLocalStats, 5000)
    return () => clearInterval(interval)
  }, [])

  const totalActive = localStats.triagePatients + localStats.hospitalizedTotal

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid - Datos en tiempo real */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-yellow-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Triage</CardTitle>
              <Stethoscope className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{localStats.triagePatients}</div>
              <p className="text-xs text-muted-foreground">
                pacientes esperando evaluación
              </p>
              {localStats.triagePatients > 0 && (
                <Link href="/triage">
                  <Button variant="link" size="sm" className="px-0 mt-1">
                    Ver pacientes <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hospitalizados</CardTitle>
              <Bed className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{localStats.hospitalizedTotal}</div>
              <p className="text-xs text-muted-foreground">
                pacientes en todas las unidades
              </p>
              {localStats.hospitalizedTotal > 0 && (
                <Link href="/censo">
                  <Button variant="link" size="sm" className="px-0 mt-1">
                    Ver censo <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Altas del Día</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{localStats.dischargedPatients}</div>
              <p className="text-xs text-muted-foreground">
                pacientes dados de alta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Movimientos</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{localStats.totalMovements}</div>
              <p className="text-xs text-muted-foreground">
                ingresos, traslados, altas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Link href="/admision">
              <Card className="hover:bg-accent cursor-pointer transition-colors border-primary/20 hover:border-primary/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Nueva Admisión
                  </CardTitle>
                  <CardDescription>
                    Registrar paciente y enviarlo a Triage
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/triage">
              <Card className="hover:bg-accent cursor-pointer transition-colors border-yellow-500/20 hover:border-yellow-500/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-yellow-500" />
                    Triage
                    {localStats.triagePatients > 0 && (
                      <Badge variant="destructive" className="ml-auto">{localStats.triagePatients}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Evaluar y clasificar pacientes
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/censo">
              <Card className="hover:bg-accent cursor-pointer transition-colors border-green-500/20 hover:border-green-500/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-green-500" />
                    Censo
                  </CardTitle>
                  <CardDescription>
                    Movimientos y censo de pacientes
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/unidades">
              <Card className="hover:bg-accent cursor-pointer transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Unidades
                  </CardTitle>
                  <CardDescription>
                    Ver pacientes por unidad
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/pacientes">
              <Card className="hover:bg-accent cursor-pointer transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Pacientes
                  </CardTitle>
                  <CardDescription>
                    Historial de pacientes
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        {/* Units Overview - Con datos reales */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Estado de Unidades</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Urgencias */}
            <Link href="/unidades/urgencias">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Urgencias</CardTitle>
                    <Badge variant={localStats.urgenciasPatients > 0 ? "destructive" : "secondary"}>
                      {localStats.urgenciasPatients}
                    </Badge>
                  </div>
                  <CardDescription>
                    Pacientes en urgencias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click para ver pacientes y hacer evoluciones
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Observación */}
            <Link href="/unidades/observacion">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Observación</CardTitle>
                    <Badge variant={localStats.observacionPatients > 0 ? "default" : "secondary"}>
                      {localStats.observacionPatients}
                    </Badge>
                  </div>
                  <CardDescription>
                    Pacientes en observación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click para ver pacientes y hacer evoluciones
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Hospitalización */}
            <Link href="/unidades/hospitalizacion">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Hospitalización</CardTitle>
                    <Badge variant={localStats.hospitalizacionPatients > 0 ? "default" : "secondary"}>
                      {localStats.hospitalizacionPatients}
                    </Badge>
                  </div>
                  <CardDescription>
                    Pacientes hospitalizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click para ver pacientes y hacer evoluciones
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Intermedios */}
            <Link href="/unidades/intermedios">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Intermedios</CardTitle>
                    <Badge variant={localStats.intermediosPatients > 0 ? "default" : "secondary"}>
                      {localStats.intermediosPatients}
                    </Badge>
                  </div>
                  <CardDescription>
                    Unidad de cuidados intermedios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click para ver pacientes y hacer evoluciones
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* UCI */}
            <Link href="/unidades/uci">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>UCI</CardTitle>
                    <Badge variant={localStats.uciPatients > 0 ? "destructive" : "secondary"}>
                      {localStats.uciPatients}
                    </Badge>
                  </div>
                  <CardDescription>
                    Unidad de cuidados intensivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click para ver pacientes y hacer evoluciones
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Triage */}
            <Link href="/triage">
              <Card className="hover:bg-accent cursor-pointer transition-colors border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-yellow-600">Triage</CardTitle>
                    <Badge variant={localStats.triagePatients > 0 ? "destructive" : "secondary"}>
                      {localStats.triagePatients}
                    </Badge>
                  </div>
                  <CardDescription>
                    Pacientes pendientes de evaluación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click para evaluar pacientes
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
