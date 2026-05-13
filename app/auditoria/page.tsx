'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Shield, 
  Search, 
  Download, 
  Filter,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { 
  getAuditLogs, 
  formatAuditAction, 
  getAuditActionColor,
  type AuditLogEntry,
  type AuditAction 
} from '@/lib/audit-log'
import { ADMIN_USER } from '@/lib/mock-user'

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Cargar logs al montar
  useEffect(() => {
    loadLogs()
  }, [])

  // Filtrar logs cuando cambien los filtros
  useEffect(() => {
    filterLogs()
  }, [logs, searchTerm, actionFilter, dateFrom, dateTo])

  const loadLogs = () => {
    setIsLoading(true)
    const allLogs = getAuditLogs({ limit: 1000 })
    setLogs(allLogs)
    setIsLoading(false)
  }

  const filterLogs = () => {
    let filtered = [...logs]

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(log => 
        log.patientName?.toLowerCase().includes(term) ||
        log.patientId?.toLowerCase().includes(term) ||
        log.userName?.toLowerCase().includes(term) ||
        log.details.toLowerCase().includes(term)
      )
    }

    // Filtrar por acción
    if (actionFilter && actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter)
    }

    // Filtrar por fecha desde
    if (dateFrom) {
      filtered = filtered.filter(log => log.timestamp >= dateFrom)
    }

    // Filtrar por fecha hasta
    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter(log => log.timestamp <= toDate.toISOString())
    }

    setFilteredLogs(filtered)
  }

  const exportLogs = () => {
    const csvContent = [
      ['ID', 'Fecha/Hora', 'Usuario', 'Acción', 'Paciente', 'Detalles', 'IP', 'Estado'].join(','),
      ...filteredLogs.map(log => [
        log.id,
        new Date(log.timestamp).toLocaleString('es-CO'),
        log.userName || log.userId,
        formatAuditAction(log.action),
        log.patientName || log.patientId || '-',
        `"${log.details.replace(/"/g, '""')}"`,
        log.ipAddress,
        log.success ? 'Exitoso' : 'Fallido'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `auditoria_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Estadísticas rápidas
  const stats = {
    total: logs.length,
    today: logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length,
    failed: logs.filter(l => !l.success).length,
    patients: new Set(logs.filter(l => l.patientId).map(l => l.patientId)).size
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Log de Auditoría</h1>
              <p className="text-muted-foreground">
                Trazabilidad completa según Ley 1581 de 2012
              </p>
            </div>
          </div>
          <Button onClick={exportLogs} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Registros</CardDescription>
              <CardTitle className="text-2xl">{stats.total.toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Hoy</CardDescription>
              <CardTitle className="text-2xl text-blue-600">{stats.today}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Accesos Fallidos</CardDescription>
              <CardTitle className="text-2xl text-red-600">{stats.failed}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pacientes Accedidos</CardDescription>
              <CardTitle className="text-2xl text-green-600">{stats.patients}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Paciente, usuario, detalle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Acción</Label>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las acciones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las acciones</SelectItem>
                    <SelectItem value="LOGIN">Inicio de sesión</SelectItem>
                    <SelectItem value="VIEW_PATIENT">Consulta paciente</SelectItem>
                    <SelectItem value="CREATE_PATIENT">Creación paciente</SelectItem>
                    <SelectItem value="VIEW_MEDICAL_RECORD">Consulta historia</SelectItem>
                    <SelectItem value="CREATE_MEDICAL_RECORD">Registro médico</SelectItem>
                    <SelectItem value="CREATE_EVOLUTION">Evolución</SelectItem>
                    <SelectItem value="TRANSFER_PATIENT">Traslado</SelectItem>
                    <SelectItem value="DISCHARGE_PATIENT">Alta</SelectItem>
                    <SelectItem value="TRIAGE_EVALUATION">Triage</SelectItem>
                    <SelectItem value="HABEAS_DATA_CONSENT">Consentimiento</SelectItem>
                    <SelectItem value="EXPORT_DATA">Exportación</SelectItem>
                    <SelectItem value="ACCESS_DENIED">Acceso denegado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fecha desde</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Fecha hasta</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredLogs.length} de {logs.length} registros
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchTerm('')
                  setActionFilter('all')
                  setDateFrom('')
                  setDateTo('')
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de logs */}
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead className="w-[180px]">Fecha/Hora</TableHead>
                    <TableHead className="w-[150px]">Usuario</TableHead>
                    <TableHead className="w-[150px]">Acción</TableHead>
                    <TableHead className="w-[150px]">Paciente</TableHead>
                    <TableHead>Detalles</TableHead>
                    <TableHead className="w-[80px]">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <FileText className="h-8 w-8" />
                          <p>No hay registros de auditoría</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {new Date(log.timestamp).toLocaleString('es-CO', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{log.userName || log.userId}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getAuditActionColor(log.action)} text-white text-xs`}>
                            {formatAuditAction(log.action)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {log.patientName ? (
                            <div className="text-sm">
                              <p className="font-medium">{log.patientName}</p>
                              <p className="text-xs text-muted-foreground">{log.patientId}</p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <p className="text-sm truncate" title={log.details}>
                            {log.details}
                          </p>
                        </TableCell>
                        <TableCell>
                          {log.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Nota legal */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Aviso Legal - Ley 1581 de 2012</p>
              <p className="text-muted-foreground mt-1">
                Este registro de auditoría cumple con los requisitos de trazabilidad establecidos en la 
                normatividad colombiana de protección de datos personales. Los registros son inalterables 
                y se conservan por el tiempo establecido en la ley. El acceso no autorizado a este sistema 
                está penalizado por la ley colombiana.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
