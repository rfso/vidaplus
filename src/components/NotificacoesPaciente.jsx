import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import mockData from '../data/mockData.json';

export default function NotificacoesPaciente() {
  const { user } = useAuth();
  const minhasNotificacoes = mockData.notificacoes.filter(n => n.usuario === user?.username);
  const [notificacoes, setNotificacoes] = useState(minhasNotificacoes);

  function marcarComoLida(id) {
    setNotificacoes(notificacoes =>
      notificacoes.map(n =>
        n.id === id ? { ...n, lida: true } : n
      )
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Notificações</h2>
      {notificacoes.length === 0 ? (
        <div className="text-gray-500">Nenhuma notificação encontrada.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notificacoes.map(notif => (
            <li key={notif.id} className="py-4 flex items-center justify-between">
              <div>
                <span className={`block text-sm ${notif.lida ? 'text-gray-500' : 'text-gray-900 font-semibold'}`}>{notif.mensagem}</span>
                {!notif.lida && <span className="text-xs text-blue-600">Nova</span>}
              </div>
              {!notif.lida && (
                <button
                  className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium"
                  onClick={() => marcarComoLida(notif.id)}
                >
                  Marcar como lida
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 