// Dummy local authentication to bypass the backend

export const signIn = {
  email: async (credentials: any) => {
    return new Promise<{data: any, error: any}>((resolve) => {
      setTimeout(() => {
        resolve({ data: { user: { id: 'user_1', name: 'Demo User', email: credentials.email } }, error: null });
      }, 500);
    });
  }
};

export const signUp = {
  email: async (credentials: any) => {
    return new Promise<{data: any, error: any}>((resolve) => {
      setTimeout(() => {
        resolve({ data: { user: { id: 'user_1', name: credentials.name, email: credentials.email } }, error: null });
      }, 500);
    });
  }
};

export const signOut = async () => {
  return new Promise<void>((resolve) => setTimeout(resolve, 500));
};

export const useSession = () => {
  return {
    data: {
      user: { id: 'user_1', name: 'Demo User', email: 'demo@financeai.com' },
      session: { id: 'session_1', userId: 'user_1', expiresAt: new Date(Date.now() + 86400000) }
    },
    isPending: false,
    error: null
  };
};
