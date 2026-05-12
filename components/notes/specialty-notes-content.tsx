'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Stethoscope, Heart, Activity, Brain, UserCheck, FileText } from 'lucide-react'
import { CreateSpecialtyNoteDialog } from './create-specialty-note-dialog'
import type { SpecialtyNote, Patient } from '@/lib/types'

interface SpecialtyNotesContentProps {
  patientId: string
}

export function SpecialtyNotesContent({ patientId }: SpecialtyNotesContentProps) {
  const [notes, setNotes] = useState<SpecialtyNote[]>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('medico')
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [patientId])

  async function loadData() {
    try {
      // Load patient
      const { data: patientData } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single()

      if (patientData) setPatient(patientData)

      // Load specialty notes
      const { data: notesData } = await supabase
        .from('specialty_notes')
        .select(`
          *,
          profiles:created_by (
            full_name,
            role
          )
        `)
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false })

      if (notesData) setNotes(notesData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const specialtyTypes = [
    { id: 'medico', name: 'Médico', icon: Stethoscope, color: 'bg-blue-500' },
    { id: 'enfermeria', name: 'Enfermería', icon: Heart, color: 'bg-red-500' },
    { id: 'terapia_fisica', name: 'Terapia Física', icon: Activity, color: 'bg-green-500' },
    { id: 'terapia_ocupacional', name: 'Terapia Ocupacional', icon: Brain, color: 'bg-purple-500' },
    { id: 'terapia_respiratoria', name: 'Terapia Respiratoria', icon: Activity, color: 'bg-cyan-500' },
    { id: 'especialista', name: 'Especialista', icon: UserCheck, color: 'bg-orange-500' },
    { id: 'otra', name: 'Otras Notas', icon: FileText, color: 'bg-gray-500' },
  ]

  const getSpecialtyInfo = (specialty: string) => {
    return specialtyTypes.find(s => s.id === specialty) || specialtyTypes[0]
  }

  const filterNotesBySpecialty = (specialty: string) => {
    if (specialty === 'medico') {
      return notes.filter(n => n.specialty_type === 'medico' || n.specialty_type === 'medicina_general')
    }
    if (specialty === 'enfermeria') {
      return notes.filter(n => n.specialty_type === 'enfermeria' || n.specialty_type === 'auxiliar_enfermeria')
    }
    return notes.filter(n => n.specialty_type === specialty)
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Cargando notas...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notas de Especialidad</h1>
          {patient && (
            <p className="text-muted-foreground">
              {patient.full_name} - {patient.identification_type} {patient.identification_number}
            </p>
          )}
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Nota
        </Button>
      </div>

      <Tabs value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
        <TabsList className="grid w-full grid-cols-7">
          {specialtyTypes.map((specialty) => {
            const Icon = specialty.icon
            const count = filterNotesBySpecialty(specialty.id).length
            return (
              <TabsTrigger key={specialty.id} value={specialty.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{specialty.name}</span>
                <Badge variant="secondary" className="ml-1">{count}</Badge>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {specialtyTypes.map((specialty) => {
          const filteredNotes = filterNotesBySpecialty(specialty.id)
          const Icon = specialty.icon

          return (
            <TabsContent key={specialty.id} value={specialty.id} className="space-y-4">
              {filteredNotes.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Icon className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      No hay notas de {specialty.name.toLowerCase()} registradas
                    </p>
                    <Button 
                      onClick={() => setIsDialogOpen(true)} 
                      variant="outline" 
                      className="mt-4"
                    >
                      Crear primera nota
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredNotes.map((note) => {
                    const noteSpecialty = getSpecialtyInfo(note.specialty_type)
                    const NoteIcon = noteSpecialty.icon
                    
                    return (
                      <Card key={note.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${noteSpecialty.color} text-white`}>
                                <NoteIcon className="h-5 w-5" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{note.title}</CardTitle>
                                <CardDescription>
                                  {note.profiles?.full_name} ({note.profiles?.role}) • {' '}
                                  {new Date(note.created_at).toLocaleString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge variant="secondary">{noteSpecialty.name}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Descripción</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {note.description}
                              </p>
                            </div>
                            
                            {note.findings && (
                              <div>
                                <h4 className="font-semibold mb-2">Hallazgos</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {note.findings}
                                </p>
                              </div>
                            )}
                            
                            {note.treatment && (
                              <div>
                                <h4 className="font-semibold mb-2">Tratamiento/Plan</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {note.treatment}
                                </p>
                              </div>
                            )}
                            
                            {note.recommendations && (
                              <div>
                                <h4 className="font-semibold mb-2">Recomendaciones</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {note.recommendations}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>

      <CreateSpecialtyNoteDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        patientId={patientId}
        onSuccess={() => {
          loadData()
          setIsDialogOpen(false)
        }}
      />
    </div>
  )
}
