-- Agregar campos de triage a la tabla admissions
ALTER TABLE admissions 
ADD COLUMN IF NOT EXISTS triage_level smallint CHECK (triage_level >= 1 AND triage_level <= 5),
ADD COLUMN IF NOT EXISTS triage_notes text,
ADD COLUMN IF NOT EXISTS triage_date timestamptz;

-- Actualizar el check constraint de status para incluir nuevos estados
ALTER TABLE admissions DROP CONSTRAINT IF EXISTS admissions_status_check;
ALTER TABLE admissions ADD CONSTRAINT admissions_status_check 
CHECK (status IN ('triage', 'consulta_externa', 'active', 'discharged', 'transferred'));

-- Comentarios para documentación
COMMENT ON COLUMN admissions.triage_level IS 'Nivel de triage ESI (1-5): 1=Resucitación, 2=Emergencia, 3=Urgencia, 4=Menos urgente, 5=No urgente';
COMMENT ON COLUMN admissions.triage_notes IS 'Notas de la evaluación de triage';
COMMENT ON COLUMN admissions.triage_date IS 'Fecha y hora de la evaluación de triage';
