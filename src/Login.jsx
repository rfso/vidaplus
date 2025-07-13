import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('paciente');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, loading, getTiposUsuario } = useAuth();

  // Redirecionar se já estiver autenticado
  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = login({ username, senha: password, tipo });
    if (result.sucesso) {
      setError('');
    } else {
      setError(result.mensagem || 'Usuário, senha ou tipo incorretos.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-flex items-center justify-center rounded-full bg-verde-saude/10 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#2ecc71" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-verde-saude drop-shadow-sm">SGHSS - VidaPlus</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-2xl w-full transition-all">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Login</h2>
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Usuário</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-verde-saude focus:border-verde-saude transition-all"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Tipo de Usuário</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-verde-saude focus:border-verde-saude transition-all"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            >
              {getTiposUsuario().map((tipoOpt) => (
                <option key={tipoOpt} value={tipoOpt}>{tipoOpt.charAt(0).toUpperCase() + tipoOpt.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-gray-700">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-verde-saude focus:border-verde-saude transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all text-lg"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
} 