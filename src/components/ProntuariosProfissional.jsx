import { useAuth } from '../contexts/AuthContext';
import mockData from '../data/mockData.json';
import DataCard from './DataCard';
import { useState } from 'react';

export default function ProntuariosProfissional() {
  const { user } = useAuth();
  // Filtra prontuários do profissional logado
  const [prontuarios, setProntuarios] = useState(
    mockData.prontuarios.filter(p => p.profissional === user?.nome)
  );
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fields = [
    { key: 'paciente', label: 'Paciente' },
    { key: 'data', label: 'Data' },
    { key: 'anotacoes', label: 'Anotações' },
  ];

  function startEdit(pront) {
    setEditId(pront.id);
    setEditData({ anotacoes: pront.anotacoes });
  }
  function cancelEdit() {
    setEditId(null);
    setEditData({});
  }
  function handleEditChange(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }
  function saveEdit() {
    const novos = prontuarios.map(p =>
      p.id === editId ? { ...p, anotacoes: editData.anotacoes } : p
    );
    setProntuarios(novos);
    setEditId(null);
    setEditData({});
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Meus Prontuários</h2>
      {prontuarios.length === 0 ? (
        <div className="text-gray-500">Nenhum prontuário encontrado.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {prontuarios.map(pront => (
            <DataCard
              key={pront.id}
              data={{
                ...pront,
                data: new Date(pront.data).toLocaleDateString('pt-BR'),
              }}
              fields={fields}
              actions={true}
              isEditing={editId === pront.id}
              editData={editData}
              onEdit={() => startEdit(pront)}
              onEditChange={handleEditChange}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
} 