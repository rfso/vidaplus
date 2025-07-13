import { useState } from 'react';
import mockData from '../data/mockData.json';

export default function PrescricoesList() {
  const [prescricoes, setPrescricoes] = useState(mockData.prescricoes);
  const [editingId, setEditingId] = useState(null);
  const [editingPrescricao, setEditingPrescricao] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailPrescricao, setEmailPrescricao] = useState(null);
  const [emailConfig, setEmailConfig] = useState({
    email: '',
    copiaMedico: false,
    copiaFarmacia: false,
    mensagem: ''
  });

  const handleEdit = (prescricao) => {
    setEditingId(prescricao.id);
    setEditingPrescricao({
      ...prescricao,
      medicamentos: [...prescricao.medicamentos]
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingPrescricao(null);
  };

  const handleSave = () => {
    setPrescricoes(prescricoes.map(p => 
      p.id === editingPrescricao.id ? editingPrescricao : p
    ));
    setEditingId(null);
    setEditingPrescricao(null);
  };

  const handleMedicamentoChange = (index, field, value) => {
    const updatedMedicamentos = [...editingPrescricao.medicamentos];
    updatedMedicamentos[index] = {
      ...updatedMedicamentos[index],
      [field]: value
    };
    setEditingPrescricao({
      ...editingPrescricao,
      medicamentos: updatedMedicamentos
    });
  };

  const addMedicamento = () => {
    setEditingPrescricao({
      ...editingPrescricao,
      medicamentos: [
        ...editingPrescricao.medicamentos,
        { nome: '', posologia: '', duracao: '' }
      ]
    });
  };

  const removeMedicamento = (index) => {
    const updatedMedicamentos = editingPrescricao.medicamentos.filter((_, i) => i !== index);
    setEditingPrescricao({
      ...editingPrescricao,
      medicamentos: updatedMedicamentos
    });
  };

  const handleStatusChange = (value) => {
    setEditingPrescricao({
      ...editingPrescricao,
      status: value
    });
  };

  const handleEmailClick = (prescricao) => {
    setEmailPrescricao(prescricao);
    setEmailConfig({
      email: '',
      copiaMedico: false,
      copiaFarmacia: false,
      mensagem: ''
    });
    setShowEmailModal(true);
  };

  const handleEmailSend = () => {
    // Simulação de envio de email
    console.log('Enviando prescrição por email:', {
      prescricao: emailPrescricao,
      config: emailConfig
    });
    
    // Aqui você poderia integrar com um serviço de email real
    alert('Prescrição enviada com sucesso!');
    setShowEmailModal(false);
    setEmailPrescricao(null);
  };

  const handleEmailCancel = () => {
    setShowEmailModal(false);
    setEmailPrescricao(null);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Prescrições
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            {prescricoes.length} ativas
          </span>
        </div>
        
        <div className="space-y-6">
          {prescricoes.map((prescricao) => (
            <div key={prescricao.id} className="border border-gray-200 rounded-lg p-4">
              {editingId === prescricao.id ? (
                // Modo de edição
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Prescrição #{prescricao.id}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(prescricao.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={editingPrescricao.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Ativa">Ativa</option>
                        <option value="Suspensa">Suspensa</option>
                        <option value="Finalizada">Finalizada</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Médico
                      </p>
                      <p className="text-sm text-gray-900">{prescricao.medico}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paciente
                      </p>
                      <p className="text-sm text-gray-900">{prescricao.paciente}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medicamentos
                      </p>
                      <button
                        onClick={addMedicamento}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        + Adicionar
                      </button>
                    </div>
                    <div className="space-y-3">
                      {editingPrescricao.medicamentos.map((medicamento, index) => (
                        <div key={index} className="bg-gray-50 rounded-md p-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs text-gray-500">Medicamento</label>
                              <input
                                type="text"
                                value={medicamento.nome}
                                onChange={(e) => handleMedicamentoChange(index, 'nome', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                                placeholder="Nome do medicamento"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">Posologia</label>
                              <input
                                type="text"
                                value={medicamento.posologia}
                                onChange={(e) => handleMedicamentoChange(index, 'posologia', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                                placeholder="Como usar"
                              />
                            </div>
                            <div className="flex items-end space-x-2">
                              <div className="flex-1">
                                <label className="text-xs text-gray-500">Duração</label>
                                <input
                                  type="text"
                                  value={medicamento.duracao}
                                  onChange={(e) => handleMedicamentoChange(index, 'duracao', e.target.value)}
                                  className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                                  placeholder="Ex: 30 dias"
                                />
                              </div>
                              <button
                                onClick={() => removeMedicamento(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                // Modo de visualização
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Prescrição #{prescricao.id}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(prescricao.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {prescricao.status}
                      </span>
                      <button
                        onClick={() => handleEdit(prescricao)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEmailClick(prescricao)}
                        className="text-green-500 hover:text-green-700 text-sm"
                      >
                        📧 Email
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Médico
                      </p>
                      <p className="text-sm text-gray-900">{prescricao.medico}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paciente
                      </p>
                      <p className="text-sm text-gray-900">{prescricao.paciente}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Medicamentos
                    </p>
                    <div className="space-y-2">
                      {prescricao.medicamentos.map((medicamento, index) => (
                        <div key={index} className="bg-gray-50 rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {medicamento.nome}
                              </p>
                              <p className="text-sm text-gray-600">
                                {medicamento.posologia}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                              {medicamento.duracao}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Envio por Email */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Enviar Prescrição por Email
                </h3>
                <button
                  onClick={handleEmailCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email do Paciente
                  </label>
                  <input
                    type="email"
                    value={emailConfig.email}
                    onChange={(e) => setEmailConfig({...emailConfig, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="paciente@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Opções de Envio
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={emailConfig.copiaMedico}
                        onChange={(e) => setEmailConfig({...emailConfig, copiaMedico: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Enviar cópia para o médico</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={emailConfig.copiaFarmacia}
                        onChange={(e) => setEmailConfig({...emailConfig, copiaFarmacia: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Enviar cópia para farmácia</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem Adicional (opcional)
                  </label>
                  <textarea
                    value={emailConfig.mensagem}
                    onChange={(e) => setEmailConfig({...emailConfig, mensagem: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    rows="3"
                    placeholder="Digite uma mensagem adicional para o paciente..."
                  />
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Prescrição a ser enviada:</p>
                  <p className="text-sm font-medium text-gray-900">
                    Prescrição #{emailPrescricao?.id} - {emailPrescricao?.paciente}
                  </p>
                  <p className="text-xs text-gray-500">
                    {emailPrescricao?.medicamentos.length} medicamento(s)
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={handleEmailCancel}
                  className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEmailSend}
                  disabled={!emailConfig.email}
                  className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Enviar Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 