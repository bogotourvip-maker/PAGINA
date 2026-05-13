'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ADMIN_USER } from '@/lib/mock-user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  Shield, 
  Bell, 
  Database, 
  Save,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface HospitalConfig {
  name: string
  nit: string
  address: string
  city: string
  phone: string
  email: string
  legalRepresentative: string
  habilitationCode: string
}

interface SecurityConfig {
  sessionTimeout: number
  requireMFA: boolean
  passwordMinLength: number
  auditRetentionDays: number
  autoLogout: boolean
}

interface NotificationConfig {
  emailNotifications: boolean
  criticalAlerts: boolean
  dailyReport: boolean
  occupancyAlerts: boolean
  occupancyThreshold: number
}

export default function ConfiguracionPage() {
  const [saved, setSaved] = useState(false)
  
  const [hospitalConfig, setHospitalConfig] = useState<HospitalConfig>({
    name: 'Hospital San José',
    nit: '900.123.456-7',
    address: 'Calle 123 # 45-67',
    city: 'Bogotá D.C.',
    phone: '(601) 123-4567',
    email: 'info@hospitalsanjose.com',
    legalRepresentative: 'Dr. Carlos Pérez',
    habilitationCode: 'H-12345678'
  })

  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    sessionTimeout: 30,
    requireMFA: false,
    passwordMinLength: 8,
    auditRetentionDays: 365,
    autoLogout: true
  })

  const [notificationConfig, setNotificationConfig] = useState<NotificationConfig>({
    emailNotifications: true,
    criticalAlerts: true,
    dailyReport: false,
    occupancyAlerts: true,
    occupancyThreshold: 85
  })

  useEffect(() => {
    // Cargar configuración de localStorage
    const savedHospital = localStorage.getItem('hospitalConfig')
    const savedSecurity = localStorage.getItem('securityConfig')
    const savedNotifications = localStorage.getItem('notificationConfig')

    if (savedHospital) setHospitalConfig(JSON.parse(savedHospital))
    if (savedSecurity) setSecurityConfig(JSON.parse(savedSecurity))
    if (savedNotifications) setNotificationConfig(JSON.parse(savedNotifications))
  }, [])

  const handleSave = () => {
    localStorage.setItem('hospitalConfig', JSON.stringify(hospitalConfig))
    localStorage.setItem('securityConfig', JSON.stringify(securityConfig))
    localStorage.setItem('notificationConfig', JSON.stringify(notificationConfig))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
              <p className="text-muted-foreground">Administra la configuración general del hospital</p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? 'Guardado' : 'Guardar Cambios'}
          </Button>
        </div>

        <Tabs defaultValue="hospital" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="hospital" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Hospital</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alertas</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Datos</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Hospital */}
          <TabsContent value="hospital">
            <Card>
              <CardHeader>
                <CardTitle>Información del Hospital</CardTitle>
                <CardDescription>
                  Datos generales de la institución prestadora de servicios de salud
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Nombre del Hospital *</Label>
                    <Input
                      id="hospitalName"
                      value={hospitalConfig.name}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nit">NIT *</Label>
                    <Input
                      id="nit"
                      value={hospitalConfig.nit}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, nit: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="habilitationCode">Código de Habilitación *</Label>
                    <Input
                      id="habilitationCode"
                      value={hospitalConfig.habilitationCode}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, habilitationCode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legalRep">Representante Legal *</Label>
                    <Input
                      id="legalRep"
                      value={hospitalConfig.legalRepresentative}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, legalRepresentative: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      value={hospitalConfig.address}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      value={hospitalConfig.city}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={hospitalConfig.phone}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={hospitalConfig.email}
                      onChange={(e) => setHospitalConfig(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Seguridad */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>
                  Políticas de seguridad y protección de datos según Ley 1581/2012
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min={5}
                      max={120}
                      value={securityConfig.sessionTimeout}
                      onChange={(e) => setSecurityConfig(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    />
                    <p className="text-xs text-muted-foreground">Tiempo de inactividad antes de cerrar sesión</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordLength">Longitud Mínima de Contraseña</Label>
                    <Input
                      id="passwordLength"
                      type="number"
                      min={6}
                      max={32}
                      value={securityConfig.passwordMinLength}
                      onChange={(e) => setSecurityConfig(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auditRetention">Retención de Auditoría (días)</Label>
                    <Input
                      id="auditRetention"
                      type="number"
                      min={30}
                      max={3650}
                      value={securityConfig.auditRetentionDays}
                      onChange={(e) => setSecurityConfig(prev => ({ ...prev, auditRetentionDays: parseInt(e.target.value) }))}
                    />
                    <p className="text-xs text-muted-foreground">Mínimo recomendado: 365 días</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Autenticación de Dos Factores (MFA)</Label>
                      <p className="text-sm text-muted-foreground">Requerir verificación adicional al iniciar sesión</p>
                    </div>
                    <Switch
                      checked={securityConfig.requireMFA}
                      onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, requireMFA: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cierre Automático de Sesión</Label>
                      <p className="text-sm text-muted-foreground">Cerrar sesión automáticamente por inactividad</p>
                    </div>
                    <Switch
                      checked={securityConfig.autoLogout}
                      onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, autoLogout: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Notificaciones */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Alertas y Notificaciones</CardTitle>
                <CardDescription>
                  Configura las alertas del sistema y reportes automáticos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificaciones por Email</Label>
                      <p className="text-sm text-muted-foreground">Recibir alertas por correo electrónico</p>
                    </div>
                    <Switch
                      checked={notificationConfig.emailNotifications}
                      onCheckedChange={(checked) => setNotificationConfig(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertas Críticas</Label>
                      <p className="text-sm text-muted-foreground">Alertas de pacientes en estado crítico</p>
                    </div>
                    <Switch
                      checked={notificationConfig.criticalAlerts}
                      onCheckedChange={(checked) => setNotificationConfig(prev => ({ ...prev, criticalAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Reporte Diario</Label>
                      <p className="text-sm text-muted-foreground">Enviar resumen diario de actividades</p>
                    </div>
                    <Switch
                      checked={notificationConfig.dailyReport}
                      onCheckedChange={(checked) => setNotificationConfig(prev => ({ ...prev, dailyReport: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertas de Ocupación</Label>
                      <p className="text-sm text-muted-foreground">Alertar cuando la ocupación supere el umbral</p>
                    </div>
                    <Switch
                      checked={notificationConfig.occupancyAlerts}
                      onCheckedChange={(checked) => setNotificationConfig(prev => ({ ...prev, occupancyAlerts: checked }))}
                    />
                  </div>
                </div>

                {notificationConfig.occupancyAlerts && (
                  <div className="pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="threshold">Umbral de Ocupación (%)</Label>
                      <Input
                        id="threshold"
                        type="number"
                        min={50}
                        max={100}
                        value={notificationConfig.occupancyThreshold}
                        onChange={(e) => setNotificationConfig(prev => ({ ...prev, occupancyThreshold: parseInt(e.target.value) }))}
                      />
                      <p className="text-xs text-muted-foreground">Alertar cuando la ocupación supere este porcentaje</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Datos */}
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Datos</CardTitle>
                <CardDescription>
                  Herramientas de exportación y portabilidad según Art. 8 Ley 1581/2012
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/configuracion/exportar">
                    <Card className="cursor-pointer hover:bg-accent transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Database className="h-5 w-5" />
                          Exportar Datos
                        </CardTitle>
                        <CardDescription>
                          Exportar datos del sistema en formato JSON o CSV
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/auditoria">
                    <Card className="cursor-pointer hover:bg-accent transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Log de Auditoría
                        </CardTitle>
                        <CardDescription>
                          Ver registro de todas las acciones del sistema
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Información de Almacenamiento</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Los datos se almacenan de forma segura cumpliendo con:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Ley 1581 de 2012 (Protección de Datos Personales)</li>
                      <li>Decreto 1377 de 2013 (Reglamentario)</li>
                      <li>Resolución 1995 de 1999 (Historia Clínica)</li>
                      <li>Resolución 839 de 2017 (Interoperabilidad)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
