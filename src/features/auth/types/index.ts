import type { Maybe, PublicUser } from "@/core/types"

interface State {
  user: Maybe<PublicUser>
  isAuthorized: boolean
  isAdmin: boolean
}

interface Actions {
  reset: () => void
  setUser: (user: State['user']) => void
  setVerified: () => void
}

export type AuthContext = State & Actions