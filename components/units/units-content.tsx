'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, Bed, Users, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Unit } from '@/lib/types'
import type { User } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { CreateUnitDialog } from './create-unit-dialog'

interface UnitsContentProps {
  units: (Unit & { activePatients: number })[]
  user: User
}

const unitTypeLabels: Record<string, string> = {
  urgencias: 'Urgencias',
  observacion: 'Observación',
  hospitalizacion: 'Hospitalización',
  intermedios: 'Cuidados Intermedios',
  uci: 'Cuidados Intensivos (UCI)',
}

const unitTypeColors: Record<string, string> = {
  urgencias: 'destructive',
  observacion: 'secondary',
  hospitalizacion: 'default',
  intermedios: 'outline',
  uci: 'destructive',
}

export function UnitsContent({ units, user }: UnitsContentProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Unidades</h1>
            <p className="text-muted-foreground mt-2">
              Administra las unidades hospitalarias y su capacidad
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Unidad
          </Button>
        </div>

        {/* Resumen por tipo */}
        <div className="grid gap-4 md:grid-cols-5 mb-8">
          {Object.entries(unitTypeLabels).map(([type, label]) => {
            const typeUnits = units.filter(u => u.type === type)
            const totalBeds = typeUnits.reduce((sum, u) => sum + u.total_beds, 0)
            const availableBeds = typeUnits.reduce((sum, u) => sum + u.available_beds, 0)
            const occupancy = totalBeds > 0 ? ((totalBeds - availableBeds) / totalBeds * 100) : 0

            return (
              <Card key={type}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{typeUnits.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {totalBeds - availableBeds}/{totalBeds} camas
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {occupancy.toFixed(0)}% ocupación
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Lista de unidades */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {units.map(unit => {
            const occupiedBeds = unit.total_beds - unit.available_beds
            const occupancyRate = (occupiedBeds / unit.total_beds) * 100

            return (
              <Card key={unit.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{unit.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {unitTypeLabels[unit.type]}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={unitTypeColors[unit.type] as any}>
                      {unit.activePatients}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span>Camas Totales</span>
                      </div>
                      <span className="font-semibold">{unit.total_beds}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ocupadas</span>
                      <span className="font-semibold">{occupiedBeds}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Disponibles</span>
                      <span className="font-semibold text-green-600">
                        {unit.available_beds}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Ocupación</span>
                        <span className="font-semibold">{occupancyRate.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${occupancyRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link href={`/unidades/${unit.code || unit.type}`}>
                        <Button variant="default" size="sm" className="w-full">
                          Ver Pacientes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {units.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay unidades registradas</h3>
              <p className="text-muted-foreground mb-4">
                Comienza creando la primera unidad hospitalaria
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Crear Primera Unidad
              </Button>
            </div>
          </Card>
        )}
      </main>

      <CreateUnitDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}
