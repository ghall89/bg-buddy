import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { handleLogin } from '../helpers/handle-login';
import { handleLogout } from '../helpers/handle-logout';
import { User } from '../repositories/user-repository';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (status === 'authenticated' && session?.user) {
      setUser(session.user as User);
      setLoading(false);
    } else if (status === 'unauthenticated') {
      setUser(null);
      setLoading(false);
    }
  }, [session, status]);

  const login = async (credentials: { email: string; password: string }) => {
    await handleLogin(setLoading, credentials, update);
  };

  const logout = async (): Promise<void> => {
    handleLogout(setLoading, setUser);
  };

  const isAuthenticated: boolean = !!user && status === 'authenticated';

  const conextMemo = useMemo(
    () => ({ user, session, loading, login, logout, isAuthenticated, status }),
    [user, session, loading, login, logout, isAuthenticated, status],
  );

  return (
    <AuthContext.Provider value={conextMemo}>{children}</AuthContext.Provider>
  );
}

export function withAuth() {}
