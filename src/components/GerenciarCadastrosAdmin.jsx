import { useState, useEffect } from 'react';
import mockData from '../data/mockData.json';
import DataCard from './DataCard';
import AddForm from './AddForm';

function getLocal(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getNextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map(x => x.id)) + 1 : 1;
}

export default function GerenciarCadastrosAdmin() {
  // Configurações dos campos
  const fieldConfigs = {
    pacientes: [
      { key: 'nome', label: 'Nome', placeholder: 'Nome completo' },
      { key: 'cpf', label: 'CPF', placeholder: '000.000.000-00' },
      { key: 'email', label: 'E-mail', placeholder: 'email@exemplo.com', type: 'email' },
      { key: 'telefone', label: 'Telefone', placeholder: '(00) 00000-0000' }
    ],
    medicos: [
      { key: 'nome', label: 'Nome', placeholder: 'Nome completo' },
      { key: 'crm', label: 'CRM', placeholder: 'CRM 00000' },
      { key: 'especialidade', label: 'Especialidade', placeholder: 'Especialidade médica' },
      { key: 'email', label: 'E-mail', placeholder: 'email@exemplo.com', type: 'email' }
    ],
    enfermeiros: [
      { key: 'nome', label: 'Nome', placeholder: 'Nome completo' },
      { key: 'coren', label: 'COREN', placeholder: 'COREN 000000' },
      { key: 'especialidade', label: 'Especialidade', placeholder: 'Especialidade' },
      { key: 'email', label: 'E-mail', placeholder: 'email@exemplo.com', type: 'email' }
    ],
    tecnicos: [
      { key: 'nome', label: 'Nome', placeholder: 'Nome completo' },
      { key: 'registro', label: 'Registro', placeholder: 'Número do registro' },
      { key: 'especialidade', label: 'Especialidade', placeholder: 'Especialidade' },
      { key: 'email', label: 'E-mail', placeholder: 'email@exemplo.com', type: 'email' }
    ]
  };

  // Pacientes
  const [pacientes, setPacientes] = useState([]);
  const [editPacienteId, setEditPacienteId] = useState(null);
  const [editPacienteData, setEditPacienteData] = useState({});
  const [msg, setMsg] = useState('');
  const [showAddPaciente, setShowAddPaciente] = useState(false);
  const [addPacienteData, setAddPacienteData] = useState({ nome: '', cpf: '', email: '', telefone: '' });

  // Médicos
  const [medicos, setMedicos] = useState([]);
  const [editMedicoId, setEditMedicoId] = useState(null);
  const [editMedicoData, setEditMedicoData] = useState({});
  const [msgMedico, setMsgMedico] = useState('');
  const [showAddMedico, setShowAddMedico] = useState(false);
  const [addMedicoData, setAddMedicoData] = useState({ nome: '', crm: '', especialidade: '', email: '' });

  // Enfermeiros
  const [enfermeiros, setEnfermeiros] = useState([]);
  const [editEnfermeiroId, setEditEnfermeiroId] = useState(null);
  const [editEnfermeiroData, setEditEnfermeiroData] = useState({});
  const [msgEnfermeiro, setMsgEnfermeiro] = useState('');
  const [showAddEnfermeiro, setShowAddEnfermeiro] = useState(false);
  const [addEnfermeiroData, setAddEnfermeiroData] = useState({ nome: '', coren: '', especialidade: '', email: '' });

  // Técnicos
  const [tecnicos, setTecnicos] = useState([]);
  const [editTecnicoId, setEditTecnicoId] = useState(null);
  const [editTecnicoData, setEditTecnicoData] = useState({});
  const [msgTecnico, setMsgTecnico] = useState('');
  const [showAddTecnico, setShowAddTecnico] = useState(false);
  const [addTecnicoData, setAddTecnicoData] = useState({ nome: '', registro: '', especialidade: '', email: '' });

  useEffect(() => {
    setPacientes(getLocal('pacientes_admin', mockData.pacientes));
    setMedicos(getLocal('medicos_admin', mockData.medicos));
    setEnfermeiros(getLocal('enfermeiros_admin', mockData.enfermeiros));
    setTecnicos(getLocal('tecnicos_admin', mockData.tecnicos));
  }, []);

  // Pacientes
  function startEditPaciente(p) {
    setEditPacienteId(p.id);
    setEditPacienteData({ ...p });
  }
  function cancelEditPaciente() {
    setEditPacienteId(null);
    setEditPacienteData({});
  }
  function handleEditPacienteChange(e) {
    setEditPacienteData({ ...editPacienteData, [e.target.name]: e.target.value });
  }
  function saveEditPaciente() {
    const novos = pacientes.map(p => p.id === editPacienteId ? { ...editPacienteData, id: p.id } : p);
    setPacientes(novos);
    setLocal('pacientes_admin', novos);
    setEditPacienteId(null);
    setEditPacienteData({});
    setMsg('Paciente atualizado com sucesso!');
    setTimeout(() => setMsg(''), 2000);
  }
  function handleAddPacienteChange(e) {
    setAddPacienteData({ ...addPacienteData, [e.target.name]: e.target.value });
  }
  function addPaciente(e) {
    e.preventDefault();
    const novo = { ...addPacienteData, id: getNextId(pacientes) };
    const novos = [novo, ...pacientes];
    setPacientes(novos);
    setLocal('pacientes_admin', novos);
    setAddPacienteData({ nome: '', cpf: '', email: '', telefone: '' });
    setShowAddPaciente(false);
    setMsg('Paciente adicionado com sucesso!');
    setTimeout(() => setMsg(''), 2000);
  }
  function excluirPaciente(id) {
    const novos = pacientes.filter(p => p.id !== id);
    setPacientes(novos);
    setLocal('pacientes_admin', novos);
    setMsg('Paciente excluído com sucesso!');
    setTimeout(() => setMsg(''), 2000);
  }

  // Médicos
  function startEditMedico(m) {
    setEditMedicoId(m.id);
    setEditMedicoData({ ...m });
  }
  function cancelEditMedico() {
    setEditMedicoId(null);
    setEditMedicoData({});
  }
  function handleEditMedicoChange(e) {
    setEditMedicoData({ ...editMedicoData, [e.target.name]: e.target.value });
  }
  function saveEditMedico() {
    const novos = medicos.map(m => m.id === editMedicoId ? { ...editMedicoData, id: m.id } : m);
    setMedicos(novos);
    setLocal('medicos_admin', novos);
    setEditMedicoId(null);
    setEditMedicoData({});
    setMsgMedico('Médico atualizado com sucesso!');
    setTimeout(() => setMsgMedico(''), 2000);
  }
  function handleAddMedicoChange(e) {
    setAddMedicoData({ ...addMedicoData, [e.target.name]: e.target.value });
  }
  function addMedico(e) {
    e.preventDefault();
    const novo = { ...addMedicoData, id: getNextId(medicos) };
    const novos = [novo, ...medicos];
    setMedicos(novos);
    setLocal('medicos_admin', novos);
    setAddMedicoData({ nome: '', crm: '', especialidade: '', email: '' });
    setShowAddMedico(false);
    setMsgMedico('Médico adicionado com sucesso!');
    setTimeout(() => setMsgMedico(''), 2000);
  }
  function excluirMedico(id) {
    const novos = medicos.filter(m => m.id !== id);
    setMedicos(novos);
    setLocal('medicos_admin', novos);
    setMsgMedico('Médico excluído com sucesso!');
    setTimeout(() => setMsgMedico(''), 2000);
  }

  // Enfermeiros
  function startEditEnfermeiro(e) {
    setEditEnfermeiroId(e.id);
    setEditEnfermeiroData({ ...e });
  }
  function cancelEditEnfermeiro() {
    setEditEnfermeiroId(null);
    setEditEnfermeiroData({});
  }
  function handleEditEnfermeiroChange(e) {
    setEditEnfermeiroData({ ...editEnfermeiroData, [e.target.name]: e.target.value });
  }
  function saveEditEnfermeiro() {
    const novos = enfermeiros.map(e => e.id === editEnfermeiroId ? { ...editEnfermeiroData, id: e.id } : e);
    setEnfermeiros(novos);
    setLocal('enfermeiros_admin', novos);
    setEditEnfermeiroId(null);
    setEditEnfermeiroData({});
    setMsgEnfermeiro('Enfermeiro atualizado com sucesso!');
    setTimeout(() => setMsgEnfermeiro(''), 2000);
  }
  function handleAddEnfermeiroChange(e) {
    setAddEnfermeiroData({ ...addEnfermeiroData, [e.target.name]: e.target.value });
  }
  function addEnfermeiro(e) {
    e.preventDefault();
    const novo = { ...addEnfermeiroData, id: getNextId(enfermeiros) };
    const novos = [novo, ...enfermeiros];
    setEnfermeiros(novos);
    setLocal('enfermeiros_admin', novos);
    setAddEnfermeiroData({ nome: '', coren: '', especialidade: '', email: '' });
    setShowAddEnfermeiro(false);
    setMsgEnfermeiro('Enfermeiro adicionado com sucesso!');
    setTimeout(() => setMsgEnfermeiro(''), 2000);
  }
  function excluirEnfermeiro(id) {
    const novos = enfermeiros.filter(e => e.id !== id);
    setEnfermeiros(novos);
    setLocal('enfermeiros_admin', novos);
    setMsgEnfermeiro('Enfermeiro excluído com sucesso!');
    setTimeout(() => setMsgEnfermeiro(''), 2000);
  }

  // Técnicos
  function startEditTecnico(t) {
    setEditTecnicoId(t.id);
    setEditTecnicoData({ ...t });
  }
  function cancelEditTecnico() {
    setEditTecnicoId(null);
    setEditTecnicoData({});
  }
  function handleEditTecnicoChange(e) {
    setEditTecnicoData({ ...editTecnicoData, [e.target.name]: e.target.value });
  }
  function saveEditTecnico() {
    const novos = tecnicos.map(t => t.id === editTecnicoId ? { ...editTecnicoData, id: t.id } : t);
    setTecnicos(novos);
    setLocal('tecnicos_admin', novos);
    setEditTecnicoId(null);
    setEditTecnicoData({});
    setMsgTecnico('Técnico atualizado com sucesso!');
    setTimeout(() => setMsgTecnico(''), 2000);
  }
  function handleAddTecnicoChange(e) {
    setAddTecnicoData({ ...addTecnicoData, [e.target.name]: e.target.value });
  }
  function addTecnico(e) {
    e.preventDefault();
    const novo = { ...addTecnicoData, id: getNextId(tecnicos) };
    const novos = [novo, ...tecnicos];
    setTecnicos(novos);
    setLocal('tecnicos_admin', novos);
    setAddTecnicoData({ nome: '', registro: '', especialidade: '', email: '' });
    setShowAddTecnico(false);
    setMsgTecnico('Técnico adicionado com sucesso!');
    setTimeout(() => setMsgTecnico(''), 2000);
  }
  function excluirTecnico(id) {
    const novos = tecnicos.filter(t => t.id !== id);
    setTecnicos(novos);
    setLocal('tecnicos_admin', novos);
    setMsgTecnico('Técnico excluído com sucesso!');
    setTimeout(() => setMsgTecnico(''), 2000);
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Gerenciar Cadastros</h2>
      {/* Pacientes */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-700">Pacientes</h3>
        {msg && <div className="mb-2 text-green-600 font-semibold text-sm">{msg}</div>}
        <button onClick={() => setShowAddPaciente(v => !v)} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          {showAddPaciente ? 'Cancelar' : 'Novo Paciente'}
        </button>
        
        {showAddPaciente && (
          <AddForm
            fields={fieldConfigs.pacientes}
            formData={addPacienteData}
            onChange={handleAddPacienteChange}
            onSubmit={addPaciente}
            onCancel={() => setShowAddPaciente(false)}
            submitText="Adicionar Paciente"
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {pacientes.map(paciente => (
            <DataCard
              key={paciente.id}
              data={paciente}
              fields={fieldConfigs.pacientes}
              onEdit={startEditPaciente}
              onDelete={excluirPaciente}
              onSave={saveEditPaciente}
              onCancel={cancelEditPaciente}
              isEditing={editPacienteId === paciente.id}
              editData={editPacienteData}
              onEditChange={handleEditPacienteChange}
            />
          ))}
        </div>
      </div>
      {/* Médicos */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-700">Médicos</h3>
        {msgMedico && <div className="mb-2 text-green-600 font-semibold text-sm">{msgMedico}</div>}
        <button onClick={() => setShowAddMedico(v => !v)} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          {showAddMedico ? 'Cancelar' : 'Novo Médico'}
        </button>
        
        {showAddMedico && (
          <AddForm
            fields={fieldConfigs.medicos}
            formData={addMedicoData}
            onChange={handleAddMedicoChange}
            onSubmit={addMedico}
            onCancel={() => setShowAddMedico(false)}
            submitText="Adicionar Médico"
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {medicos.map(medico => (
            <DataCard
              key={medico.id}
              data={medico}
              fields={fieldConfigs.medicos}
              onEdit={startEditMedico}
              onDelete={excluirMedico}
              onSave={saveEditMedico}
              onCancel={cancelEditMedico}
              isEditing={editMedicoId === medico.id}
              editData={editMedicoData}
              onEditChange={handleEditMedicoChange}
            />
          ))}
        </div>
      </div>
      {/* Enfermeiros */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-700">Enfermeiros</h3>
        {msgEnfermeiro && <div className="mb-2 text-green-600 font-semibold text-sm">{msgEnfermeiro}</div>}
        <button onClick={() => setShowAddEnfermeiro(v => !v)} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          {showAddEnfermeiro ? 'Cancelar' : 'Novo Enfermeiro'}
        </button>
        
        {showAddEnfermeiro && (
          <AddForm
            fields={fieldConfigs.enfermeiros}
            formData={addEnfermeiroData}
            onChange={handleAddEnfermeiroChange}
            onSubmit={addEnfermeiro}
            onCancel={() => setShowAddEnfermeiro(false)}
            submitText="Adicionar Enfermeiro"
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {enfermeiros.map(enfermeiro => (
            <DataCard
              key={enfermeiro.id}
              data={enfermeiro}
              fields={fieldConfigs.enfermeiros}
              onEdit={startEditEnfermeiro}
              onDelete={excluirEnfermeiro}
              onSave={saveEditEnfermeiro}
              onCancel={cancelEditEnfermeiro}
              isEditing={editEnfermeiroId === enfermeiro.id}
              editData={editEnfermeiroData}
              onEditChange={handleEditEnfermeiroChange}
            />
          ))}
        </div>
      </div>
      {/* Técnicos */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-700">Técnicos</h3>
        {msgTecnico && <div className="mb-2 text-green-600 font-semibold text-sm">{msgTecnico}</div>}
        <button onClick={() => setShowAddTecnico(v => !v)} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          {showAddTecnico ? 'Cancelar' : 'Novo Técnico'}
        </button>
        
        {showAddTecnico && (
          <AddForm
            fields={fieldConfigs.tecnicos}
            formData={addTecnicoData}
            onChange={handleAddTecnicoChange}
            onSubmit={addTecnico}
            onCancel={() => setShowAddTecnico(false)}
            submitText="Adicionar Técnico"
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {tecnicos.map(tecnico => (
            <DataCard
              key={tecnico.id}
              data={tecnico}
              fields={fieldConfigs.tecnicos}
              onEdit={startEditTecnico}
              onDelete={excluirTecnico}
              onSave={saveEditTecnico}
              onCancel={cancelEditTecnico}
              isEditing={editTecnicoId === tecnico.id}
              editData={editTecnicoData}
              onEditChange={handleEditTecnicoChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 