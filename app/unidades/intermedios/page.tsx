import { UnitPatientsView } from '@/components/units/unit-patients-view'
import { Activity } from 'lucide-react'

export default function IntermediosPage() {
  return (
    <UnitPatientsView
      unitCode="intermedios"
      unitName="Unidad de Cuidados Intermedios"
      unitIcon={<Activity className="h-6 w-6 text-white" />}
      unitColor="bg-purple-600"
    />
  )
}
