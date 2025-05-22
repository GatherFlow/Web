import type { AuthContext } from "@/features/auth/types";
import { notFound } from "@tanstack/react-router";

export const isAuthorized = (ctx: AuthContext) => {
  const { isAuthorized } = ctx

  if (!isAuthorized) {
    throw notFound()
  }
}
