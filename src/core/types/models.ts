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

interface LocationValue {
  lat: number
  lng: number
  address?: string
}

interface Event {
  id: number
  title: string
  desription: string
  duration: number
  location: string
  format: string
  starting_time: number
  meeting_link: string
  likes: number
  bought: number
  tags: string[]
  album: string[]
  tickets: unknown[]
}

interface EventSettings {
  is_gathering: boolean
  is_announced: boolean
}

interface Ticket {
  id: number
  event_id: number,
  title: string,
  description: string,
  price: number,
  amount: number,
  stock: number
}

export type { BaseUser, HealthStatus, PublicUser, ResetSession, AdminUser, UserPrivacy, LocationValue, Event, EventSettings, Ticket }
