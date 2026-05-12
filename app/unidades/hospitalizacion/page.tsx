import { UnitPatientsView } from '@/components/units/unit-patients-view'
import { Bed } from 'lucide-react'

export default function HospitalizacionPage() {
  return (
    <UnitPatientsView
      unitCode="hospitalizacion"
      unitName="Hospitalización General"
      unitIcon={<Bed className="h-6 w-6 text-white" />}
      unitColor="bg-blue-600"
    />
  )
}
