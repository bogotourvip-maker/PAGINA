-- Confirmar todos los emails existentes y deshabilitar confirmación para desarrollo
-- Esto permite que los usuarios puedan iniciar sesión sin confirmar email

-- Confirmar emails de todos los usuarios existentes
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Actualizar la configuración para auto-confirmar nuevos usuarios
-- Nota: Esto se aplica a nivel de SQL, pero la configuración principal está en el dashboard de Supabase
