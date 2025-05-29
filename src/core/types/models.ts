type Language = 'en' | 'uk'
type Role = 'user' | 'admin' | 'supervisor'
type UserType = 'internal' | 'external'

interface BaseUser {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  bio?: string
  role: Role
  isVerified: boolean
  avatar: string
}

interface PublicUser extends BaseUser {
  dateOfBirth: Date | null
  language: Language
}

interface AdminUser extends BaseUser {
  type: UserType
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

interface UserPrivacy {
  isPrivate: boolean
  hideOwned: boolean
  hidePurchased: boolean
  hideAppreciated: boolean
}

export type { BaseUser, HealthStatus, PublicUser, ResetSession, AdminUser, UserPrivacy }
