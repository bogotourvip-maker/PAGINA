'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  User, 
  Stethoscope, 
  Building2, 
  FileText, 
  Activity,
  ClipboardList,
  TestTube,
  CheckCircle
} from 'lucide-react'
import type { Patient, Admission, Unit, TriageLevel } from '@/lib/types'
import { CodeSearchInput } from '@/components/medical/code-search-input'

// Función para calcular edad
function calculateAge(dateOfBirth: string): string {
  if (!dateOfBirth) return 'N/A'
  
  const birth = new Date(dateOfBirth)
  const today = new Date()
  
  let years = today.getFullYear() - birth.getFullYear()
  const months = today.getMonth() - birth.getMonth()
  
  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    years--
  }
  
  return `${years} años`
}

interface PatientWithAdmission extends Patient {
  admission?: Admission
}

interface TriageEvaluationDialogProps {
  patient: PatientWithAdmission
  units: Unit[]
  open: boolean
  onOpenChange: (open: boolean) => void
  user: { name: string; email?: string }
}

const triageLevels: { level: TriageLevel; label: string; description: string; color: string }[] = [
  { level: 1, label: 'Resucitación', description: 'Condición que amenaza la vida, requiere intervención inmediata', color: 'bg-red-500' },
  { level: 2, label: 'Emergencia', description: 'Condición de alto riesgo, dolor severo, confusión', color: 'bg-orange-500' },
  { level: 3, label: 'Urgencia', description: 'Requiere evaluación urgente pero estable', color: 'bg-yellow-500' },
  { level: 4, label: 'Menos Urgente', description: 'Condición que puede esperar 1-2 horas', color: 'bg-green-500' },
  { level: 5, label: 'No Urgente', description: 'Problema menor, puede ser atendido en consulta externa', color: 'bg-blue-500' },
]

