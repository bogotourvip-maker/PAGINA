'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Download, 
  FileJson, 
  FileSpreadsheet,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Lock
} from 'lucide-react'
import { ADMIN_USER } from '@/lib/mock-user'
import { logAuditAction } from '@/lib/audit-log'

interface ExportOption {
  id: string
  label: string
  description: string
  checked: boolean
}

export default function ExportarDatosPage() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportOption[]>([
    { id: 'patients', label: 'Datos de Pacientes', description: 'Información demográfica y de contacto', checked: true },
    { id: 'admissions', label: 'Admisiones', description: 'Historial de ingresos y egresos', checked: true },
    { id: 'evolutions', label: 'Evoluciones Clínicas', description: 'Registros de evolución diaria', checked: true },
    { id: 'movements', label: 'Movimientos', description: 'Traslados y cambios de unidad', checked: true },
    { id: 'consents', label: 'Consentimientos', description: 'Autorizaciones Habeas Data firmadas', checked: false },
    { id: 'auditLog', label: 'Log de Auditoría', description: 'Registro de accesos y modificaciones', checked: false },
  ])
  const [confirmDelete, setConfirmDelete] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleOption = (id: string) => {
    setExportOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, checked: !opt.checked } : opt
    ))
  }

  const handleExportJSON = async () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    // Simular progreso
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Recopilar datos
    const exportData: Record<string, unknown> = {
      exportDate: new Date().toISOString(),
      exportedBy: ADMIN_USER.email,
      format: 'JSON',
      version: '1.0',
      data: {}
    }

    // Obtener datos según opciones seleccionadas
    exportOptions.filter(opt => opt.checked).forEach(opt => {
      const storageKey = getStorageKey(opt.id)
      if (storageKey) {
        const data = JSON.parse(localStorage.getItem(storageKey) || '[]')
        ;(exportData.data as Record<string, unknown>)[opt.id] = data
      }
    })

    // Esperar a que termine el progreso
    await new Promise(resolve => setTimeout(resolve, 2500))

    // Registrar en auditoría
    logAuditAction('EXPORT_DATA', `Exportación de datos en formato JSON`, {
      userId: ADMIN_USER.email,
      userName: ADMIN_USER.email,
      details: `Módulos exportados: ${exportOptions.filter(o => o.checked).map(o => o.label).join(', ')}`
    })

    // Descargar archivo
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `hospital_export_${new Date().toISOString().split('T')[0]}.json`
    link.click()

    setExportComplete(true)
    setIsExporting(false)
  }

  const handleExportCSV = async () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    // Simular progreso
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    await new Promise(resolve => setTimeout(resolve, 2500))

    // Exportar pacientes como CSV
    const patients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
    const movements = JSON.parse(localStorage.getItem('patientMovements') || '[]')
    
    // CSV de pacientes
    const patientsCSV = [
      ['ID', 'Nombre', 'Documento', 'Unidad', 'Cama', 'Fecha Ingreso', 'Diagnóstico'].join(','),
      ...patients.map((p: Record<string, string>) => [
        p.id,
        `"${p.name || ''}"`,
        p.documentNumber || '',
        p.unit || '',
        p.bed || '',
        p.entryDate || '',
        `"${(p.diagnosis || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n')

    // CSV de movimientos
    const movementsCSV = [
      ['ID', 'Paciente', 'Tipo', 'Origen', 'Destino', 'Fecha', 'Motivo'].join(','),
      ...movements.map((m: Record<string, string>) => [
        m.id,
        `"${m.patientName || ''}"`,
        m.type || '',
        m.fromLocation || '',
        m.toLocation || '',
        m.date || '',
        `"${(m.reason || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n')

    // Registrar en auditoría
    logAuditAction('EXPORT_DATA', `Exportación de datos en formato CSV`, {
      userId: ADMIN_USER.email,
      userName: ADMIN_USER.email,
    })

    // Descargar archivos
    const blobPatients = new Blob([patientsCSV], { type: 'text/csv;charset=utf-8;' })
    const linkPatients = document.createElement('a')
    linkPatients.href = URL.createObjectURL(blobPatients)
    linkPatients.download = `pacientes_${new Date().toISOString().split('T')[0]}.csv`
    linkPatients.click()

    setTimeout(() => {
      const blobMovements = new Blob([movementsCSV], { type: 'text/csv;charset=utf-8;' })
      const linkMovements = document.createElement('a')
      linkMovements.href = URL.createObjectURL(blobMovements)
      linkMovements.download = `movimientos_${new Date().toISOString().split('T')[0]}.csv`
      linkMovements.click()
    }, 500)

    setExportComplete(true)
    setIsExporting(false)
  }

  const handleDeleteData = async () => {
    if (confirmDelete !== 'ELIMINAR TODOS LOS DATOS') return

    setIsDeleting(true)

    // Registrar en auditoría ANTES de eliminar
    logAuditAction('EXPORT_DATA', `Solicitud de eliminación completa de datos (Derecho al Olvido)`, {
      userId: ADMIN_USER.email,
      userName: ADMIN_USER.email,
    })

    // Eliminar todos los datos
    const keysToDelete = [
      'hospitalizedPatients',
      'triagePatients',
      'patientMovements',
      'patientEvolutions',
      'habeasDataConsents',
      'dischargedPatients'
    ]

    keysToDelete.forEach(key => localStorage.removeItem(key))

    // Mantener solo el log de auditoría
    await new Promise(resolve => setTimeout(resolve, 1500))

    alert('Todos los datos han sido eliminados. El log de auditoría se conserva según lo requiere la ley.')
    setIsDeleting(false)
    setConfirmDelete('')
  }

  const getStorageKey = (optionId: string): string | null => {
    const mapping: Record<string, string> = {
      patients: 'hospitalizedPatients',
      admissions: 'patientMovements',
      evolutions: 'patientEvolutions',
      movements: 'patientMovements',
      consents: 'habeasDataConsents',
      auditLog: 'auditLog'
    }
    return mapping[optionId] || null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Database className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Exportación y Portabilidad de Datos</h1>
            <p className="text-muted-foreground">
              Derecho a la portabilidad - Ley 1581 de 2012
            </p>
          </div>
        </div>

        {/* Alerta informativa */}
        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertTitle>Portabilidad de Datos</AlertTitle>
          <AlertDescription>
            De acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013, usted tiene derecho a 
            obtener una copia de sus datos en un formato estructurado y de uso común. Los datos 
            exportados incluyen información protegida, manéjelos de forma segura.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="export" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">Exportar Datos</TabsTrigger>
            <TabsTrigger value="delete">Derecho al Olvido</TabsTrigger>
          </TabsList>

          {/* Tab de Exportación */}
          <TabsContent value="export">
            <div className="grid gap-6">
              {/* Selección de datos */}
              <Card>
                <CardHeader>
                  <CardTitle>Seleccionar datos a exportar</CardTitle>
                  <CardDescription>
                    Elija qué información desea incluir en la exportación
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exportOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                      <Checkbox
                        id={option.id}
                        checked={option.checked}
                        onCheckedChange={() => toggleOption(option.id)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={option.id} className="cursor-pointer font-medium">
                          {option.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Formato de exportación */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileJson className="h-5 w-5 text-blue-500" />
                      Formato JSON
                    </CardTitle>
                    <CardDescription>
                      Formato estructurado, ideal para migración a otros sistemas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>- Estructura jerárquica completa</li>
                      <li>- Compatible con APIs REST</li>
                      <li>- Metadatos incluidos</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleExportJSON}
                      disabled={isExporting || !exportOptions.some(o => o.checked)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar JSON
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-green-500" />
                      Formato CSV
                    </CardTitle>
                    <CardDescription>
                      Formato tabular, compatible con Excel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>- Fácil de abrir en Excel</li>
                      <li>- Un archivo por tipo de dato</li>
                      <li>- Análisis en hojas de cálculo</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleExportCSV}
                      disabled={isExporting}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar CSV
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Progreso de exportación */}
              {isExporting && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Exportando datos...</span>
                        <span className="text-sm text-muted-foreground">{exportProgress}%</span>
                      </div>
                      <Progress value={exportProgress} />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 animate-pulse" />
                        Preparando archivos para descarga
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Exportación completada */}
              {exportComplete && (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Exportación completada</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Los archivos se han descargado a su dispositivo. Esta acción ha sido 
                    registrada en el log de auditoría.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          {/* Tab de Derecho al Olvido */}
          <TabsContent value="delete">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-5 w-5" />
                  Solicitud de Eliminación de Datos
                </CardTitle>
                <CardDescription>
                  Derecho al olvido según Ley 1581 de 2012, Art. 8, literal e)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Advertencia</AlertTitle>
                  <AlertDescription>
                    Esta acción eliminará PERMANENTEMENTE todos los datos del sistema. 
                    Esta operación NO se puede deshacer. El log de auditoría se conservará 
                    según lo requiere la normatividad vigente.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">Datos que serán eliminados:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>- Información de pacientes hospitalizados</li>
                    <li>- Pacientes en triage</li>
                    <li>- Historial de movimientos</li>
                    <li>- Evoluciones clínicas</li>
                    <li>- Consentimientos firmados</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">Datos que se conservarán (obligación legal):</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>- Log de auditoría (trazabilidad)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmDelete" className="text-red-600">
                    Para confirmar, escriba: <strong>ELIMINAR TODOS LOS DATOS</strong>
                  </Label>
                  <Input
                    id="confirmDelete"
                    value={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.value)}
                    placeholder="Escriba el texto de confirmación"
                    className="border-red-200 focus:border-red-500"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  disabled={confirmDelete !== 'ELIMINAR TODOS LOS DATOS' || isDeleting}
                  onClick={handleDeleteData}
                >
                  {isDeleting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Confirmar Eliminación Permanente
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Nota legal */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Marco Legal</p>
              <p className="text-muted-foreground mt-1">
                Este módulo implementa los derechos establecidos en la Ley 1581 de 2012 
                (Protección de Datos Personales) y el Decreto 1377 de 2013. La exportación 
                de datos cumple con el derecho a la portabilidad (Art. 8, literal f) y la 
                eliminación con el derecho de supresión (Art. 8, literal e). Todas las 
                operaciones quedan registradas en el log de auditoría inalterable.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
