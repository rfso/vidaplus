import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import mockData from '../data/mockData.json';

export default function HistoricoPacientesProfissional() {
  const { user } = useAuth();
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [newHistoricoItem, setNewHistoricoItem] = useState('');
  const [pacientes, setPacientes] = useState(() => {
    // Pacientes atendidos pelo profissional (com base nos prontuários)
    const meusProntuarios = mockData.prontuarios.filter(p => p.profissional === user?.nome);
    const nomesPacientes = Array.from(new Set(meusProntuarios.map(p => p.paciente)));
    return mockData.pacientes.filter(p => nomesPacientes.includes(p.nome));
  });

  const handleEditHistorico = (paciente) => {
    setEditingPaciente(paciente);
    setNewHistoricoItem('');
  };

  const handleAddHistoricoItem = () => {
    if (!newHistoricoItem.trim()) return;

    const updatedPacientes = pacientes.map(p => {
      if (p.id === editingPaciente.id) {
        return {
          ...p,
          historico_clinico: [...(p.historico_clinico || []), newHistoricoItem.trim()]
        };
      }
      return p;
    });

    setPacientes(updatedPacientes);
    setNewHistoricoItem('');
  };

  const handleRemoveHistoricoItem = (index) => {
    const updatedPacientes = pacientes.map(p => {
      if (p.id === editingPaciente.id) {
        const newHistorico = [...(p.historico_clinico || [])];
        newHistorico.splice(index, 1);
        return {
          ...p,
          historico_clinico: newHistorico
        };
      }
      return p;
    });

    setPacientes(updatedPacientes);
  };

  const handleSaveChanges = () => {
    // Aqui você implementaria a lógica para salvar no backend
    console.log('Alterações salvas:', pacientes);
    setEditingPaciente(null);
    setNewHistoricoItem('');
  };

  const handleCancelEdit = () => {
    setPacientes(() => {
      const meusProntuarios = mockData.prontuarios.filter(p => p.profissional === user?.nome);
      const nomesPacientes = Array.from(new Set(meusProntuarios.map(p => p.paciente)));
      return mockData.pacientes.filter(p => nomesPacientes.includes(p.nome));
    });
    setEditingPaciente(null);
    setNewHistoricoItem('');
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Histórico dos Pacientes</h2>
      {pacientes.length === 0 ? (
        <div className="text-gray-500">Nenhum paciente encontrado.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {pacientes.map(paciente => (
            <li key={paciente.id} className="py-4">
              <div className="mb-1 font-semibold text-gray-900">{paciente.nome}</div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Data de Nascimento:</span> {new Date(paciente.data_nascimento).toLocaleDateString('pt-BR')}<br />
                <span className="font-medium">CPF:</span> {paciente.cpf}<br />
                <span className="font-medium">E-mail:</span> {paciente.email}<br />
                <span className="font-medium">Telefone:</span> {paciente.telefone}
              </div>
              <div className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Histórico Clínico:</span>
                  <button
                    onClick={() => handleEditHistorico(paciente)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Editar Histórico
                  </button>
                </div>
                <ul className="ml-6 mt-1">
                  {paciente.historico_clinico && paciente.historico_clinico.length > 0 ? (
                    paciente.historico_clinico.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  ) : (
                    <li>Nenhum histórico registrado.</li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de Edição */}
      {editingPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Editar Histórico - {editingPaciente.nome}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adicionar novo item:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHistoricoItem}
                  onChange={(e) => setNewHistoricoItem(e.target.value)}
                  placeholder="Digite um novo item do histórico..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddHistoricoItem()}
                />
                <button
                  onClick={handleAddHistoricoItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Adicionar
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Histórico Atual:
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                {pacientes.find(p => p.id === editingPaciente.id)?.historico_clinico?.length > 0 ? (
                  <ul className="space-y-2">
                    {pacientes.find(p => p.id === editingPaciente.id)?.historico_clinico.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{item}</span>
                        <button
                          onClick={() => handleRemoveHistoricoItem(idx)}
                          className="text-red-600 hover:text-red-800 text-xs font-medium"
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">Nenhum item no histórico.</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 