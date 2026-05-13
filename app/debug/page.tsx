'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ADMIN_USER } from '@/lib/mock-user'
import { Trash2, RefreshCw } from 'lucide-react'

interface StorageData {
  triagePatients: unknown[]
  hospitalizedPatients: unknown[]
  dischargedPatients: unknown[]
  patientMovements: unknown[]
  patientEvolutions: unknown[]
  auditLogs: unknown[]
}

export default function DebugPage() {
  const [data, setData] = useState<StorageData>({
    triagePatients: [],
    hospitalizedPatients: [],
    dischargedPatients: [],
    patientMovements: [],
    patientEvolutions: [],
    auditLogs: [],
  })

  const loadData = () => {
    setData({
      triagePatients: JSON.parse(localStorage.getItem('triagePatients') || '[]'),
      hospitalizedPatients: JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]'),
      dischargedPatients: JSON.parse(localStorage.getItem('dischargedPatients') || '[]'),
      patientMovements: JSON.parse(localStorage.getItem('patientMovements') || '[]'),
      patientEvolutions: JSON.parse(localStorage.getItem('patientEvolutions') || '[]'),
      auditLogs: JSON.parse(localStorage.getItem('auditLogs') || '[]'),
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  const clearAll = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos los datos?')) {
      localStorage.removeItem('triagePatients')
      localStorage.removeItem('hospitalizedPatients')
      localStorage.removeItem('dischargedPatients')
      localStorage.removeItem('patientMovements')
      localStorage.removeItem('patientEvolutions')
      localStorage.removeItem('auditLogs')
      loadData()
    }
  }

  const clearItem = (key: string) => {
    localStorage.removeItem(key)
    loadData()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER as never} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Debug - Estado del Sistema</h1>
          <div className="flex gap-2">
            <Button onClick={loadData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
            <Button onClick={clearAll} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Borrar Todo
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Triage */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Pacientes en Triage
                <Badge>{data.triagePatients.length}</Badge>
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => clearItem('triagePatients')}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-xs">
                {JSON.stringify(data.triagePatients, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Hospitalizados */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Pacientes Hospitalizados
                <Badge>{data.hospitalizedPatients.length}</Badge>
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => clearItem('hospitalizedPatients')}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-xs">
                {JSON.stringify(data.hospitalizedPatients, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Dados de Alta */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Pacientes Dados de Alta
                <Badge>{data.dischargedPatients.length}</Badge>
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => clearItem('dischargedPatients')}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-xs">
                {JSON.stringify(data.dischargedPatients, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Movimientos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Movimientos
                <Badge>{data.patientMovements.length}</Badge>
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => clearItem('patientMovements')}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-xs">
                {JSON.stringify(data.patientMovements, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Evoluciones */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Evoluciones
                <Badge>{data.patientEvolutions.length}</Badge>
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => clearItem('patientEvolutions')}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-xs">
                {JSON.stringify(data.patientEvolutions, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Logs de Auditoría */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Logs de Auditoría
                <Badge>{data.auditLogs.length}</Badge>
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => clearItem('auditLogs')}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-xs">
                {JSON.stringify(data.auditLogs, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
