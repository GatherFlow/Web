import type { AuthContext } from "@/features/auth/types";
import { redirect } from "@tanstack/react-router";

export const canAccessAuth = (ctx: AuthContext) => {
  const { isAuthorized } = ctx

  if (!isAuthorized) {
    return redirect({ to: '/dashboard' })
  }
}
