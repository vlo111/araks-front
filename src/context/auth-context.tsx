import { useLocalStorage } from 'hooks/use-local-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User } from 'types/auth';

interface AuthContextType {
  user: User | null;
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
    const [user, setUser] = useState<User | null>(null);
    const { setItem, getItem } = useLocalStorage();

    const addUser = useCallback((user: User | null) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
      }, [setItem]);
    
      const removeUser = useCallback(() => {
        setUser(null);
        setItem('user', '');
      }, [setItem]);

    const login = useCallback((user: User | null) => {
        addUser(user);
      }, [addUser]);
    
    const logout = useCallback(() => {
        removeUser();
      }, [removeUser]);

    useEffect(() => {
        const user = getItem('user');
        if (user) {
        addUser(JSON.parse(user));
        }
    }, [addUser, getItem]);
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