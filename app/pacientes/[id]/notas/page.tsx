import { SpecialtyNotesContent } from '@/components/notes/specialty-notes-content'

export default async function SpecialtyNotesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <SpecialtyNotesContent patientId={id} />
}
