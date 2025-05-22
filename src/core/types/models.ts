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

export type { PublicUser }