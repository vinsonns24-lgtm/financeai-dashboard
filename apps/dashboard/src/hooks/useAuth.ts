import { useSession } from "../lib/auth";

export function useAuth() {
  const { data: session, isPending: isLoading, error } = useSession();

  return {
    user: session?.user,
    session: session?.session,
    isAuthenticated: !!session?.user,
    isLoading,
    error,
  };
}
