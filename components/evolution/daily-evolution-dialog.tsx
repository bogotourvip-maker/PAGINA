'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeSearchInput } from '@/components/medical/code-search-input'
import { Stethoscope, Activity, Pill, FileText, ClipboardList } from 'lucide-react'
import { logAuditAction } from '@/lib/audit-log'

interface Patient {
  id: string
  name: string
  documentNumber: string
  bed?: string
  admissionDate: string
  entryDate: string
  diagnosis?: string
  triageLevel?: number
  age?: string
  gender?: string
  unitCode?: string
  unit?: string
}

interface DailyEvolutionDialogProps {
  patient: Patient
  unitName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: () => void
  user: { name: string; email?: string }
}

export function DailyEvolutionDialog({
  patient,
  unitName,
  open,
  onOpenChange,
  onSave,
  user
}: DailyEvolutionDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('subjetivo')

  // Formato SOAP para evolución
  const [formData, setFormData] = useState({
    // Subjetivo - lo que el paciente refiere
    chiefComplaint: '',
    painLevel: '',
    symptoms: '',
    sleepQuality: '',
    appetite: '',
    
    // Objetivo - signos vitales y examen físico
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    temperature: '',
    oxygenSaturation: '',
    weight: '',
    physicalExam: '',
    
    // Análisis - diagnósticos
    currentDiagnosis: null as { code: string; description: string } | null,
    secondaryDiagnoses: [] as { code: string; description: string }[],
    clinicalAnalysis: '',
    
    // Plan - tratamiento
    medications: [] as { code: string; description: string }[],
    medicationNotes: '',
    procedures: [] as { code: string; description: string }[],
    procedureNotes: '',
    nursingOrders: '',
    dietOrders: '',
    
    // Notas adicionales
    additionalNotes: '',
    prognosis: 'estable' as 'favorable' | 'estable' | 'reservado' | 'grave',
  })

  const updateFormData = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      // Guardar evolución en localStorage
      const evolutions = JSON.parse(localStorage.getItem('patientEvolutions') || '[]')
      
      const newEvolution = {
        id: 'evo-' + Date.now(),
        patientId: patient.id,
        patientName: patient.name,
        documentNumber: patient.documentNumber,
        unit: unitName,
        date: new Date().toISOString(),
        performedBy: user.name,
        ...formData,
      }
      
      evolutions.unshift(newEvolution)
      localStorage.setItem('patientEvolutions', JSON.stringify(evolutions))
      
      // Registrar movimiento de evolución
      const movements = JSON.parse(localStorage.getItem('patientMovements') || '[]')
      const newMovement = {
        id: 'mov-' + Date.now(),
        patientId: patient.id,
        patientName: patient.name,
        documentNumber: patient.documentNumber,
        fromLocation: unitName,
        toLocation: unitName,
        reason: `Evolución médica - ${formData.prognosis}`,
        date: new Date().toISOString(),
        performedBy: user.name,
        type: 'evolucion'
      }
      movements.unshift(newMovement)
      localStorage.setItem('patientMovements', JSON.stringify(movements))
      
      // Registrar en auditoría
      logAuditAction('CREATE_EVOLUTION', `Evolución registrada - Pronóstico: ${formData.prognosis}`, {
        userId: user.email || 'usuario',
        userName: user.name,
        patientId: patient.id,
        patientName: patient.name,
        recordId: newEvolution.id,
        success: true
      })
      
      onOpenChange(false)
      onSave()
    } catch (error) {
      console.error('Error saving evolution:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const prognosisColors = {
    favorable: 'bg-green-100 text-green-800 border-green-300',
    estable: 'bg-blue-100 text-blue-800 border-blue-300',
    reservado: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    grave: 'bg-red-100 text-red-800 border-red-300',
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Evolución Médica Diaria
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-medium">{patient.name}</span>
              <Badge variant="outline">{patient.documentNumber}</Badge>
              <Badge variant="secondary">{unitName}</Badge>
              {patient.bed && <Badge>Cama: {patient.bed}</Badge>}
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="subjetivo" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Subjetivo
            </TabsTrigger>
            <TabsTrigger value="objetivo" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Objetivo
            </TabsTrigger>
            <TabsTrigger value="analisis" className="text-xs">
              <ClipboardList className="h-3 w-3 mr-1" />
              Análisis
            </TabsTrigger>
            <TabsTrigger value="plan" className="text-xs">
              <Pill className="h-3 w-3 mr-1" />
              Plan
            </TabsTrigger>
            <TabsTrigger value="notas" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Notas
            </TabsTrigger>
          </TabsList>

          {/* Tab Subjetivo */}
          <TabsContent value="subjetivo" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Lo que el paciente refiere</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Motivo de consulta / Queja principal</Label>
                  <Textarea
                    placeholder="¿Cómo se siente hoy? ¿Qué síntomas presenta?"
                    value={formData.chiefComplaint}
                    onChange={(e) => updateFormData('chiefComplaint', e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Nivel de dolor (0-10)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      placeholder="0"
                      value={formData.painLevel}
                      onChange={(e) => updateFormData('painLevel', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Calidad del sueño</Label>
                    <Input
                      placeholder="Bueno, regular, malo..."
                      value={formData.sleepQuality}
                      onChange={(e) => updateFormData('sleepQuality', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Apetito</Label>
                    <Input
                      placeholder="Normal, disminuido, aumentado..."
                      value={formData.appetite}
                      onChange={(e) => updateFormData('appetite', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Otros síntomas</Label>
                    <Input
                      placeholder="Náuseas, mareo, etc."
                      value={formData.symptoms}
                      onChange={(e) => updateFormData('symptoms', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Objetivo */}
          <TabsContent value="objetivo" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Signos Vitales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>Presión Arterial</Label>
                    <Input
                      placeholder="120/80"
                      value={formData.bloodPressure}
                      onChange={(e) => updateFormData('bloodPressure', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Frecuencia Cardíaca</Label>
                    <Input
                      placeholder="72 lpm"
                      value={formData.heartRate}
                      onChange={(e) => updateFormData('heartRate', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Frecuencia Respiratoria</Label>
                    <Input
                      placeholder="16 rpm"
                      value={formData.respiratoryRate}
                      onChange={(e) => updateFormData('respiratoryRate', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Temperatura</Label>
                    <Input
                      placeholder="36.5 °C"
                      value={formData.temperature}
                      onChange={(e) => updateFormData('temperature', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Saturación O2</Label>
                    <Input
                      placeholder="98%"
                      value={formData.oxygenSaturation}
                      onChange={(e) => updateFormData('oxygenSaturation', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Peso</Label>
                    <Input
                      placeholder="70 kg"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Examen Físico</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Hallazgos del examen físico del día: estado general, piel, cardiopulmonar, abdomen, extremidades, neurológico..."
                  value={formData.physicalExam}
                  onChange={(e) => updateFormData('physicalExam', e.target.value)}
                  rows={5}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Análisis */}
          <TabsContent value="analisis" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Diagnósticos (CIE-10)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeSearchInput
                  type="CIE10"
                  label="Diagnóstico Principal Actual"
                  placeholder="Buscar diagnóstico..."
                  singleValue={formData.currentDiagnosis}
                  onSingleChange={(code) => updateFormData('currentDiagnosis', code)}
                />

                <CodeSearchInput
                  type="CIE10"
                  label="Diagnósticos Secundarios / Comorbilidades"
                  placeholder="Buscar diagnósticos adicionales..."
                  multiple
                  value={formData.secondaryDiagnoses}
                  onChange={(codes) => updateFormData('secondaryDiagnoses', codes)}
                />

                <div className="grid gap-2">
                  <Label>Análisis Clínico</Label>
                  <Textarea
                    placeholder="Interpretación de hallazgos, evolución del cuadro clínico, respuesta al tratamiento..."
                    value={formData.clinicalAnalysis}
                    onChange={(e) => updateFormData('clinicalAnalysis', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Plan */}
          <TabsContent value="plan" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Medicamentos (CUMS)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeSearchInput
                  type="CUMS"
                  label="Medicamentos"
                  placeholder="Buscar medicamentos..."
                  multiple
                  value={formData.medications}
                  onChange={(codes) => updateFormData('medications', codes)}
                />
                <Textarea
                  placeholder="Dosis, vía de administración, frecuencia, duración..."
                  value={formData.medicationNotes}
                  onChange={(e) => updateFormData('medicationNotes', e.target.value)}
                  rows={2}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Procedimientos / Exámenes (CUPS)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeSearchInput
                  type="CUPS"
                  label="Procedimientos y Exámenes"
                  placeholder="Buscar procedimientos..."
                  multiple
                  value={formData.procedures}
                  onChange={(codes) => updateFormData('procedures', codes)}
                />
                <Textarea
                  placeholder="Indicaciones especiales para los procedimientos..."
                  value={formData.procedureNotes}
                  onChange={(e) => updateFormData('procedureNotes', e.target.value)}
                  rows={2}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Órdenes de Enfermería</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Cuidados de enfermería, monitoreo, etc."
                    value={formData.nursingOrders}
                    onChange={(e) => updateFormData('nursingOrders', e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Órdenes Dietéticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Tipo de dieta, restricciones, etc."
                    value={formData.dietOrders}
                    onChange={(e) => updateFormData('dietOrders', e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Notas */}
          <TabsContent value="notas" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pronóstico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {(['favorable', 'estable', 'reservado', 'grave'] as const).map((prognosis) => (
                    <Button
                      key={prognosis}
                      type="button"
                      variant="outline"
                      className={`flex-1 capitalize ${formData.prognosis === prognosis ? prognosisColors[prognosis] : ''}`}
                      onClick={() => updateFormData('prognosis', prognosis)}
                    >
                      {prognosis}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Notas Adicionales</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Observaciones, pendientes, interconsultas solicitadas, etc."
                  value={formData.additionalNotes}
                  onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                  rows={5}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Evolución'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
