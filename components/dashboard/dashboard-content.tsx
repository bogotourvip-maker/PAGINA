'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Activity, Bed, Building2, Users, AlertCircle, Plus, UserPlus, Stethoscope, ClipboardList } from 'lucide-react'
import type { DashboardStats, Unit } from '@/lib/types'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { DashboardHeader } from './dashboard-header'

interface DashboardContentProps {
  stats: DashboardStats
  units: Unit[]
  user: User
}

export function DashboardContent({ stats, units, user }: DashboardContentProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePatients}</div>
              <p className="text-xs text-muted-foreground">
                de {stats.totalPatients} totales
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unidades</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUnits}</div>
              <p className="text-xs text-muted-foreground">
                en operación
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Camas Ocupadas</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.occupiedBeds}</div>
              <p className="text-xs text-muted-foreground">
                de {stats.occupiedBeds + stats.availableBeds} camas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Camas Disponibles</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableBeds}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.availableBeds / (stats.occupiedBeds + stats.availableBeds)) * 100).toFixed(1)}% disponible
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Link href="/admision">
              <Card className="hover:bg-accent cursor-pointer transition-colors border-primary/20 hover:border-primary/50">
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
              <Card className="hover:bg-accent cursor-pointer transition-colors border-yellow-500/20 hover:border-yellow-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-yellow-500" />
                    Triage
                  </CardTitle>
                  <CardDescription>
                    Evaluar y clasificar pacientes
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/censo">
              <Card className="hover:bg-accent cursor-pointer transition-colors border-green-500/20 hover:border-green-500/50">
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
              <Card className="hover:bg-accent cursor-pointer transition-colors">
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
              <Card className="hover:bg-accent cursor-pointer transition-colors">
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

        {/* Units Overview */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Estado de Unidades</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Urgencias */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Urgencias</CardTitle>
                  <Badge variant="destructive">{stats.urgenciasPatients}</Badge>
                </div>
                <CardDescription>
                  Pacientes en urgencias
                </CardDescription>
              </CardHeader>
              <CardContent>
                {units.filter(u => u.type === 'urgencias').map(unit => (
                  <div key={unit.id} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{unit.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {unit.available_beds}/{unit.total_beds} disponibles
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Observación */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Observación</CardTitle>
                  <Badge variant="secondary">{stats.observacionPatients}</Badge>
                </div>
                <CardDescription>
                  Pacientes en observación
                </CardDescription>
              </CardHeader>
              <CardContent>
                {units.filter(u => u.type === 'observacion').map(unit => (
                  <div key={unit.id} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{unit.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {unit.available_beds}/{unit.total_beds} disponibles
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hospitalización */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Hospitalización</CardTitle>
                  <Badge variant="secondary">{stats.hospitalizacionPatients}</Badge>
                </div>
                <CardDescription>
                  Pacientes hospitalizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {units.filter(u => u.type === 'hospitalizacion').map(unit => (
                  <div key={unit.id} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{unit.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {unit.available_beds}/{unit.total_beds} disponibles
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Intermedios */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Intermedios</CardTitle>
                  <Badge>{stats.intermediosPatients}</Badge>
                </div>
                <CardDescription>
                  Unidad de cuidados intermedios
                </CardDescription>
              </CardHeader>
              <CardContent>
                {units.filter(u => u.type === 'intermedios').map(unit => (
                  <div key={unit.id} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{unit.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {unit.available_beds}/{unit.total_beds} disponibles
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* UCI */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>UCI</CardTitle>
                  <Badge variant="destructive">{stats.uciPatients}</Badge>
                </div>
                <CardDescription>
                  Unidad de cuidados intensivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {units.filter(u => u.type === 'uci').map(unit => (
                  <div key={unit.id} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{unit.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {unit.available_beds}/{unit.total_beds} disponibles
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
