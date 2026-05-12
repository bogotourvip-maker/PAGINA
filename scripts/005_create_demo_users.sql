-- Script para crear usuarios de demostración
-- NOTA: Estos usuarios deben registrarse primero usando la página de registro
-- Este script solo prepara perfiles de ejemplo una vez que los usuarios se registren

-- Insertar datos de ejemplo para unidades hospitalarias
INSERT INTO hospital_units (name, unit_type, total_beds, available_beds, description) VALUES
('Urgencias Principal', 'urgencias', 20, 15, 'Unidad de urgencias para atención de emergencias'),
('Observación General', 'observacion', 15, 10, 'Sala de observación para pacientes en evaluación'),
('Hospitalización Piso 1', 'hospitalizacion', 30, 20, 'Hospitalización general piso 1'),
('Hospitalización Piso 2', 'hospitalizacion', 30, 25, 'Hospitalización general piso 2'),
('Unidad de Intermedios', 'intermedios', 12, 8, 'Cuidados intermedios para pacientes que requieren monitoreo'),
('UCI Adultos', 'uci', 10, 6, 'Unidad de cuidados intensivos para pacientes críticos')
ON CONFLICT (name) DO NOTHING;

-- Nota: Los usuarios deben crearse a través del sistema de autenticación
COMMENT ON TABLE user_profiles IS 'Los usuarios deben registrarse en /auth/sign-up con los siguientes datos de ejemplo:
  Admin: admin@hospital.com / contraseña: Admin123! / rol: admin
  Médico: medico@hospital.com / contraseña: Medico123! / rol: medico
  Enfermera: enfermera@hospital.com / contraseña: Enfermera123! / rol: enfermera';
