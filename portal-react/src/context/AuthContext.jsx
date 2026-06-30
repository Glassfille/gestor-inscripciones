import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../services/authService.js';
import { sessionStorageService } from '../services/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => sessionStorageService.getToken());
  const [user, setUser] = useState(() => sessionStorageService.getUser());

  async function login(credentials) {
    const session = await loginRequest(credentials);
    sessionStorageService.setSession(session);
    setToken(session.token);
    setUser(session.user);
    navigate('/cursos', { replace: true });
  }

  function logout() {
    sessionStorageService.clear();
    setToken(null);
    setUser(null);
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    function handleExpiredSession() {
      setToken(null);
      setUser(null);
      navigate('/login', { replace: true });
    }

    window.addEventListener('auth:expired', handleExpiredSession);
    return () => window.removeEventListener('auth:expired', handleExpiredSession);
  }, [navigate]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      user,
      login,
      logout
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
