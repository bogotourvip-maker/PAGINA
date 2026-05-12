-- Funciones útiles para el sistema hospitalario

-- Función para calcular edad del paciente
CREATE OR REPLACE FUNCTION public.calculate_patient_age(birth_date DATE)
RETURNS INTEGER
LANGUAGE sql
STABLE
AS $$
  SELECT EXTRACT(YEAR FROM age(birth_date))::INTEGER;
$$;

-- Función para actualizar el conteo de días en unit_stays
CREATE OR REPLACE FUNCTION public.update_unit_stay_days()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.exit_date IS NOT NULL AND NEW.entry_date IS NOT NULL THEN
    NEW.days_count := EXTRACT(DAY FROM (NEW.exit_date - NEW.entry_date))::INTEGER;
    NEW.status := 'completed';
  ELSE
    NEW.days_count := EXTRACT(DAY FROM (NOW() - NEW.entry_date))::INTEGER;
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

-- Trigger para actualizar días automáticamente
DROP TRIGGER IF EXISTS update_unit_stay_days_trigger ON public.unit_stays;

CREATE TRIGGER update_unit_stay_days_trigger
  BEFORE INSERT OR UPDATE ON public.unit_stays
  FOR EACH ROW
  EXECUTE FUNCTION public.update_unit_stay_days();

-- Función para actualizar camas disponibles cuando hay traslado
CREATE OR REPLACE FUNCTION public.update_available_beds()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Liberar cama de la unidad anterior
  IF NEW.from_unit_id IS NOT NULL THEN
    UPDATE public.hospital_units
    SET available_beds = available_beds + 1,
        updated_at = NOW()
    WHERE id = NEW.from_unit_id;
  END IF;
  
  -- Ocupar cama en la nueva unidad
  UPDATE public.hospital_units
  SET available_beds = available_beds - 1,
      updated_at = NOW()
  WHERE id = NEW.to_unit_id;
  
  RETURN NEW;
END;
$$;

-- Trigger para actualizar camas automáticamente
DROP TRIGGER IF EXISTS update_beds_on_transfer ON public.unit_transfers;

CREATE TRIGGER update_beds_on_transfer
  AFTER INSERT ON public.unit_transfers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_available_beds();

-- Función para cerrar estancia anterior y abrir nueva en traslado
CREATE OR REPLACE FUNCTION public.handle_unit_transfer()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Cerrar estancia actual
  UPDATE public.unit_stays
  SET exit_date = NEW.transfer_date,
      status = 'completed',
      updated_at = NOW()
  WHERE admission_id = NEW.admission_id
    AND status = 'active';
  
  -- Crear nueva estancia
  INSERT INTO public.unit_stays (admission_id, patient_id, unit_id, entry_date, bed_number, status)
  VALUES (NEW.admission_id, NEW.patient_id, NEW.to_unit_id, NEW.transfer_date, NEW.bed_number, 'active');
  
  RETURN NEW;
END;
$$;

-- Trigger para manejar traslados
DROP TRIGGER IF EXISTS handle_transfer_trigger ON public.unit_transfers;

CREATE TRIGGER handle_transfer_trigger
  AFTER INSERT ON public.unit_transfers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_unit_transfer();

-- Función para obtener pacientes activos por unidad
CREATE OR REPLACE FUNCTION public.get_active_patients_by_unit(unit_code TEXT)
RETURNS TABLE (
  patient_id UUID,
  patient_name TEXT,
  admission_id UUID,
  days_in_unit INTEGER,
  bed_number TEXT
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    p.id,
    p.first_name || ' ' || p.last_name,
    a.id,
    us.days_count,
    us.bed_number
  FROM public.patients p
  JOIN public.admissions a ON a.patient_id = p.id
  JOIN public.unit_stays us ON us.admission_id = a.id
  JOIN public.hospital_units hu ON hu.id = us.unit_id
  WHERE a.status = 'active'
    AND us.status = 'active'
    AND hu.code = unit_code
  ORDER BY us.entry_date DESC;
$$;
