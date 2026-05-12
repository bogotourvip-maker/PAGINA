'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Search, 
  Clock, 
  ArrowRight,
  FileText,
  Home,
  Building2,
  AlertCircle,
  User,
  Stethoscope
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ADMIN_USER } from '@/lib/mock-user'
import { DailyEvolutionDialog } from '@/components/evolution/daily-evolution-dialog'

interface Patient {
  id: string
  name: string
  documentNumber: string
  bed?: string
  admissionDate: string
  entryDate: string
  diagnosis?: string
  triageLevel?: number
  age?: number
  gender?: string
}

interface UnitPatientsViewProps {
  unitCode: string
  unitName: string
  unitIcon: React.ReactNode
  unitColor: string
}

const UNIT_OPTIONS = [
  { code: 'urgencias', name: 'Urgencias' },
  { code: 'observacion', name: 'Observación' },
  { code: 'hospitalizacion', name: 'Hospitalización' },
  { code: 'intermedios', name: 'Intermedios' },
  { code: 'uci', name: 'UCI' },
]

function calculateDaysInUnit(entryDate: string): number {
  const entry = new Date(entryDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - entry.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function UnitPatientsView({ unitCode, unitName, unitIcon, unitColor }: UnitPatientsViewProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [dischargeDialogOpen, setDischargeDialogOpen] = useState(false)
  const [evolutionDialogOpen, setEvolutionDialogOpen] = useState(false)
  const [transferUnit, setTransferUnit] = useState('')
  const [transferReason, setTransferReason] = useState('')
  const [dischargeReason, setDischargeReason] = useState('')
  const [dischargeNotes, setDischargeNotes] = useState('')
  const router = useRouter()

  useEffect(() => {
    loadPatients()
  }, [unitCode])

  const loadPatients = () => {
    const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
    const unitPatients = hospitalizedPatients.filter((p: Record<string, unknown>) => p.unitCode === unitCode)
    setPatients(unitPatients)
  }

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.documentNumber.includes(searchTerm)
  )

  const handleTransfer = () => {
    if (!selectedPatient || !transferUnit || !transferReason) return

    const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
    const movements = JSON.parse(localStorage.getItem('patientMovements') || '[]')

    // Actualizar ubicación del paciente
    const updatedPatients = hospitalizedPatients.map((p: Record<string, unknown>) => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          unitCode: transferUnit,
          unit: UNIT_OPTIONS.find(u => u.code === transferUnit)?.name,
          entryDate: new Date().toISOString(),
          bed: undefined
        }
      }
      return p
    })

    // Registrar movimiento
    const newMovement = {
      id: 'mov-' + Date.now(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      documentNumber: selectedPatient.documentNumber,
      fromLocation: unitName,
      toLocation: UNIT_OPTIONS.find(u => u.code === transferUnit)?.name || transferUnit,
      reason: transferReason,
      date: new Date().toISOString(),
      performedBy: ADMIN_USER.name,
      type: 'traslado'
    }

    localStorage.setItem('hospitalizedPatients', JSON.stringify(updatedPatients))
    localStorage.setItem('patientMovements', JSON.stringify([newMovement, ...movements]))

    setTransferDialogOpen(false)
    setSelectedPatient(null)
    setTransferUnit('')
    setTransferReason('')
    loadPatients()
  }

  const handleDischarge = () => {
    if (!selectedPatient || !dischargeReason) return

    const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
    const dischargedPatients = JSON.parse(localStorage.getItem('dischargedPatients') || '[]')
    const movements = JSON.parse(localStorage.getItem('patientMovements') || '[]')

    // Remover de hospitalizados
    const updatedPatients = hospitalizedPatients.filter((p: Record<string, unknown>) => p.id !== selectedPatient.id)

    // Agregar a dados de alta
    const dischargedPatient = {
      ...selectedPatient,
      dischargeDate: new Date().toISOString(),
      dischargeReason,
      dischargeNotes,
      lastUnit: unitName
    }
    dischargedPatients.push(dischargedPatient)

    // Registrar movimiento
    const newMovement = {
      id: 'mov-' + Date.now(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      documentNumber: selectedPatient.documentNumber,
      fromLocation: unitName,
      toLocation: 'Alta Médica',
      reason: dischargeReason,
      date: new Date().toISOString(),
      performedBy: ADMIN_USER.name,
      type: 'alta'
    }

    localStorage.setItem('hospitalizedPatients', JSON.stringify(updatedPatients))
    localStorage.setItem('dischargedPatients', JSON.stringify(dischargedPatients))
    localStorage.setItem('patientMovements', JSON.stringify([newMovement, ...movements]))

    setDischargeDialogOpen(false)
    setSelectedPatient(null)
    setDischargeReason('')
    setDischargeNotes('')
    loadPatients()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${unitColor}`}>
              {unitIcon}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{unitName}</h1>
              <p className="text-muted-foreground">{patients.length} pacientes actualmente</p>
            </div>
          </div>
          <Link href="/censo">
            <Button variant="outline">
              <Building2 className="h-4 w-4 mr-2" />
              Ver Censo General
            </Button>
          </Link>
        </div>

        {/* Búsqueda */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabla de pacientes */}
        <Card>
          <CardHeader>
            <CardTitle>Pacientes en {unitName}</CardTitle>
            <CardDescription>Listado de pacientes hospitalizados en esta unidad</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay pacientes en esta unidad</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Documento</TableHead>
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
                              T{patient.triageLevel}
                            </Badge>
                          )}
                          <div>
                            <p>{patient.name}</p>
                            {patient.age && patient.gender && (
                              <p className="text-xs text-muted-foreground">
                                {patient.age} años, {patient.gender === 'M' ? 'Masculino' : 'Femenino'}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.documentNumber}</TableCell>
                      <TableCell>
                        {patient.bed ? (
                          <Badge variant="secondary">{patient.bed}</Badge>
                        ) : (
                          <span className="text-muted-foreground">Sin asignar</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {calculateDaysInUnit(patient.entryDate)}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={patient.diagnosis}>
                        {patient.diagnosis || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="default" 
                            size="sm" 
                            title="Evolución diaria"
                            onClick={() => {
                              setSelectedPatient(patient)
                              setEvolutionDialogOpen(true)
                            }}
                          >
                            <Stethoscope className="h-4 w-4 mr-1" />
                            Evolución
                          </Button>
                          <Link href={`/pacientes/${patient.id}/evoluciones`}>
                            <Button variant="ghost" size="sm" title="Ver evoluciones">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Trasladar"
                            onClick={() => {
                              setSelectedPatient(patient)
                              setTransferDialogOpen(true)
                            }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Dar de alta"
                            onClick={() => {
                              setSelectedPatient(patient)
                              setDischargeDialogOpen(true)
                            }}
                          >
                            <Home className="h-4 w-4" />
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

        {/* Diálogo de Traslado */}
        <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Trasladar Paciente</DialogTitle>
              <DialogDescription>
                Trasladar a {selectedPatient?.name} a otra unidad
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Unidad Destino *</Label>
                <Select value={transferUnit} onValueChange={setTransferUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIT_OPTIONS.filter(u => u.code !== unitCode).map(unit => (
                      <SelectItem key={unit.code} value={unit.code}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Motivo del Traslado *</Label>
                <Textarea
                  placeholder="Ingrese el motivo del traslado..."
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTransferDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleTransfer} disabled={!transferUnit || !transferReason}>
                Confirmar Traslado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Alta */}
        <Dialog open={dischargeDialogOpen} onOpenChange={setDischargeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dar de Alta al Paciente</DialogTitle>
              <DialogDescription>
                Registrar alta médica para {selectedPatient?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipo de Alta *</Label>
                <Select value={dischargeReason} onValueChange={setDischargeReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de alta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta médica con mejoría">Alta médica con mejoría</SelectItem>
                    <SelectItem value="Alta voluntaria">Alta voluntaria</SelectItem>
                    <SelectItem value="Remisión a otra institución">Remisión a otra institución</SelectItem>
                    <SelectItem value="Alta por curación">Alta por curación</SelectItem>
                    <SelectItem value="Alta con tratamiento ambulatorio">Alta con tratamiento ambulatorio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notas Adicionales</Label>
                <Textarea
                  placeholder="Instrucciones para el paciente, citas de control, etc."
                  value={dischargeNotes}
                  onChange={(e) => setDischargeNotes(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Esta acción registrará la salida del paciente del hospital
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDischargeDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleDischarge} disabled={!dischargeReason}>
                Confirmar Alta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Evolución */}
        {selectedPatient && (
          <DailyEvolutionDialog
            patient={selectedPatient}
            unitName={unitName}
            open={evolutionDialogOpen}
            onOpenChange={setEvolutionDialogOpen}
            onSave={loadPatients}
            user={ADMIN_USER}
          />
        )}
      </main>
    </div>
  )
}
