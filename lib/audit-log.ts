// Sistema de Logs de Auditoría - Ley 1581 de 2012
// Registro inalterable de acciones para trazabilidad total

export type AuditAction = 
  | 'LOGIN'
  | 'LOGOUT'
  | 'VIEW_PATIENT'
  | 'CREATE_PATIENT'
  | 'UPDATE_PATIENT'
  | 'VIEW_MEDICAL_RECORD'
  | 'CREATE_MEDICAL_RECORD'
  | 'UPDATE_MEDICAL_RECORD'
  | 'DELETE_MEDICAL_RECORD'
  | 'VIEW_EVOLUTION'
  | 'CREATE_EVOLUTION'
  | 'TRANSFER_PATIENT'
  | 'DISCHARGE_PATIENT'
  | 'TRIAGE_EVALUATION'
  | 'HABEAS_DATA_CONSENT'
  | 'EXPORT_DATA'
  | 'PRINT_DOCUMENT'
  | 'ACCESS_DENIED'

export interface AuditLogEntry {
  id: string
  userId: string
  userName?: string
  userRole?: string
  action: AuditAction
  patientId?: string
  patientName?: string
  recordId?: string
  timestamp: string
  ipAddress: string
  userAgent?: string
  details: string
  previousValue?: string
  newValue?: string
  success: boolean
  errorMessage?: string
}

// Función para registrar una acción en el log de auditoría
export function logAuditAction(
  action: AuditAction,
  details: string,
  options?: {
    userId?: string
    userName?: string
    userRole?: string
    patientId?: string
    patientName?: string
    recordId?: string
    previousValue?: string
    newValue?: string
    success?: boolean
    errorMessage?: string
  }
): AuditLogEntry {
  const entry: AuditLogEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId: options?.userId || 'ANONYMOUS',
    userName: options?.userName,
    userRole: options?.userRole,
    action,
    patientId: options?.patientId,
    patientName: options?.patientName,
    recordId: options?.recordId,
    timestamp: new Date().toISOString(),
    ipAddress: typeof window !== 'undefined' ? 'CLIENT' : 'SERVER',
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    details,
    previousValue: options?.previousValue,
    newValue: options?.newValue,
    success: options?.success ?? true,
    errorMessage: options?.errorMessage,
  }

  // Guardar en localStorage (en producción sería en base de datos)
  if (typeof window !== 'undefined') {
    const logs = JSON.parse(localStorage.getItem('auditLog') || '[]')
    logs.unshift(entry) // Añadir al inicio para orden cronológico inverso
    
    // Mantener solo los últimos 10000 registros en localStorage
    if (logs.length > 10000) {
      logs.splice(10000)
    }
    
    localStorage.setItem('auditLog', JSON.stringify(logs))
  }

  return entry
}

// Obtener logs de auditoría con filtros
export function getAuditLogs(filters?: {
  userId?: string
  patientId?: string
  action?: AuditAction
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}): AuditLogEntry[] {
  if (typeof window === 'undefined') return []
  
  let logs: AuditLogEntry[] = JSON.parse(localStorage.getItem('auditLog') || '[]')
  
  if (filters) {
    if (filters.userId) {
      logs = logs.filter(log => log.userId === filters.userId)
    }
    if (filters.patientId) {
      logs = logs.filter(log => log.patientId === filters.patientId)
    }
    if (filters.action) {
      logs = logs.filter(log => log.action === filters.action)
    }
    if (filters.startDate) {
      logs = logs.filter(log => log.timestamp >= filters.startDate!)
    }
    if (filters.endDate) {
      logs = logs.filter(log => log.timestamp <= filters.endDate!)
    }
    
    const offset = filters.offset || 0
    const limit = filters.limit || 100
    logs = logs.slice(offset, offset + limit)
  }
  
  return logs
}

// Obtener logs por paciente (para historial de accesos a historia clínica)
export function getPatientAccessLogs(patientId: string): AuditLogEntry[] {
  return getAuditLogs({ patientId }).filter(log => 
    ['VIEW_PATIENT', 'VIEW_MEDICAL_RECORD', 'CREATE_MEDICAL_RECORD', 
     'UPDATE_MEDICAL_RECORD', 'VIEW_EVOLUTION', 'CREATE_EVOLUTION',
     'TRANSFER_PATIENT', 'DISCHARGE_PATIENT', 'PRINT_DOCUMENT', 'EXPORT_DATA'].includes(log.action)
  )
}

// Formatear acción para mostrar
export function formatAuditAction(action: AuditAction): string {
  const actionLabels: Record<AuditAction, string> = {
    LOGIN: 'Inicio de sesión',
    LOGOUT: 'Cierre de sesión',
    VIEW_PATIENT: 'Consulta de paciente',
    CREATE_PATIENT: 'Creación de paciente',
    UPDATE_PATIENT: 'Actualización de paciente',
    VIEW_MEDICAL_RECORD: 'Consulta de historia clínica',
    CREATE_MEDICAL_RECORD: 'Creación de registro médico',
    UPDATE_MEDICAL_RECORD: 'Actualización de registro médico',
    DELETE_MEDICAL_RECORD: 'Eliminación de registro médico',
    VIEW_EVOLUTION: 'Consulta de evolución',
    CREATE_EVOLUTION: 'Registro de evolución',
    TRANSFER_PATIENT: 'Traslado de paciente',
    DISCHARGE_PATIENT: 'Alta de paciente',
    TRIAGE_EVALUATION: 'Evaluación de triage',
    HABEAS_DATA_CONSENT: 'Firma de consentimiento Habeas Data',
    EXPORT_DATA: 'Exportación de datos',
    PRINT_DOCUMENT: 'Impresión de documento',
    ACCESS_DENIED: 'Acceso denegado',
  }
  return actionLabels[action] || action
}

// Obtener color para badge según acción
export function getAuditActionColor(action: AuditAction): string {
  const colors: Record<string, string> = {
    LOGIN: 'bg-blue-500',
    LOGOUT: 'bg-gray-500',
    VIEW_PATIENT: 'bg-slate-500',
    CREATE_PATIENT: 'bg-green-500',
    UPDATE_PATIENT: 'bg-yellow-500',
    VIEW_MEDICAL_RECORD: 'bg-slate-500',
    CREATE_MEDICAL_RECORD: 'bg-green-500',
    UPDATE_MEDICAL_RECORD: 'bg-yellow-500',
    DELETE_MEDICAL_RECORD: 'bg-red-500',
    VIEW_EVOLUTION: 'bg-slate-500',
    CREATE_EVOLUTION: 'bg-green-500',
    TRANSFER_PATIENT: 'bg-purple-500',
    DISCHARGE_PATIENT: 'bg-indigo-500',
    TRIAGE_EVALUATION: 'bg-orange-500',
    HABEAS_DATA_CONSENT: 'bg-emerald-500',
    EXPORT_DATA: 'bg-cyan-500',
    PRINT_DOCUMENT: 'bg-teal-500',
    ACCESS_DENIED: 'bg-red-600',
  }
  return colors[action] || 'bg-gray-500'
}
