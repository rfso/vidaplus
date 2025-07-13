import { createContext, useContext, useState, useEffect } from 'react';
import mockData from '../data/mockData.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há dados de autenticação salvos no localStorage
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUser(authData.user);
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  // Novo login: verifica usuário, senha e tipo no mock
  const login = ({ username, senha, tipo }) => {
    const usuario = mockData.usuarios.find(
      (u) => u.username === username && u.senha === senha && u.tipo === tipo
    );
    if (usuario) {
      setIsAuthenticated(true);
      setUser(usuario);
      localStorage.setItem('auth', JSON.stringify({ user: usuario, timestamp: Date.now() }));
      return { sucesso: true };
    } else {
      setIsAuthenticated(false);
      setUser(null);
      return { sucesso: false, mensagem: 'Usuário, senha ou tipo incorretos.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
  };

  // Para o seletor de tipos de usuário
  const getTiposUsuario = () => {
    // Retorna tipos únicos presentes no mock
    return Array.from(new Set(mockData.usuarios.map(u => u.tipo)));
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    getTiposUsuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 