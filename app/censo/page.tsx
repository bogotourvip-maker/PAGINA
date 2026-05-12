'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  ArrowRight, 
  Search, 
  Clock, 
  User, 
  Building2,
  FileText,
  Download,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { ADMIN_USER } from '@/lib/mock-user'

interface Movement {
  id: string
  patientId: string
  patientName: string
  documentNumber: string
  fromLocation: string
  toLocation: string
  reason: string
  date: string
  performedBy: string
  type: 'ingreso' | 'traslado' | 'alta'
}

interface PatientInUnit {
  id: string
  name: string
  documentNumber: string
  unit: string
  unitCode: string
  bed?: string
  admissionDate: string
  daysInUnit: number
  diagnosis?: string
  triageLevel?: number
  status: 'triage' | 'hospitalizado' | 'alta'
}

const UNIT_COLORS: Record<string, string> = {
  triage: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  urgencias: 'bg-red-100 text-red-800 border-red-300',
  observacion: 'bg-orange-100 text-orange-800 border-orange-300',
  hospitalizacion: 'bg-blue-100 text-blue-800 border-blue-300',
  intermedios: 'bg-purple-100 text-purple-800 border-purple-300',
  uci: 'bg-pink-100 text-pink-800 border-pink-300',
  alta: 'bg-green-100 text-green-800 border-green-300',
  consulta_externa: 'bg-gray-100 text-gray-800 border-gray-300',
}

const UNIT_NAMES: Record<string, string> = {
  triage: 'Triage',
  urgencias: 'Urgencias',
  observacion: 'Observación',
  hospitalizacion: 'Hospitalización',
  intermedios: 'Intermedios',
  uci: 'UCI',
  alta: 'Alta Médica',
  consulta_externa: 'Consulta Externa',
}

