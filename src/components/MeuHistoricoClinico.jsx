import { useAuth } from '../contexts/AuthContext';
import mockData from '../data/mockData.json';

export default function MeuHistoricoClinico() {
  const { user } = useAuth();
  const paciente = mockData.pacientes.find(p => p.nome === user?.nome);

  if (!paciente) {
    return <div className="text-center text-gray-500">Paciente não encontrado.</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Meu Histórico Clínico</h2>
      <div className="mb-4">
        <span className="font-semibold">Nome:</span> {paciente.nome}<br />
        <span className="font-semibold">Data de Nascimento:</span> {new Date(paciente.data_nascimento).toLocaleDateString('pt-BR')}<br />
        <span className="font-semibold">CPF:</span> {paciente.cpf}<br />
        <span className="font-semibold">E-mail:</span> {paciente.email}<br />
        <span className="font-semibold">Telefone:</span> {paciente.telefone}
      </div>
      <div>
        <span className="font-semibold">Histórico Clínico:</span>
        <ul className="ml-6 mt-2 text-gray-700">
          {paciente.historico_clinico && paciente.historico_clinico.length > 0 ? (
            paciente.historico_clinico.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))
          ) : (
            <li>Nenhum histórico registrado.</li>
          )}
        </ul>
      </div>
    </div>
  );
} 