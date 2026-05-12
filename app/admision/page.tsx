import { PatientRegistrationForm } from '@/components/admissions/patient-registration-form'
import { ADMIN_USER } from '@/lib/mock-user'

export default function AdmisionPage() {
  return <PatientRegistrationForm user={ADMIN_USER} />
}
