import { UnitPatientsView } from '@/components/units/unit-patients-view'
import { Eye } from 'lucide-react'

export default function ObservacionPage() {
  return (
    <UnitPatientsView
      unitCode="observacion"
      unitName="Sala de Observación"
      unitIcon={<Eye className="h-6 w-6 text-white" />}
      unitColor="bg-orange-600"
    />
  )
}
