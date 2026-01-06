'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'advisor';
  name: string;
  email: string;
}

interface CRMAuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const CRMAuthContext = createContext<CRMAuthContextType | undefined>(undefined);

// SSR-safe hook that returns default values when context is not available
export function useCRMAuth(): CRMAuthContextType {
  const context = useContext(CRMAuthContext);
  
  // During SSR or when not wrapped in provider, return default values
  if (!context) {
    return {
      user: null,
      login: async () => false,
      logout: () => {},
      isAuthenticated: false,
      isLoading: true,
    };
  }
  
  return context;
}

export function CRMAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Načti uživatele z localStorage při startu
  useEffect(() => {
    const savedUser = localStorage.getItem('crm_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('crm_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Ochrana CRM routes - redirect na login pokud není přihlášen
  useEffect(() => {
    if (!isLoading && pathname?.startsWith('/crm') && pathname !== '/crm' && pathname !== '/crm/login' && !user) {
      router.push('/crm');
    }
  }, [pathname, user, router, isLoading]);

  // Login funkce - čte z Supabase!
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Dotaz do Supabase - najdi poradce podle username a hesla
      const { data: advisor, error } = await supabase
        .from('advisors')
        .select('id, name, email, username, role, active')
        .eq('username', username.toLowerCase().trim())
        .eq('password', password)
        .eq('active', true)
        .single();

      if (error || !advisor) {
        console.error('Login failed:', error?.message || 'User not found');
        return false;
      }

      const loggedInUser: User = {
        id: advisor.id,
        username: advisor.username,
        role: advisor.role,
        name: advisor.name,
        email: advisor.email,
      };

      setUser(loggedInUser);
      localStorage.setItem('crm_user', JSON.stringify(loggedInUser));
      
      // Aktualizuj last_login_at
      await supabase
        .from('advisors')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', advisor.id);

      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm_user');
    router.push('/crm');
  };

  return (
    <CRMAuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isLoading 
    }}>
      {children}
    </CRMAuthContext.Provider>
  );
}
