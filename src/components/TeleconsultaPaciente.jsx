import { useAuth } from '../contexts/AuthContext';
import mockData from '../data/mockData.json';

function getLocalStorageConsultas(username) {
  try {
    const data = localStorage.getItem(`consultas_${username}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export default function TeleconsultaPaciente() {
  const { user } = useAuth();
  // Busca teleconsultas do localStorage e do mock
  const consultasLocal = getLocalStorageConsultas(user?.username || '');
  const consultasMock = mockData.agendas.filter(a => a.paciente === user?.nome);
  // Junta e filtra por tipo Teleconsulta e status Agendada
  const todas = [...consultasLocal, ...consultasMock.filter(
    c => !consultasLocal.some(lc => lc.id === c.id)
  )];
  const teleconsultas = todas.filter(
    a => a.tipo.toLowerCase().includes('tele') && a.status === 'Agendada'
  );
  // Pega a próxima teleconsulta (mais próxima do dia atual)
  const proxima = teleconsultas.sort((a, b) => new Date(a.data + 'T' + a.hora) - new Date(b.data + 'T' + b.hora))[0];

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Teleconsulta</h2>
      {proxima ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700">
            Você possui uma teleconsulta agendada para o dia <b>{new Date(proxima.data).toLocaleDateString('pt-BR')}</b> às <b>{proxima.hora}</b> com <b>{proxima.medico}</b>.
          </p>
          <a
            href="https://meet.google.com/abc-defg-hij" // link fictício
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all text-lg"
          >
            Acessar Teleconsulta
          </a>
        </div>
      ) : (
        <div className="text-gray-500 text-center">Nenhuma teleconsulta agendada no momento.</div>
      )}
    </div>
  );
} 