export function TriageEvaluationDialog({
  patient,
  units,
  open,
  onOpenChange,
  user,
}: TriageEvaluationDialogProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('motivo')

  const [formData, setFormData] = useState({
    // Nivel de Triage
    triageLevel: patient.admission?.triage_level || ('' as TriageLevel | ''),
    
    // Motivo de consulta
    chiefComplaint: patient.admission?.admission_reason || '',
    symptomOnset: '',
    symptomDuration: '',
    associatedSymptoms: '',
    
    // Signos vitales
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    temperature: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    
    // Examen físico por áreas
    examGeneral: '',
    examHead: '',
    examEyes: '',
    examEars: '',
    examNose: '',
    examMouth: '',
    examNeck: '',
    examChest: '',
    examCardiovascular: '',
    examAbdomen: '',
    examGenitourinary: '',
    examExtremities: '',
    examNeurological: '',
    examSkin: '',
    
    // Diagnósticos (con código CIE-10)
    primaryDiagnosis: null as { code: string; description: string } | null,
    secondaryDiagnoses: [] as { code: string; description: string }[],
    differentialDiagnosis: '',
    
    // Exámenes médicos solicitados (con código CUPS)
    labTests: [] as { code: string; description: string }[],
    imagingStudies: [] as { code: string; description: string }[],
    otherTests: '',
    
    // Medicamentos prescritos (con código CUMS)
    medications: [] as { code: string; description: string }[],
    
    // Resultado y conclusiones
    consultationResult: '' as 'hospitalizacion' | 'observacion' | 'consulta_externa' | 'alta' | '',
    treatment: '',
    conclusions: '',
    recommendations: '',
    
    // Asignación de destino
    unitId: '',
    bedNumber: '',
  })

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveAndContinue = () => {
    // Validar tab actual y pasar al siguiente
    const tabs = ['motivo', 'signos', 'examen', 'diagnostico', 'examenes', 'resultado']
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handleComplete = async () => {
    if (!formData.triageLevel) {
      setError('Debe seleccionar un nivel de triage')
      return
    }
    if (!formData.primaryDiagnosis?.code) {
      setError('Debe seleccionar un diagnóstico principal (CIE-10)')
      return
    }
    if (!formData.consultationResult) {
      setError('Debe seleccionar el resultado de la consulta')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Preparar datos de evaluación completa
      const evaluationData = {
        triage_level: formData.triageLevel,
        triage_notes: JSON.stringify({
          chiefComplaint: formData.chiefComplaint,
          symptomOnset: formData.symptomOnset,
          symptomDuration: formData.symptomDuration,
          associatedSymptoms: formData.associatedSymptoms,
          vitalSigns: {
            bloodPressure: formData.bloodPressure,
            heartRate: formData.heartRate,
            respiratoryRate: formData.respiratoryRate,
            temperature: formData.temperature,
            oxygenSaturation: formData.oxygenSaturation,
            weight: formData.weight,
            height: formData.height,
          },
          physicalExam: {
            general: formData.examGeneral,
            head: formData.examHead,
            eyes: formData.examEyes,
            ears: formData.examEars,
            nose: formData.examNose,
            mouth: formData.examMouth,
            neck: formData.examNeck,
            chest: formData.examChest,
            cardiovascular: formData.examCardiovascular,
            abdomen: formData.examAbdomen,
            genitourinary: formData.examGenitourinary,
            extremities: formData.examExtremities,
            neurological: formData.examNeurological,
            skin: formData.examSkin,
          },
          diagnoses: {
            primary: formData.primaryDiagnosis,
            secondary: formData.secondaryDiagnoses,
            differential: formData.differentialDiagnosis,
          },
          labTests: formData.labTests,
          imagingStudies: formData.imagingStudies,
          otherTests: formData.otherTests,
          medications: formData.medications,
          treatment: formData.treatment,
          conclusions: formData.conclusions,
          recommendations: formData.recommendations,
        }),
        admission_diagnosis: formData.primaryDiagnosis ? `${formData.primaryDiagnosis.code} - ${formData.primaryDiagnosis.description}` : '',
        triage_date: new Date().toISOString(),
      }

      // Intentar guardar en Supabase
      const { error: updateError } = await supabase
        .from('admissions')
        .update(evaluationData)
        .eq('id', patient.admission?.id)

      if (updateError) {
        // Si falla Supabase, actualizar en localStorage
        const storedPatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
        const updatedPatients = storedPatients.map((p: PatientWithAdmission) => {
          if (p.id === patient.id) {
            return {
              ...p,
              admission: {
                ...p.admission,
                ...evaluationData,
                status: formData.consultationResult === 'alta' ? 'discharged' : 
                        formData.consultationResult === 'consulta_externa' ? 'consulta_externa' : 
                        'active'
              }
            }
          }
          return p
        })
        localStorage.setItem('triagePatients', JSON.stringify(updatedPatients))
      }

      // Si requiere hospitalización, crear estancia
      if (formData.consultationResult === 'hospitalizacion' || formData.consultationResult === 'observacion') {
        if (formData.unitId) {
          await supabase.from('unit_stays').insert({
            admission_id: patient.admission?.id,
            patient_id: patient.id,
            unit_id: formData.unitId,
            bed_number: formData.bedNumber || null,
            status: 'active',
          })

          await supabase.from('unit_transfers').insert({
            admission_id: patient.admission?.id,
            patient_id: patient.id,
            to_unit_id: formData.unitId,
            transfer_reason: `Ingreso desde Triage - ${formData.primaryDiagnosis}`,
            bed_number: formData.bedNumber || null,
          })

          await supabase
            .from('admissions')
            .update({ status: 'active' })
            .eq('id', patient.admission?.id)
        }
      } else if (formData.consultationResult === 'consulta_externa') {
        await supabase
          .from('admissions')
          .update({ status: 'consulta_externa' })
          .eq('id', patient.admission?.id)
      } else if (formData.consultationResult === 'alta') {
        await supabase
          .from('admissions')
          .update({ 
            status: 'discharged',
            discharge_date: new Date().toISOString(),
            discharge_diagnosis: formData.primaryDiagnosis,
          })
          .eq('id', patient.admission?.id)
      }

      // Remover de triage en localStorage
      const storedPatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
      const filteredPatients = storedPatients.filter((p: PatientWithAdmission) => p.id !== patient.id)
      localStorage.setItem('triagePatients', JSON.stringify(filteredPatients))

      // Registrar movimiento y agregar a unidad correspondiente
      const movements = JSON.parse(localStorage.getItem('patientMovements') || '[]')
      const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
      const dischargedPatients = JSON.parse(localStorage.getItem('dischargedPatients') || '[]')

      const selectedUnit = units.find(u => u.id === formData.unitId)
      const diagnosisText = formData.primaryDiagnosis ? `${formData.primaryDiagnosis.code} - ${formData.primaryDiagnosis.description}` : ''

      if (formData.consultationResult === 'hospitalizacion' || formData.consultationResult === 'observacion') {
        // Agregar a pacientes hospitalizados
        const hospitalizedPatient = {
          id: patient.id,
          name: `${patient.first_name} ${patient.last_name}`,
          first_name: patient.first_name,
          last_name: patient.last_name,
          documentNumber: patient.document_number,
          document_number: patient.document_number,
          unitCode: selectedUnit?.code || formData.consultationResult,
          unit: selectedUnit?.name || (formData.consultationResult === 'observacion' ? 'Observación' : 'Hospitalización'),
          bed: formData.bedNumber,
          admissionDate: patient.admission?.admission_date || new Date().toISOString(),
          entryDate: new Date().toISOString(),
          diagnosis: diagnosisText,
          triageLevel: formData.triageLevel,
          age: calculateAge(patient.date_of_birth),
          gender: patient.gender,
        }
        hospitalizedPatients.push(hospitalizedPatient)
        localStorage.setItem('hospitalizedPatients', JSON.stringify(hospitalizedPatients))

        // Registrar movimiento de ingreso
        const movement = {
          id: 'mov-' + Date.now(),
          patientId: patient.id,
          patientName: `${patient.first_name} ${patient.last_name}`,
          documentNumber: patient.document_number,
          fromLocation: 'Triage',
          toLocation: selectedUnit?.name || 'Hospitalización',
          reason: `Ingreso por: ${diagnosisText}`,
          date: new Date().toISOString(),
          performedBy: user.name,
          type: 'ingreso'
        }
        movements.unshift(movement)
      } else if (formData.consultationResult === 'alta' || formData.consultationResult === 'consulta_externa') {
        // Registrar alta directa desde triage
        const dischargedPatient = {
          id: patient.id,
          name: `${patient.first_name} ${patient.last_name}`,
          documentNumber: patient.document_number,
          dischargeDate: new Date().toISOString(),
          dischargeReason: formData.consultationResult === 'alta' ? 'Alta médica desde Triage' : 'Referido a Consulta Externa',
          diagnosis: diagnosisText,
          lastUnit: 'Triage'
        }
        dischargedPatients.push(dischargedPatient)
        localStorage.setItem('dischargedPatients', JSON.stringify(dischargedPatients))

        // Registrar movimiento
        const movement = {
          id: 'mov-' + Date.now(),
          patientId: patient.id,
          patientName: `${patient.first_name} ${patient.last_name}`,
          documentNumber: patient.document_number,
          fromLocation: 'Triage',
          toLocation: formData.consultationResult === 'alta' ? 'Alta Médica' : 'Consulta Externa',
          reason: formData.conclusions || diagnosisText,
          date: new Date().toISOString(),
          performedBy: user.name,
          type: 'alta'
        }
        movements.unshift(movement)
      }

      localStorage.setItem('patientMovements', JSON.stringify(movements))

      onOpenChange(false)
      router.refresh()
      window.location.reload() // Forzar recarga para actualizar la lista
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al completar la evaluación')
    } finally {
      setIsLoading(false)
    }
  }

  // Filtrar unidades de hospitalización
  const hospitalizationUnits = units.filter(
    u => !['triage', 'consulta_externa'].includes(u.code)
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Evaluación Médica de Triage
          </DialogTitle>
          <DialogDescription>
            Paciente: {patient.first_name} {patient.last_name} | {patient.document_type}: {patient.document_number} | Edad: {calculateAge(patient.date_of_birth)}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(95vh-120px)]">
          <div className="px-6 pb-6">
            {/* Info rápida del paciente */}
            <Card className="bg-muted/50 mb-4">
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Género</p>
                    <p className="font-medium">{patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Femenino' : 'Otro'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tipo de Sangre</p>
                    <p className="font-medium">{patient.blood_type || 'No registrado'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">EPS</p>
                    <p className="font-medium">{patient.insurance_provider || 'Sin información'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Alergias</p>
                    <p className="font-medium text-red-600">{patient.allergies || 'Ninguna reportada'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nivel de Triage */}
            <Card className="mb-4">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Clasificación de Triage *</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {triageLevels.map(({ level, label, color }) => (
                    <Button
                      key={level}
                      variant={formData.triageLevel === level ? 'default' : 'outline'}
                      className={formData.triageLevel === level ? color : ''}
                      onClick={() => updateFormData('triageLevel', level)}
                      size="sm"
                    >
                      {level} - {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 mb-4">
                <TabsTrigger value="motivo" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  Motivo
                </TabsTrigger>
                <TabsTrigger value="signos" className="text-xs">
                  <Activity className="h-3 w-3 mr-1" />
                  Signos
                </TabsTrigger>
                <TabsTrigger value="examen" className="text-xs">
                  <User className="h-3 w-3 mr-1" />
                  Ex. Físico
                </TabsTrigger>
                <TabsTrigger value="diagnostico" className="text-xs">
                  <ClipboardList className="h-3 w-3 mr-1" />
                  Diagnóstico
                </TabsTrigger>
                <TabsTrigger value="examenes" className="text-xs">
                  <TestTube className="h-3 w-3 mr-1" />
                  Exámenes
                </TabsTrigger>
                <TabsTrigger value="resultado" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Resultado
                </TabsTrigger>
              </TabsList>

              {/* Tab: Motivo de Consulta */}
              <TabsContent value="motivo" className="space-y-4">
                <div>
                  <Label htmlFor="chiefComplaint">Motivo de Consulta *</Label>
                  <Textarea
                    id="chiefComplaint"
                    placeholder="Describa el motivo principal de consulta del paciente"
                    value={formData.chiefComplaint}
                    onChange={(e) => updateFormData('chiefComplaint', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="symptomOnset">Inicio de Síntomas</Label>
                    <Input
                      id="symptomOnset"
                      placeholder="Ej: Hace 2 días"
                      value={formData.symptomOnset}
                      onChange={(e) => updateFormData('symptomOnset', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="symptomDuration">Duración</Label>
                    <Input
                      id="symptomDuration"
                      placeholder="Ej: Constante, Intermitente"
                      value={formData.symptomDuration}
                      onChange={(e) => updateFormData('symptomDuration', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="associatedSymptoms">Síntomas Asociados</Label>
                  <Textarea
                    id="associatedSymptoms"
                    placeholder="Otros síntomas que acompañan el cuadro principal"
                    value={formData.associatedSymptoms}
                    onChange={(e) => updateFormData('associatedSymptoms', e.target.value)}
                    rows={2}
                  />
                </div>
              </TabsContent>

              {/* Tab: Signos Vitales */}
              <TabsContent value="signos" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="bloodPressure">Presión Arterial</Label>
                    <Input
                      id="bloodPressure"
                      placeholder="120/80 mmHg"
                      value={formData.bloodPressure}
                      onChange={(e) => updateFormData('bloodPressure', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="heartRate">Frec. Cardíaca</Label>
                    <Input
                      id="heartRate"
                      placeholder="80 lpm"
                      value={formData.heartRate}
                      onChange={(e) => updateFormData('heartRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="respiratoryRate">Frec. Respiratoria</Label>
                    <Input
                      id="respiratoryRate"
                      placeholder="16 rpm"
                      value={formData.respiratoryRate}
                      onChange={(e) => updateFormData('respiratoryRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="temperature">Temperatura</Label>
                    <Input
                      id="temperature"
                      placeholder="36.5 °C"
                      value={formData.temperature}
                      onChange={(e) => updateFormData('temperature', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="oxygenSaturation">Saturación O2</Label>
                    <Input
                      id="oxygenSaturation"
                      placeholder="98%"
                      value={formData.oxygenSaturation}
                      onChange={(e) => updateFormData('oxygenSaturation', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      placeholder="70 kg"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Talla (cm)</Label>
                    <Input
                      id="height"
                      placeholder="170 cm"
                      value={formData.height}
                      onChange={(e) => updateFormData('height', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Tab: Examen Físico */}
              <TabsContent value="examen" className="space-y-4">
                <div>
                  <Label htmlFor="examGeneral">Estado General</Label>
                  <Textarea
                    id="examGeneral"
                    placeholder="Aspecto general, estado de conciencia, orientación..."
                    value={formData.examGeneral}
                    onChange={(e) => updateFormData('examGeneral', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="examHead">Cabeza</Label>
                    <Textarea
                      id="examHead"
                      placeholder="Normocéfalo, sin masas..."
                      value={formData.examHead}
                      onChange={(e) => updateFormData('examHead', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examEyes">Ojos</Label>
                    <Textarea
                      id="examEyes"
                      placeholder="Pupilas isocóricas, reactivas..."
                      value={formData.examEyes}
                      onChange={(e) => updateFormData('examEyes', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examEars">Oídos</Label>
                    <Textarea
                      id="examEars"
                      placeholder="Conductos permeables..."
                      value={formData.examEars}
                      onChange={(e) => updateFormData('examEars', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examNose">Nariz</Label>
                    <Textarea
                      id="examNose"
                      placeholder="Fosas nasales permeables..."
                      value={formData.examNose}
                      onChange={(e) => updateFormData('examNose', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examMouth">Boca y Faringe</Label>
                    <Textarea
                      id="examMouth"
                      placeholder="Mucosas húmedas, orofaringe normal..."
                      value={formData.examMouth}
                      onChange={(e) => updateFormData('examMouth', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examNeck">Cuello</Label>
                    <Textarea
                      id="examNeck"
                      placeholder="Sin adenopatías, tiroides normal..."
                      value={formData.examNeck}
                      onChange={(e) => updateFormData('examNeck', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examChest">Tórax y Pulmones</Label>
                    <Textarea
                      id="examChest"
                      placeholder="Murmullo vesicular presente..."
                      value={formData.examChest}
                      onChange={(e) => updateFormData('examChest', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examCardiovascular">Cardiovascular</Label>
                    <Textarea
                      id="examCardiovascular"
                      placeholder="Ruidos cardíacos rítmicos..."
                      value={formData.examCardiovascular}
                      onChange={(e) => updateFormData('examCardiovascular', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examAbdomen">Abdomen</Label>
                    <Textarea
                      id="examAbdomen"
                      placeholder="Blando, depresible, no doloroso..."
                      value={formData.examAbdomen}
                      onChange={(e) => updateFormData('examAbdomen', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examGenitourinary">Genitourinario</Label>
                    <Textarea
                      id="examGenitourinary"
                      placeholder="Sin alteraciones..."
                      value={formData.examGenitourinary}
                      onChange={(e) => updateFormData('examGenitourinary', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examExtremities">Extremidades</Label>
                    <Textarea
                      id="examExtremities"
                      placeholder="Sin edemas, pulsos presentes..."
                      value={formData.examExtremities}
                      onChange={(e) => updateFormData('examExtremities', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examNeurological">Neurológico</Label>
                    <Textarea
                      id="examNeurological"
                      placeholder="Glasgow 15/15, sin déficit motor..."
                      value={formData.examNeurological}
                      onChange={(e) => updateFormData('examNeurological', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="examSkin">Piel y Anexos</Label>
                  <Textarea
                    id="examSkin"
                    placeholder="Hidratada, sin lesiones..."
                    value={formData.examSkin}
                    onChange={(e) => updateFormData('examSkin', e.target.value)}
                    rows={2}
                  />
                </div>
              </TabsContent>

              {/* Tab: Diagnóstico */}
              <TabsContent value="diagnostico" className="space-y-4">
                <CodeSearchInput
                  type="CIE10"
                  label="Diagnóstico Principal (CIE-10) *"
                  placeholder="Buscar diagnóstico por código o descripción..."
                  singleValue={formData.primaryDiagnosis}
                  onSingleChange={(code) => setFormData(prev => ({ ...prev, primaryDiagnosis: code }))}
                />
                
                <CodeSearchInput
                  type="CIE10"
                  label="Diagnósticos Secundarios (CIE-10)"
                  placeholder="Buscar comorbilidades o diagnósticos adicionales..."
                  multiple
                  value={formData.secondaryDiagnoses}
                  onChange={(codes) => setFormData(prev => ({ ...prev, secondaryDiagnoses: codes }))}
                />
                
                <div>
                  <Label htmlFor="differentialDiagnosis">Diagnóstico Diferencial</Label>
                  <Textarea
                    id="differentialDiagnosis"
                    placeholder="Otros diagnósticos a descartar"
                    value={formData.differentialDiagnosis}
                    onChange={(e) => updateFormData('differentialDiagnosis', e.target.value)}
                    rows={2}
                  />
                </div>
              </TabsContent>

              {/* Tab: Exámenes Médicos */}
              <TabsContent value="examenes" className="space-y-4">
                <CodeSearchInput
                  type="CUPS"
                  label="Exámenes de Laboratorio (CUPS)"
                  placeholder="Buscar exámenes por código CUPS o descripción..."
                  multiple
                  value={formData.labTests}
                  onChange={(codes) => setFormData(prev => ({ ...prev, labTests: codes }))}
                />
                
                <CodeSearchInput
                  type="CUPS"
                  label="Estudios de Imágenes (CUPS)"
                  placeholder="Buscar estudios de imagen por código CUPS..."
                  multiple
                  value={formData.imagingStudies}
                  onChange={(codes) => setFormData(prev => ({ ...prev, imagingStudies: codes }))}
                />
                
                <div>
                  <Label htmlFor="otherTests">Otros Exámenes o Procedimientos</Label>
                  <Textarea
                    id="otherTests"
                    placeholder="EKG, espirometría, interconsultas, otros estudios especializados"
                    value={formData.otherTests}
                    onChange={(e) => updateFormData('otherTests', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <CodeSearchInput
                  type="CUMS"
                  label="Medicamentos Prescritos (CUMS)"
                  placeholder="Buscar medicamentos por código CUMS o nombre..."
                  multiple
                  value={formData.medications}
                  onChange={(codes) => setFormData(prev => ({ ...prev, medications: codes }))}
                />
              </TabsContent>

              {/* Tab: Resultado y Conclusiones */}
              <TabsContent value="resultado" className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Resultado de la Consulta *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      { value: 'hospitalizacion', label: 'Hospitalización', desc: 'Requiere ingreso hospitalario' },
                      { value: 'observacion', label: 'Observación', desc: 'Requiere observación temporal' },
                      { value: 'consulta_externa', label: 'Consulta Externa', desc: 'Remitir a consulta especializada' },
                      { value: 'alta', label: 'Alta Médica', desc: 'Egreso con recomendaciones' },
                    ].map(option => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.consultationResult === option.value
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-muted-foreground/50'
                        }`}
                        onClick={() => updateFormData('consultationResult', option.value)}
                      >
                        <p className="font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {(formData.consultationResult === 'hospitalizacion' || formData.consultationResult === 'observacion') && (
                  <Card className="border-primary/50">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Asignación de Unidad
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label htmlFor="unitId">Unidad *</Label>
                        <select
                          id="unitId"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                          value={formData.unitId}
                          onChange={(e) => updateFormData('unitId', e.target.value)}
                        >
                          <option value="">Seleccionar unidad...</option>
                          {hospitalizationUnits.map(unit => (
                            <option key={unit.id} value={unit.id} disabled={unit.available_beds === 0}>
                              {unit.name} ({unit.available_beds} camas)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="bedNumber">Número de Cama</Label>
                        <Input
                          id="bedNumber"
                          placeholder="Ej: 101, A-5"
                          value={formData.bedNumber}
                          onChange={(e) => updateFormData('bedNumber', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div>
                  <Label htmlFor="treatment">Plan de Tratamiento</Label>
                  <Textarea
                    id="treatment"
                    placeholder="Medicamentos, procedimientos, intervenciones..."
                    value={formData.treatment}
                    onChange={(e) => updateFormData('treatment', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="conclusions">Conclusiones</Label>
                  <Textarea
                    id="conclusions"
                    placeholder="Resumen y conclusiones de la evaluación"
                    value={formData.conclusions}
                    onChange={(e) => updateFormData('conclusions', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="recommendations">Recomendaciones</Label>
                  <Textarea
                    id="recommendations"
                    placeholder="Indicaciones para el paciente, signos de alarma, seguimiento..."
                    value={formData.recommendations}
                    onChange={(e) => updateFormData('recommendations', e.target.value)}
                    rows={2}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md mt-4">
                {error}
              </div>
            )}

            <div className="flex justify-between gap-4 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <div className="flex gap-2">
                {activeTab !== 'resultado' && (
                  <Button variant="outline" onClick={handleSaveAndContinue}>
                    Siguiente
                  </Button>
                )}
                <Button onClick={handleComplete} disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Completar Evaluación'}
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
