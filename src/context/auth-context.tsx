import { useLocalStorage } from 'hooks/use-local-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User, UserDetails } from 'types/auth';

interface AuthContextType {
  user: UserDetails | null;
  login: (user: User | null) => void;
  logout: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});


function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useState<UserDetails | null>(null);
    const { setItem, getItem } = useLocalStorage();

    const addUser = useCallback((user: UserDetails | null) => {
        setItem('user', JSON.stringify(user));
        setUser(user);
      }, [setItem]);

      const addToken = useCallback((token?: string | null) => {
        setItem('token', token || '');
      }, [setItem]);

      const removeUser = useCallback(() => {
        setUser(null);
        setItem('user', '');
        setItem('token', '');
      }, [setItem]);

    const login = useCallback((user: User | null) => {
        addUser(user?.user || null);
        addToken(user?.access_token);
      }, [addToken, addUser]);
    
    const logout = useCallback(() => {
        removeUser();
      }, [removeUser]);

    useEffect(() => {
        const savedUser = getItem('user');
        if (savedUser && !user) {
            addUser(JSON.parse(savedUser));
        }
    }, [addUser, getItem, user]);
    const providerValues = useMemo(() => ({user, login, logout}), [login, logout, user]);
    return <AuthContext.Provider value={providerValues} {...props} />;
}

function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
  }

  export {AuthProvider, useAuth}