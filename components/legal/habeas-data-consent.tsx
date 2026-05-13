'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { FileText, Shield, Clock, Download, CheckCircle } from 'lucide-react'

interface HabeasDataConsentProps {
  patientName: string
  patientDocument: string
  onConsent: (consentData: ConsentData) => void
  onCancel: () => void
}

interface ConsentData {
  patientName: string
  patientDocument: string
  consentDate: string
  ipAddress: string
  acceptedTerms: boolean
  acceptedDataProcessing: boolean
  acceptedDataSharing: boolean
  signature: string
}

export function HabeasDataConsent({ patientName, patientDocument, onConsent, onCancel }: HabeasDataConsentProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedDataProcessing, setAcceptedDataProcessing] = useState(false)
  const [acceptedDataSharing, setAcceptedDataSharing] = useState(false)
  const [signature, setSignature] = useState('')
  const [showFullText, setShowFullText] = useState(false)

  const canSubmit = acceptedTerms && acceptedDataProcessing && signature.length > 3

  const handleSubmit = () => {
    const consentData: ConsentData = {
      patientName,
      patientDocument,
      consentDate: new Date().toISOString(),
      ipAddress: 'Registrada por el sistema',
      acceptedTerms,
      acceptedDataProcessing,
      acceptedDataSharing,
      signature,
    }
    
    // Guardar consentimiento en localStorage
    const consents = JSON.parse(localStorage.getItem('habeasDataConsents') || '[]')
    consents.push(consentData)
    localStorage.setItem('habeasDataConsents', JSON.stringify(consents))
    
    // Registrar en log de auditoría
    const auditLog = JSON.parse(localStorage.getItem('auditLog') || '[]')
    auditLog.unshift({
      id: 'audit-' + Date.now(),
      userId: 'SYSTEM',
      action: 'HABEAS_DATA_CONSENT',
      patientId: patientDocument,
      patientName,
      timestamp: new Date().toISOString(),
      details: 'Consentimiento de tratamiento de datos personales firmado',
      ipAddress: 'Sistema interno'
    })
    localStorage.setItem('auditLog', JSON.stringify(auditLog))
    
    onConsent(consentData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Autorización de Tratamiento de Datos Personales</CardTitle>
        </div>
        <CardDescription>
          Ley 1581 de 2012 y Decreto 1377 de 2013 - Habeas Data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Información del paciente */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="font-medium">{patientName}</p>
            <p className="text-sm text-muted-foreground">Documento: {patientDocument}</p>
          </div>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            {new Date().toLocaleDateString('es-CO')}
          </Badge>
        </div>

        {/* Texto del consentimiento */}
        <ScrollArea className="h-64 rounded-md border p-4">
          <div className="space-y-4 text-sm">
            <h4 className="font-semibold">AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES</h4>
            
            <p>
              En cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas concordantes, 
              autorizo expresamente a la institución prestadora de servicios de salud para que realice 
              el tratamiento de mis datos personales, incluyendo datos sensibles relacionados con mi 
              estado de salud.
            </p>

            <h5 className="font-semibold mt-4">1. FINALIDAD DEL TRATAMIENTO</h5>
            <p>Los datos serán utilizados para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prestación de servicios de salud y atención médica</li>
              <li>Elaboración y custodia de la historia clínica</li>
              <li>Facturación y cobro de servicios médicos</li>
              <li>Reportes obligatorios a entidades de control (MinSalud, Supersalud)</li>
              <li>Fines estadísticos y de investigación científica (de forma anónima)</li>
              <li>Contacto para citas, seguimiento y recordatorios</li>
            </ul>

            <h5 className="font-semibold mt-4">2. DERECHOS DEL TITULAR</h5>
            <p>Como titular de los datos, tengo derecho a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Conocer, actualizar y rectificar mis datos personales</li>
              <li>Solicitar prueba de la autorización otorgada</li>
              <li>Ser informado sobre el uso de mis datos</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
              <li>Revocar la autorización y/o solicitar la supresión del dato</li>
              <li>Acceder gratuitamente a mis datos personales</li>
            </ul>

            <h5 className="font-semibold mt-4">3. DATOS SENSIBLES</h5>
            <p>
              Autorizo el tratamiento de mis datos sensibles relacionados con mi estado de salud, 
              entendiendo que estos son necesarios para la correcta prestación del servicio médico. 
              La institución garantiza que estos datos serán tratados con las medidas de seguridad 
              técnicas y administrativas necesarias para su protección.
            </p>

            <h5 className="font-semibold mt-4">4. TRANSFERENCIA DE DATOS</h5>
            <p>
              Autorizo la transferencia de mis datos a terceros cuando sea necesario para:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Entidades aseguradoras (EPS, medicina prepagada)</li>
              <li>Laboratorios y centros diagnósticos</li>
              <li>Entidades gubernamentales según lo requiera la ley</li>
              <li>Profesionales de la salud interconsultados</li>
            </ul>

            <h5 className="font-semibold mt-4">5. VIGENCIA</h5>
            <p>
              Esta autorización permanecerá vigente durante el tiempo que dure la relación 
              contractual con la institución y durante el período de conservación de la historia 
              clínica según la normatividad vigente (mínimo 15 años según Resolución 1995 de 1999).
            </p>

            <h5 className="font-semibold mt-4">6. SEGURIDAD DE LA INFORMACIÓN</h5>
            <p>
              La institución implementa medidas de seguridad técnicas y organizativas para proteger 
              sus datos personales contra acceso no autorizado, pérdida o destrucción, incluyendo:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256)</li>
              <li>Control de acceso basado en roles</li>
              <li>Registro de auditoría de todas las acciones</li>
              <li>Autenticación de doble factor para personal autorizado</li>
            </ul>
          </div>
        </ScrollArea>

        <Button 
          variant="link" 
          className="p-0 h-auto text-sm"
          onClick={() => setShowFullText(true)}
        >
          <FileText className="h-4 w-4 mr-1" />
          Ver documento completo
        </Button>

        {/* Checkboxes de aceptación */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="terms" 
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              He leído y entendido los términos de esta autorización, y acepto voluntariamente 
              el tratamiento de mis datos personales conforme a lo establecido. <span className="text-red-500">*</span>
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="processing" 
              checked={acceptedDataProcessing}
              onCheckedChange={(checked) => setAcceptedDataProcessing(checked as boolean)}
            />
            <Label htmlFor="processing" className="text-sm leading-relaxed cursor-pointer">
              Autorizo el tratamiento de mis datos sensibles de salud para la prestación 
              de servicios médicos. <span className="text-red-500">*</span>
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="sharing" 
              checked={acceptedDataSharing}
              onCheckedChange={(checked) => setAcceptedDataSharing(checked as boolean)}
            />
            <Label htmlFor="sharing" className="text-sm leading-relaxed cursor-pointer">
              Autorizo la transferencia de mis datos a terceros (EPS, laboratorios, entidades 
              de control) cuando sea necesario para la atención médica. (Opcional)
            </Label>
          </div>
        </div>

        {/* Firma digital */}
        <div className="space-y-2">
          <Label htmlFor="signature">
            Firma Digital (escriba su nombre completo) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="signature"
            placeholder="Escriba su nombre completo como firma"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="font-serif italic"
          />
          <p className="text-xs text-muted-foreground">
            Al escribir su nombre, usted está firmando electrónicamente este documento 
            de acuerdo con la Ley 527 de 1999.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Firmar y Aceptar
        </Button>
      </CardFooter>

      {/* Dialog con texto completo */}
      <Dialog open={showFullText} onOpenChange={setShowFullText}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Política de Tratamiento de Datos Personales</DialogTitle>
            <DialogDescription>Documento completo según Ley 1581 de 2012</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm">
              <p>
                [Documento completo de política de privacidad y tratamiento de datos 
                personales según la normatividad colombiana...]
              </p>
              {/* Contenido extenso del documento */}
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowFullText(false)}>
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

// Componente para mostrar el estado del consentimiento
export function ConsentStatus({ patientDocument }: { patientDocument: string }) {
  const [hasConsent, setHasConsent] = useState(false)
  const [consentDate, setConsentDate] = useState<string | null>(null)

  useState(() => {
    const consents = JSON.parse(localStorage.getItem('habeasDataConsents') || '[]')
    const patientConsent = consents.find((c: ConsentData) => c.patientDocument === patientDocument)
    if (patientConsent) {
      setHasConsent(true)
      setConsentDate(patientConsent.consentDate)
    }
  })

  if (!hasConsent) {
    return (
      <Badge variant="destructive" className="gap-1">
        <Shield className="h-3 w-3" />
        Sin consentimiento
      </Badge>
    )
  }

  return (
    <Badge variant="default" className="gap-1 bg-green-600">
      <CheckCircle className="h-3 w-3" />
      Consentimiento firmado
      {consentDate && (
        <span className="ml-1 text-xs opacity-80">
          ({new Date(consentDate).toLocaleDateString('es-CO')})
        </span>
      )}
    </Badge>
  )
}
