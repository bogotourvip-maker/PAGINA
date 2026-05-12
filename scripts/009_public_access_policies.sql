-- Políticas de acceso público para desarrollo (sin autenticación)
-- Esto permite que el sistema funcione sin usuarios autenticados

-- Hospital Units - Permitir lectura y escritura pública
DROP POLICY IF EXISTS "hospital_units_select_all" ON public.hospital_units;
DROP POLICY IF EXISTS "hospital_units_update_all" ON public.hospital_units;
CREATE POLICY "hospital_units_select_all" ON public.hospital_units FOR SELECT USING (true);
CREATE POLICY "hospital_units_update_all" ON public.hospital_units FOR UPDATE USING (true);

-- Patients - Permitir todas las operaciones
DROP POLICY IF EXISTS "patients_select_all" ON public.patients;
DROP POLICY IF EXISTS "patients_insert_all" ON public.patients;
DROP POLICY IF EXISTS "patients_update_all" ON public.patients;
DROP POLICY IF EXISTS "patients_delete_all" ON public.patients;
CREATE POLICY "patients_select_all" ON public.patients FOR SELECT USING (true);
CREATE POLICY "patients_insert_all" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "patients_update_all" ON public.patients FOR UPDATE USING (true);
CREATE POLICY "patients_delete_all" ON public.patients FOR DELETE USING (true);

-- Admissions - Permitir todas las operaciones
DROP POLICY IF EXISTS "admissions_select_all" ON public.admissions;
DROP POLICY IF EXISTS "admissions_insert_all" ON public.admissions;
DROP POLICY IF EXISTS "admissions_update_all" ON public.admissions;
CREATE POLICY "admissions_select_all" ON public.admissions FOR SELECT USING (true);
CREATE POLICY "admissions_insert_all" ON public.admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "admissions_update_all" ON public.admissions FOR UPDATE USING (true);

-- Unit Stays - Permitir todas las operaciones
DROP POLICY IF EXISTS "unit_stays_select_all" ON public.unit_stays;
DROP POLICY IF EXISTS "unit_stays_insert_all" ON public.unit_stays;
DROP POLICY IF EXISTS "unit_stays_update_all" ON public.unit_stays;
CREATE POLICY "unit_stays_select_all" ON public.unit_stays FOR SELECT USING (true);
CREATE POLICY "unit_stays_insert_all" ON public.unit_stays FOR INSERT WITH CHECK (true);
CREATE POLICY "unit_stays_update_all" ON public.unit_stays FOR UPDATE USING (true);

-- Unit Transfers - Permitir todas las operaciones
DROP POLICY IF EXISTS "unit_transfers_select_all" ON public.unit_transfers;
DROP POLICY IF EXISTS "unit_transfers_insert_all" ON public.unit_transfers;
CREATE POLICY "unit_transfers_select_all" ON public.unit_transfers FOR SELECT USING (true);
CREATE POLICY "unit_transfers_insert_all" ON public.unit_transfers FOR INSERT WITH CHECK (true);

-- Medical Records - Permitir todas las operaciones
DROP POLICY IF EXISTS "medical_records_select_all" ON public.medical_records;
DROP POLICY IF EXISTS "medical_records_insert_all" ON public.medical_records;
DROP POLICY IF EXISTS "medical_records_update_all" ON public.medical_records;
CREATE POLICY "medical_records_select_all" ON public.medical_records FOR SELECT USING (true);
CREATE POLICY "medical_records_insert_all" ON public.medical_records FOR INSERT WITH CHECK (true);
CREATE POLICY "medical_records_update_all" ON public.medical_records FOR UPDATE USING (true);

-- Specialty Notes - Permitir todas las operaciones
DROP POLICY IF EXISTS "specialty_notes_select_all" ON public.specialty_notes;
DROP POLICY IF EXISTS "specialty_notes_insert_all" ON public.specialty_notes;
DROP POLICY IF EXISTS "specialty_notes_update_all" ON public.specialty_notes;
CREATE POLICY "specialty_notes_select_all" ON public.specialty_notes FOR SELECT USING (true);
CREATE POLICY "specialty_notes_insert_all" ON public.specialty_notes FOR INSERT WITH CHECK (true);
CREATE POLICY "specialty_notes_update_all" ON public.specialty_notes FOR UPDATE USING (true);

-- Vital Signs - Permitir todas las operaciones
DROP POLICY IF EXISTS "vital_signs_select_all" ON public.vital_signs;
DROP POLICY IF EXISTS "vital_signs_insert_all" ON public.vital_signs;
CREATE POLICY "vital_signs_select_all" ON public.vital_signs FOR SELECT USING (true);
CREATE POLICY "vital_signs_insert_all" ON public.vital_signs FOR INSERT WITH CHECK (true);

-- Profiles - Permitir todas las operaciones
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_all" ON public.profiles;
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_all" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "profiles_update_all" ON public.profiles FOR UPDATE USING (true);
