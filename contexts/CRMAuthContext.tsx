'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  name: string;
}

interface CRMAuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const CRMAuthContext = createContext<CRMAuthContextType | undefined>(undefined);

export function CRMAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('crm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (pathname?.startsWith('/crm') && pathname !== '/crm' && !user) {
      router.push('/crm');
    }
  }, [pathname, user, router]);

  const login = (username: string, password: string): boolean => {
    const users = [
      { id: '1', username: 'breclav', password: 'breclav', role: 'admin' as const, name: 'Admin Břeclav' },
      { id: '2', username: 'poradce1', password: 'poradce1', role: 'user' as const, name: 'Jan Novák' },
      { id: '3', username: 'poradce2', password: 'poradce2', role: 'user' as const, name: 'Eva Svobodová' },
    ];

    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('crm_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm_user');
    router.push('/crm');
  };

  return (
    <CRMAuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </CRMAuthContext.Provider>
  );
}

export function useCRMAuth() {
  const context = useContext(CRMAuthContext);
  if (context === undefined) {
    throw new Error('useCRMAuth must be used within CRMAuthProvider');
  }
  return context;
}
