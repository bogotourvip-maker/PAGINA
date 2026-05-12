// Usuario administrador para desarrollo (sin autenticación)
export const ADMIN_USER = {
  id: 'admin-dev-001',
  email: 'admin@hospital.com',
  user_metadata: {
    full_name: 'Administrador Sistema',
    role: 'admin',
    license_number: 'ADMIN-001',
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
}

export function getMockUser() {
  return ADMIN_USER
}
