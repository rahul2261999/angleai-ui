'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthenticatedUser } from '@/features/auth/auth.type.';

interface AuthContextType {
  user: AuthenticatedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  signin: (user: AuthenticatedUser, token: string) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for existing auth data on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const signin = (user: AuthenticatedUser, token: string) => {
    setUser(user);
    setToken(token);
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    router.push('/dashboard/analytics');
  };

  const signout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    router.push('/signin');
  };

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = pathname?.startsWith('/signin') || pathname?.startsWith('/signup');
      
      if (!user && !isAuthPage) {
        router.replace('/signin');
      } else if (user && isAuthPage) {
        router.replace('/dashboard/analytics');
      }
    }
  }, [user, pathname, isLoading, router]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};