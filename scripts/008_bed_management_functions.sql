-- Funciones para gestión de camas

-- Función para decrementar camas disponibles
CREATE OR REPLACE FUNCTION decrement_available_beds(unit_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE hospital_units 
  SET available_beds = GREATEST(available_beds - 1, 0),
      updated_at = NOW()
  WHERE id = unit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para incrementar camas disponibles
CREATE OR REPLACE FUNCTION increment_available_beds(unit_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE hospital_units 
  SET available_beds = LEAST(available_beds + 1, total_beds),
      updated_at = NOW()
  WHERE id = unit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para calcular días de estancia
CREATE OR REPLACE FUNCTION update_stay_days()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.exit_date IS NOT NULL THEN
    NEW.days_count = EXTRACT(DAY FROM (NEW.exit_date - NEW.entry_date)) + 1;
  ELSE
    NEW.days_count = EXTRACT(DAY FROM (NOW() - NEW.entry_date)) + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar días automáticamente
DROP TRIGGER IF EXISTS trigger_update_stay_days ON unit_stays;
CREATE TRIGGER trigger_update_stay_days
  BEFORE INSERT OR UPDATE ON unit_stays
  FOR EACH ROW
  EXECUTE FUNCTION update_stay_days();
