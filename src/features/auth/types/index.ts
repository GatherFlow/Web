import type { Maybe, PublicUser, ResetSession } from "@/core/types"

interface AuthState {
  user: Maybe<PublicUser>
  isAuthorized: boolean
  isAdmin: boolean
}

interface AuthActions {
  reset: () => void
  setUser: (user: AuthState['user']) => void
  setVerified: () => void
}

export type AuthContext = AuthState & AuthActions

interface ResetSessionState {
  session: Maybe<ResetSession>
}

interface ResetSessionActions {
  reset: () => void
  setSession: (session: ResetSessionState['session']) => void
  setVerified: () => void
}

export type ResetSessionContext = ResetSessionState & ResetSessionActions