function calculateDaysInUnit(entryDate: string): number {
  const entry = new Date(entryDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - entry.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function CensoPage() {
  const [movements, setMovements] = useState<Movement[]>([])
  const [patients, setPatients] = useState<PatientInUnit[]>([])
  const [filterUnit, setFilterUnit] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'censo' | 'movimientos'>('censo')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // Cargar pacientes de localStorage
    const triagePatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
    const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
    const dischargedPatients = JSON.parse(localStorage.getItem('dischargedPatients') || '[]')
    const movementsData = JSON.parse(localStorage.getItem('patientMovements') || '[]')

    // Convertir a formato de censo
    const allPatients: PatientInUnit[] = []

    // Pacientes en triage
    triagePatients.forEach((p: Record<string, unknown>) => {
      const admission = p.admission as Record<string, unknown> | undefined
      allPatients.push({
        id: p.id as string,
        name: `${p.first_name} ${p.last_name}`,
        documentNumber: p.document_number as string,
        unit: 'Triage',
        unitCode: 'triage',
        admissionDate: admission?.admission_date as string || new Date().toISOString(),
        daysInUnit: calculateDaysInUnit(admission?.admission_date as string || new Date().toISOString()),
        diagnosis: admission?.admission_reason as string,
        triageLevel: admission?.triage_level as number,
        status: 'triage'
      })
    })

    // Pacientes hospitalizados
    hospitalizedPatients.forEach((p: Record<string, unknown>) => {
      allPatients.push({
        id: p.id as string,
        name: p.name as string || `${p.first_name} ${p.last_name}`,
        documentNumber: p.documentNumber as string || p.document_number as string,
        unit: UNIT_NAMES[p.unitCode as string] || p.unit as string,
        unitCode: p.unitCode as string,
        bed: p.bed as string,
        admissionDate: p.admissionDate as string || p.entryDate as string,
        daysInUnit: calculateDaysInUnit(p.entryDate as string || p.admissionDate as string),
        diagnosis: p.diagnosis as string,
        triageLevel: p.triageLevel as number,
        status: 'hospitalizado'
      })
    })

    // Pacientes dados de alta (últimos 24 horas)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    dischargedPatients
      .filter((p: Record<string, unknown>) => new Date(p.dischargeDate as string) > yesterday)
      .forEach((p: Record<string, unknown>) => {
        allPatients.push({
          id: p.id as string,
          name: p.name as string,
          documentNumber: p.documentNumber as string,
          unit: 'Alta Médica',
          unitCode: 'alta',
          admissionDate: p.dischargeDate as string,
          daysInUnit: 0,
          diagnosis: p.diagnosis as string,
          status: 'alta'
        })
      })

    setPatients(allPatients)
    setMovements(movementsData)
  }

  // Filtrar pacientes
  const filteredPatients = patients.filter(p => {
    const matchesUnit = filterUnit === 'all' || p.unitCode === filterUnit
    const matchesSearch = searchTerm === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.documentNumber.includes(searchTerm)
    return matchesUnit && matchesSearch
  })

  // Filtrar movimientos
  const filteredMovements = movements.filter(m => {
    const matchesType = filterType === 'all' || m.type === filterType
    const matchesSearch = searchTerm === '' || 
      m.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.documentNumber.includes(searchTerm)
    return matchesType && matchesSearch
  })

  // Estadísticas por unidad
  const statsByUnit = Object.keys(UNIT_NAMES).reduce((acc, unit) => {
    acc[unit] = patients.filter(p => p.unitCode === unit).length
    return acc
  }, {} as Record<string, number>)

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Censo Hospitalario</h1>
            <p className="text-muted-foreground">Control de pacientes y movimientos en tiempo real</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Resumen por unidades */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {Object.entries(UNIT_NAMES).map(([code, name]) => (
            <Card 
              key={code} 
              className={`cursor-pointer transition-all hover:scale-105 ${filterUnit === code ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setFilterUnit(filterUnit === code ? 'all' : code)}
            >
              <CardContent className="p-3 text-center">
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-1 ${UNIT_COLORS[code]}`}>
                  {name}
                </div>
                <p className="text-2xl font-bold">{statsByUnit[code] || 0}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <Button 
            variant={activeTab === 'censo' ? 'default' : 'outline'}
            onClick={() => setActiveTab('censo')}
          >
            <User className="h-4 w-4 mr-2" />
            Censo Actual
          </Button>
          <Button 
            variant={activeTab === 'movimientos' ? 'default' : 'outline'}
            onClick={() => setActiveTab('movimientos')}
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Movimientos
          </Button>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {activeTab === 'censo' && (
                <Select value={filterUnit} onValueChange={setFilterUnit}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las unidades</SelectItem>
                    {Object.entries(UNIT_NAMES).map(([code, name]) => (
                      <SelectItem key={code} value={code}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {activeTab === 'movimientos' && (
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de movimiento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="ingreso">Ingresos</SelectItem>
                    <SelectItem value="evolucion">Evoluciones</SelectItem>
                    <SelectItem value="traslado">Traslados</SelectItem>
                    <SelectItem value="alta">Altas</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Censo */}
        {activeTab === 'censo' && (
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Actuales ({filteredPatients.length})</CardTitle>
              <CardDescription>Lista de pacientes en cada área del hospital</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredPatients.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay pacientes en esta unidad</p>
                  <Link href="/admision">
                    <Button className="mt-4">Registrar Paciente</Button>
                  </Link>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Cama</TableHead>
                      <TableHead>Días</TableHead>
                      <TableHead>Diagnóstico</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {patient.triageLevel && (
                              <Badge variant="outline" className={
                                patient.triageLevel === 1 ? 'bg-red-500 text-white' :
                                patient.triageLevel === 2 ? 'bg-orange-500 text-white' :
                                patient.triageLevel === 3 ? 'bg-yellow-500 text-black' :
                                patient.triageLevel === 4 ? 'bg-green-500 text-white' :
                                'bg-blue-500 text-white'
                              }>
                                {patient.triageLevel}
                              </Badge>
                            )}
                            {patient.name}
                          </div>
                        </TableCell>
                        <TableCell>{patient.documentNumber}</TableCell>
                        <TableCell>
                          <Badge className={UNIT_COLORS[patient.unitCode]}>
                            {patient.unit}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.bed || '-'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {patient.daysInUnit}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={patient.diagnosis}>
                          {patient.diagnosis || '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Link href={`/pacientes/${patient.id}`}>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </Link>
                            {patient.status !== 'alta' && (
                              <Link href={`/pacientes/${patient.id}/trasladar`}>
                                <Button variant="ghost" size="sm">
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tabla de Movimientos */}
        {activeTab === 'movimientos' && (
          <Card>
            <CardHeader>
              <CardTitle>Historial de Movimientos ({filteredMovements.length})</CardTitle>
              <CardDescription>Registro de ingresos, traslados y altas</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredMovements.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ArrowRight className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay movimientos registrados</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha/Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Origen</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Responsable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell className="text-sm">
                          {formatDateTime(movement.date)}
                        </TableCell>
                        <TableCell>
<Badge className={
  movement.type === 'ingreso' ? 'bg-green-500 text-white' :
  movement.type === 'evolucion' ? 'bg-blue-500 text-white' :
  movement.type === 'traslado' ? 'bg-yellow-500 text-black' :
  movement.type === 'alta' ? 'bg-gray-500 text-white' : ''
  }>
  {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{movement.patientName}</TableCell>
                        <TableCell>{movement.documentNumber}</TableCell>
                        <TableCell>
                          {movement.fromLocation ? (
                            <Badge variant="outline">{movement.fromLocation}</Badge>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge className={UNIT_COLORS[movement.toLocation.toLowerCase().replace(' ', '_')] || 'bg-gray-100'}>
                            {movement.toLocation}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate" title={movement.reason}>
                          {movement.reason}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {movement.performedBy}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
