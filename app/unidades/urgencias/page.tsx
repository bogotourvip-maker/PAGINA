import { UnitPatientsView } from '@/components/units/unit-patients-view'
import { Siren } from 'lucide-react'

export default function UrgenciasPage() {
  return (
    <UnitPatientsView
      unitCode="urgencias"
      unitName="Urgencias"
      unitIcon={<Siren className="h-6 w-6 text-white" />}
      unitColor="bg-red-600"
    />
  )
}
