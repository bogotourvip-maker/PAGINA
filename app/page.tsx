import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Shield, Activity } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Sistema Hospitalario</h1>
          </div>
          <nav>
            <Link href="/dashboard">
              <Button>Entrar</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-bold text-balance">
              Gestión Integral de Pacientes Hospitalarios
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Sistema completo para la administración de unidades de atención, registro de pacientes,
              historias clínicas digitales y notas de especialidades médicas
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Entrar al Sistema <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Funcionalidades Principales</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-card p-6 rounded-lg border">
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                    <Activity className="h-8 w-8" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">Gestión de Unidades</h4>
                <p className="text-muted-foreground">
                  Administra múltiples unidades: Urgencias, Observación, Hospitalización,
                  Intermedios y UCI con control de ocupación en tiempo real
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-accent/10 text-accent">
                    <Heart className="h-8 w-8" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">Historia Clínica Digital</h4>
                <p className="text-muted-foreground">
                  Registro completo de información médica, traslados entre unidades,
                  signos vitales y seguimiento de días de estancia
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                    <Shield className="h-8 w-8" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">Notas de Especialidades</h4>
                <p className="text-muted-foreground">
                  Médicos, enfermeras, terapeutas y especialistas pueden documentar
                  evoluciones, tratamientos y recomendaciones específicas
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h3 className="text-3xl font-bold">Especialidades Soportadas</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  'Medicina General',
                  'Enfermería',
                  'Terapia Física',
                  'Terapia Ocupacional',
                  'Terapia Respiratoria',
                  'Cardiología',
                  'Neurología',
                  'Cirugía',
                  'Pediatría',
                ].map((specialty) => (
                  <div
                    key={specialty}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Sistema Hospitalario. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
