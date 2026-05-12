-- Modificar políticas RLS para permitir acceso sin confirmación de email en desarrollo
-- Esto es solo para desarrollo, en producción debes requerir confirmación

-- Actualizar políticas de profiles para permitir selección sin confirmación
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Actualizar políticas de otras tablas para permitir acceso sin confirmación
DROP POLICY IF EXISTS "patients_select_all" ON public.patients;
CREATE POLICY "patients_select_all" ON public.patients 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "patients_insert_all" ON public.patients;
CREATE POLICY "patients_insert_all" ON public.patients 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "patients_update_all" ON public.patients;
CREATE POLICY "patients_update_all" ON public.patients 
  FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "patients_delete_all" ON public.patients;
CREATE POLICY "patients_delete_all" ON public.patients 
  FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- Aplicar el mismo patrón a todas las tablas importantes
DROP POLICY IF EXISTS "hospital_units_select_all" ON public.hospital_units;
CREATE POLICY "hospital_units_select_all" ON public.hospital_units 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "unit_transfers_select_all" ON public.unit_transfers;
CREATE POLICY "unit_transfers_select_all" ON public.unit_transfers 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "unit_transfers_insert_all" ON public.unit_transfers;
CREATE POLICY "unit_transfers_insert_all" ON public.unit_transfers 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "medical_records_select_all" ON public.medical_records;
CREATE POLICY "medical_records_select_all" ON public.medical_records 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "medical_records_insert_all" ON public.medical_records;
CREATE POLICY "medical_records_insert_all" ON public.medical_records 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "specialty_notes_select_all" ON public.specialty_notes;
CREATE POLICY "specialty_notes_select_all" ON public.specialty_notes 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "specialty_notes_insert_all" ON public.specialty_notes;
CREATE POLICY "specialty_notes_insert_all" ON public.specialty_notes 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);
