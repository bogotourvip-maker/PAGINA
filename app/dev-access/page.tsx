import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DevAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Acceso Rápido al Sistema</CardTitle>
          <CardDescription>
            Accede directamente al sistema hospitalario sin necesidad de autenticación para pruebas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Modo Desarrollo</h3>
            <p className="text-sm text-blue-700 mb-4">
              Esta es una ruta especial de desarrollo que te permite acceder al sistema sin autenticación.
              Perfecto para probar todas las funcionalidades del sistema hospitalario.
            </p>
            <Link href="/dev-dashboard">
              <Button className="w-full" size="lg">
                Acceder al Dashboard
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Rutas Disponibles:</h3>
            <div className="grid gap-2">
              <Link href="/dev-dashboard">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📊 Dashboard Principal
                </Button>
              </Link>
              <Link href="/unidades">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🏥 Gestión de Unidades
                </Button>
              </Link>
              <Link href="/pacientes">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  👥 Lista de Pacientes
                </Button>
              </Link>
              <Link href="/pacientes/nuevo">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  ➕ Registrar Nuevo Paciente
                </Button>
              </Link>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Funcionalidades Disponibles:</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✓ Vista general del hospital con estadísticas en tiempo real</li>
              <li>✓ Gestión de 5 unidades: Urgencias, Observación, Hospitalización, Intermedios, UCI</li>
              <li>✓ Registro completo de pacientes con información demográfica y médica</li>
              <li>✓ Sistema de traslados entre unidades con conteo de días</li>
              <li>✓ Historia clínica digital</li>
              <li>✓ Notas de especialidades (médicos, enfermeras, terapeutas)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> Este modo de acceso es solo para desarrollo y pruebas.
              En producción, todos los usuarios deben autenticarse correctamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
