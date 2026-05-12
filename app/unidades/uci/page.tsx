import { UnitPatientsView } from '@/components/units/unit-patients-view'
import { HeartPulse } from 'lucide-react'

export default function UCIPage() {
  return (
    <UnitPatientsView
      unitCode="uci"
      unitName="Unidad de Cuidados Intensivos (UCI)"
      unitIcon={<HeartPulse className="h-6 w-6 text-white" />}
      unitColor="bg-pink-600"
    />
  )
}
