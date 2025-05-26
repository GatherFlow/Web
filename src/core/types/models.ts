type Language = 'en' | 'uk'
type Role = 'user' | 'admin' | 'supervisor'

interface PublicUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  isVerified: boolean
  dateOfBirth: Date | null
  avatar: string
  language: Language
}

interface ResetSession {
  id: string,
  email: string
  code: string
  isEmailVerified: boolean
  expiresAt: Date
}

interface HealthStatus {
  uptime: number
  message: string
  date: string
}

export type { PublicUser, ResetSession, HealthStatus }