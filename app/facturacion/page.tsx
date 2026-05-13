'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  FileText, 
  DollarSign, 
  Pill, 
  TestTube,
  Bed,
  Calendar,
  Printer,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Building2
} from 'lucide-react'
import { ADMIN_USER } from '@/lib/mock-user'

// Tarifas ISS 2001 + 30% (ejemplo simplificado)
const TARIFAS = {
  // Estancia por día
  estancia: {
    uci: 850000,
    intermedios: 450000,
    hospitalizacion: 280000,
    urgencias: 180000,
    observacion: 150000,
  },
  // Consulta de triage
  consulta_triage: 85000,
  // Evolución médica diaria
  evolucion_medica: 65000,
}

interface BillingItem {
  id: string
  type: 'estancia' | 'consulta' | 'examen' | 'medicamento' | 'procedimiento' | 'evolucion'
  code: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  date: string
  status: 'pendiente' | 'facturado' | 'glosado'
}

interface PatientBilling {
  patientId: string
  patientName: string
  documentNumber: string
  admissionDate: string
  dischargeDate?: string
  unit: string
  diagnosis: string
  insurance: string
  items: BillingItem[]
  totalAmount: number
  status: 'abierta' | 'cerrada' | 'facturada'
}

export default function FacturacionPage() {
  const [patients, setPatients] = useState<PatientBilling[]>([])
  const [selectedPatient, setSelectedPatient] = useState<PatientBilling | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBillingData()
  }, [])

  const loadBillingData = () => {
    setIsLoading(true)
    
    // Cargar pacientes hospitalizados
    const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
    // Cargar pacientes dados de alta
    const dischargedPatients = JSON.parse(localStorage.getItem('dischargedPatients') || '[]')
    // Cargar evoluciones
    const evolutions = JSON.parse(localStorage.getItem('patientEvolutions') || '[]')
    // Cargar datos de triage
    const triagePatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
    
    // Combinar todos los pacientes
    const allPatients = [...hospitalizedPatients, ...dischargedPatients]
    
    // Generar datos de facturación por paciente
    const billingData: PatientBilling[] = allPatients.map((patient: Record<string, unknown>) => {
      const items: BillingItem[] = []
      const patientId = patient.id as string
      
      // 1. Agregar consulta de triage
      items.push({
        id: `triage-${patientId}`,
        type: 'consulta',
        code: '890201',
        description: 'Consulta de urgencias - Triage',
        quantity: 1,
        unitPrice: TARIFAS.consulta_triage,
        total: TARIFAS.consulta_triage,
        date: (patient.admissionDate || patient.entryDate || new Date().toISOString()) as string,
        status: 'pendiente'
      })
      
      // 2. Calcular días de estancia
      const entryDate = new Date((patient.entryDate || patient.admissionDate || new Date().toISOString()) as string)
      const exitDate = patient.dischargeDate ? new Date(patient.dischargeDate as string) : new Date()
      const daysOfStay = Math.max(1, Math.ceil((exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)))
      
      const unitCode = ((patient.unitCode as string) || 'hospitalizacion').toLowerCase()
      const dailyRate = TARIFAS.estancia[unitCode as keyof typeof TARIFAS.estancia] || TARIFAS.estancia.hospitalizacion
      
      items.push({
        id: `estancia-${patientId}`,
        type: 'estancia',
        code: unitCode === 'uci' ? '890601' : unitCode === 'intermedios' ? '890602' : '890603',
        description: `Estancia hospitalaria - ${(patient.unit as string) || 'Hospitalización'} (${daysOfStay} días)`,
        quantity: daysOfStay,
        unitPrice: dailyRate,
        total: daysOfStay * dailyRate,
        date: entryDate.toISOString(),
        status: 'pendiente'
      })
      
      // 3. Agregar evoluciones médicas
      const patientEvolutions = evolutions.filter((e: Record<string, unknown>) => e.patientId === patientId)
      patientEvolutions.forEach((evo: Record<string, unknown>, index: number) => {
        items.push({
          id: `evo-${patientId}-${index}`,
          type: 'evolucion',
          code: '890301',
          description: `Evolución médica diaria - ${new Date(evo.date as string).toLocaleDateString('es-CO')}`,
          quantity: 1,
          unitPrice: TARIFAS.evolucion_medica,
          total: TARIFAS.evolucion_medica,
          date: evo.date as string,
          status: 'pendiente'
        })
        
        // Agregar medicamentos de la evolución
        const medications = (evo.medications as Array<{code: string; description: string}>) || []
        medications.forEach((med, medIndex) => {
          items.push({
            id: `med-${patientId}-${index}-${medIndex}`,
            type: 'medicamento',
            code: med.code,
            description: med.description,
            quantity: 1,
            unitPrice: 25000, // Precio ejemplo
            total: 25000,
            date: evo.date as string,
            status: 'pendiente'
          })
        })
        
        // Agregar exámenes de la evolución
        const labTests = (evo.labTests as Array<{code: string; description: string}>) || []
        labTests.forEach((test, testIndex) => {
          items.push({
            id: `lab-${patientId}-${index}-${testIndex}`,
            type: 'examen',
            code: test.code,
            description: test.description,
            quantity: 1,
            unitPrice: 45000, // Precio ejemplo
            total: 45000,
            date: evo.date as string,
            status: 'pendiente'
          })
        })
        
        // Agregar procedimientos
        const procedures = (evo.procedures as Array<{code: string; description: string}>) || []
        procedures.forEach((proc, procIndex) => {
          items.push({
            id: `proc-${patientId}-${index}-${procIndex}`,
            type: 'procedimiento',
            code: proc.code,
            description: proc.description,
            quantity: 1,
            unitPrice: 120000, // Precio ejemplo
            total: 120000,
            date: evo.date as string,
            status: 'pendiente'
          })
        })
      })
      
      // Buscar datos de triage para obtener exámenes y medicamentos iniciales
      const triageData = triagePatients.find((t: Record<string, unknown>) => t.id === patientId)
      if (triageData?.admission?.triage_notes) {
        try {
          const notes = typeof triageData.admission.triage_notes === 'string' 
            ? JSON.parse(triageData.admission.triage_notes) 
            : triageData.admission.triage_notes
          
          // Exámenes de laboratorio del triage
          const labTests = notes.labTests || []
          labTests.forEach((test: {code: string; description: string}, index: number) => {
            items.push({
              id: `triage-lab-${patientId}-${index}`,
              type: 'examen',
              code: test.code,
              description: test.description,
              quantity: 1,
              unitPrice: 45000,
              total: 45000,
              date: triageData.admission.triage_date || entryDate.toISOString(),
              status: 'pendiente'
            })
          })
          
          // Imágenes diagnósticas del triage
          const imagingStudies = notes.imagingStudies || []
          imagingStudies.forEach((study: {code: string; description: string}, index: number) => {
            items.push({
              id: `triage-img-${patientId}-${index}`,
              type: 'examen',
              code: study.code,
              description: study.description,
              quantity: 1,
              unitPrice: 85000,
              total: 85000,
              date: triageData.admission.triage_date || entryDate.toISOString(),
              status: 'pendiente'
            })
          })
          
          // Medicamentos del triage
          const medications = notes.medications || []
          medications.forEach((med: {code: string; description: string}, index: number) => {
            items.push({
              id: `triage-med-${patientId}-${index}`,
              type: 'medicamento',
              code: med.code,
              description: med.description,
              quantity: 1,
              unitPrice: 25000,
              total: 25000,
              date: triageData.admission.triage_date || entryDate.toISOString(),
              status: 'pendiente'
            })
          })
        } catch {
          // Si no se puede parsear, continuar sin datos adicionales
        }
      }
      
      const totalAmount = items.reduce((sum, item) => sum + item.total, 0)
      
      return {
        patientId,
        patientName: (patient.name || `${patient.first_name} ${patient.last_name}`) as string,
        documentNumber: (patient.documentNumber || patient.document_number) as string,
        admissionDate: (patient.admissionDate || patient.entryDate) as string,
        dischargeDate: patient.dischargeDate as string | undefined,
        unit: (patient.unit || 'Hospitalización') as string,
        diagnosis: (patient.diagnosis || 'Sin diagnóstico registrado') as string,
        insurance: (patient.insurance_provider || 'Particular') as string,
        items,
        totalAmount,
        status: patient.dischargeDate ? 'cerrada' : 'abierta'
      }
    })
    
    setPatients(billingData)
    setIsLoading(false)
  }

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.documentNumber.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPendiente = patients.filter(p => p.status === 'abierta').reduce((sum, p) => sum + p.totalAmount, 0)
  const totalCerrada = patients.filter(p => p.status === 'cerrada').reduce((sum, p) => sum + p.totalAmount, 0)
  const totalFacturado = patients.filter(p => p.status === 'facturada').reduce((sum, p) => sum + p.totalAmount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'abierta':
        return <Badge className="bg-blue-500">Abierta</Badge>
      case 'cerrada':
        return <Badge className="bg-yellow-500">Cerrada</Badge>
      case 'facturada':
        return <Badge className="bg-green-500">Facturada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getItemTypeBadge = (type: string) => {
    switch (type) {
      case 'estancia':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300"><Bed className="h-3 w-3 mr-1" />Estancia</Badge>
      case 'consulta':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300"><FileText className="h-3 w-3 mr-1" />Consulta</Badge>
      case 'examen':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300"><TestTube className="h-3 w-3 mr-1" />Examen</Badge>
      case 'medicamento':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300"><Pill className="h-3 w-3 mr-1" />Medicamento</Badge>
      case 'procedimiento':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300"><FileText className="h-3 w-3 mr-1" />Procedimiento</Badge>
      case 'evolucion':
        return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-300"><Calendar className="h-3 w-3 mr-1" />Evolución</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const handlePrint = (patient: PatientBilling) => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Factura - ${patient.patientName}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f4f4f4; }
              .total { font-weight: bold; font-size: 18px; }
              .header { display: flex; justify-content: space-between; }
            </style>
          </head>
          <body>
            <h1>Prefactura Hospitalaria</h1>
            <div class="header">
              <div>
                <p><strong>Paciente:</strong> ${patient.patientName}</p>
                <p><strong>Documento:</strong> ${patient.documentNumber}</p>
                <p><strong>Diagnóstico:</strong> ${patient.diagnosis}</p>
              </div>
              <div>
                <p><strong>Fecha Ingreso:</strong> ${new Date(patient.admissionDate).toLocaleDateString('es-CO')}</p>
                <p><strong>EPS/Aseguradora:</strong> ${patient.insurance}</p>
                <p><strong>Unidad:</strong> ${patient.unit}</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Valor Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${patient.items.map(item => `
                  <tr>
                    <td>${item.code}</td>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.unitPrice)}</td>
                    <td>${formatCurrency(item.total)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" style="text-align: right;"><strong>TOTAL:</strong></td>
                  <td class="total">${formatCurrency(patient.totalAmount)}</td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Facturación</h1>
            <p className="text-muted-foreground">Gestión de cuentas y facturación hospitalaria</p>
          </div>
          <Button onClick={loadBillingData}>
            Actualizar
          </Button>
        </div>

        {/* Tarjetas de resumen */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cuentas Abiertas</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalPendiente)}</div>
              <p className="text-xs text-muted-foreground">
                {patients.filter(p => p.status === 'abierta').length} pacientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cuentas Cerradas</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totalCerrada)}</div>
              <p className="text-xs text-muted-foreground">
                {patients.filter(p => p.status === 'cerrada').length} pacientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Facturado</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalFacturado)}</div>
              <p className="text-xs text-muted-foreground">
                {patients.filter(p => p.status === 'facturada').length} pacientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total General</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalPendiente + totalCerrada + totalFacturado)}</div>
              <p className="text-xs text-muted-foreground">
                {patients.length} pacientes totales
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Buscar paciente</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nombre o documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Label>Estado</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="abierta">Abierta</SelectItem>
                    <SelectItem value="cerrada">Cerrada</SelectItem>
                    <SelectItem value="facturada">Facturada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de pacientes */}
        <Card>
          <CardHeader>
            <CardTitle>Cuentas de Pacientes</CardTitle>
            <CardDescription>
              Lista de todas las cuentas hospitalarias con servicios facturables
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Cargando datos de facturación...</p>
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No hay cuentas de facturación</p>
                <p className="text-sm text-muted-foreground">Los pacientes hospitalizados aparecerán aquí</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Fecha Ingreso</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.patientId}>
                      <TableCell className="font-medium">{patient.patientName}</TableCell>
                      <TableCell>{patient.documentNumber}</TableCell>
                      <TableCell>{patient.unit}</TableCell>
                      <TableCell>{new Date(patient.admissionDate).toLocaleDateString('es-CO')}</TableCell>
                      <TableCell>{patient.items.length}</TableCell>
                      <TableCell className="font-bold">{formatCurrency(patient.totalAmount)}</TableCell>
                      <TableCell>{getStatusBadge(patient.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedPatient(patient)
                              setDetailDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePrint(patient)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Diálogo de detalle */}
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalle de Cuenta</DialogTitle>
              <DialogDescription>
                {selectedPatient?.patientName} - {selectedPatient?.documentNumber}
              </DialogDescription>
            </DialogHeader>
            
            {selectedPatient && (
              <div className="space-y-6">
                {/* Info del paciente */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Diagnóstico</p>
                    <p className="font-medium">{selectedPatient.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EPS/Aseguradora</p>
                    <p className="font-medium">{selectedPatient.insurance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Unidad</p>
                    <p className="font-medium">{selectedPatient.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha Ingreso</p>
                    <p className="font-medium">{new Date(selectedPatient.admissionDate).toLocaleDateString('es-CO')}</p>
                  </div>
                </div>

                {/* Tabs por tipo de servicio */}
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="estancia">Estancia</TabsTrigger>
                    <TabsTrigger value="consulta">Consultas</TabsTrigger>
                    <TabsTrigger value="examen">Exámenes</TabsTrigger>
                    <TabsTrigger value="medicamento">Medicamentos</TabsTrigger>
                    <TabsTrigger value="procedimiento">Procedimientos</TabsTrigger>
                  </TabsList>
                  
                  {['all', 'estancia', 'consulta', 'examen', 'medicamento', 'procedimiento'].map(tab => (
                    <TabsContent key={tab} value={tab}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Cant.</TableHead>
                            <TableHead>V. Unit</TableHead>
                            <TableHead>Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedPatient.items
                            .filter(item => tab === 'all' || item.type === tab)
                            .map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{getItemTypeBadge(item.type)}</TableCell>
                                <TableCell className="font-mono text-sm">{item.code}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{new Date(item.date).toLocaleDateString('es-CO')}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                                <TableCell className="font-bold">{formatCurrency(item.total)}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Total */}
                <div className="flex justify-end p-4 bg-primary/5 rounded-lg">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total de la Cuenta</p>
                    <p className="text-3xl font-bold text-primary">{formatCurrency(selectedPatient.totalAmount)}</p>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                Cerrar
              </Button>
              {selectedPatient && (
                <>
                  <Button variant="outline" onClick={() => handlePrint(selectedPatient)}>
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar PDF
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
