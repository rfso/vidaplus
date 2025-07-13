import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import mockData from '../data/mockData.json';
import DataCard from './DataCard';

const tiposConsulta = [
  'Consulta',
  'Retorno',
  'Cirurgia',
  'Exame',
  'Teleconsulta'
];

function getLocalStorageConsultas(username) {
  try {
    const data = localStorage.getItem(`consultas_${username}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalStorageConsultas(username, consultas) {
  localStorage.setItem(`consultas_${username}` , JSON.stringify(consultas));
}

export default function AgendarCancelarConsulta() {
  const { user } = useAuth();
  // Consultas do mock + localStorage
  const minhasConsultasMock = mockData.agendas.filter(a => a.paciente === user?.nome);
  const [consultas, setConsultas] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // Formulário de agendamento
  const [medico, setMedico] = useState(mockData.medicos[0]?.nome || '');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState(tiposConsulta[0]);

  // Carrega consultas do localStorage + mock ao montar
  useEffect(() => {
    if (!user?.username) return;
    const localConsultas = getLocalStorageConsultas(user.username);
    // Evita duplicar consultas do mock se já existirem no localStorage
    const allConsultas = [
      ...localConsultas,
      ...minhasConsultasMock.filter(
        c => !localConsultas.some(lc => lc.id === c.id)
      )
    ];
    setConsultas(allConsultas);
  }, [user]);

  function syncAndSetConsultas(newConsultas) {
    setConsultas(newConsultas);
    setLocalStorageConsultas(user.username, newConsultas);
  }

  function cancelarConsulta(id) {
    const novas = consultas.map(c =>
      c.id === id ? { ...c, status: 'Cancelada' } : c
    );
    syncAndSetConsultas(novas);
    setMensagem('Consulta cancelada com sucesso!');
    setTimeout(() => setMensagem(''), 2000);
  }

  function agendarConsulta(e) {
    e.preventDefault();
    if (!medico || !data || !hora || !tipo) {
      setMensagem('Preencha todos os campos para agendar.');
      setTimeout(() => setMensagem(''), 2000);
      return;
    }
    const novaConsulta = {
      id: Date.now(),
      medico,
      paciente: user?.nome,
      data,
      hora,
      tipo,
      status: 'Agendada'
    };
    const novas = [novaConsulta, ...consultas];
    syncAndSetConsultas(novas);
    setMensagem('Consulta agendada com sucesso!');
    setData('');
    setHora('');
    setTipo(tiposConsulta[0]);
    setTimeout(() => setMensagem(''), 2000);
  }

  // Campos para o DataCard
  const consultaFields = [
    { key: 'medico', label: 'Médico' },
    { key: 'data', label: 'Data' },
    { key: 'hora', label: 'Hora' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Minhas Consultas</h2>
      {/* Formulário de agendamento */}
      <form onSubmit={agendarConsulta} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold mb-1">Médico</label>
          <select
            className="w-full border border-gray-200 rounded px-2 py-1"
            value={medico}
            onChange={e => setMedico(e.target.value)}
          >
            {mockData.medicos.map(m => (
              <option key={m.id} value={m.nome}>{m.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Data</label>
          <input
            type="date"
            className="w-full border border-gray-200 rounded px-2 py-1"
            value={data}
            onChange={e => setData(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Hora</label>
          <input
            type="time"
            className="w-full border border-gray-200 rounded px-2 py-1"
            value={hora}
            onChange={e => setHora(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Tipo</label>
          <select
            className="w-full border border-gray-200 rounded px-2 py-1"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          >
            {tiposConsulta.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-4">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all mt-2"
          >
            Agendar Consulta
          </button>
        </div>
      </form>
      {mensagem && <div className="mb-4 text-green-600 font-semibold">{mensagem}</div>}
      {consultas.length === 0 ? (
        <div className="text-gray-500">Nenhuma consulta agendada.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {consultas.map(consulta => (
            <DataCard
              key={consulta.id}
              data={{
                ...consulta,
                data: new Date(consulta.data).toLocaleDateString('pt-BR'),
                status: (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    consulta.status === 'Cancelada'
                      ? 'bg-red-100 text-red-700'
                      : consulta.status === 'Confirmada'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {consulta.status}
                  </span>
                ),
              }}
              fields={consultaFields}
              actions={consulta.status === 'Agendada'}
              onEdit={null}
              onDelete={() => cancelarConsulta(consulta.id)}
              onSave={null}
              onCancel={null}
              isEditing={false}
              editData={{}}
              onEditChange={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
} 