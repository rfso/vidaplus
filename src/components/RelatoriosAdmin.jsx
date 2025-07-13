import { useState } from 'react';
import mockData from '../data/mockData.json';

export default function RelatoriosAdmin() {
  const [relatorios, setRelatorios] = useState(mockData.relatorios);
  const [showForm, setShowForm] = useState(false);
  const [novoRelatorio, setNovoRelatorio] = useState({
    titulo: '',
    descricao: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoRelatorio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!novoRelatorio.titulo.trim() || !novoRelatorio.descricao.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoRelatorioCompleto = {
      id: relatorios.length + 1,
      titulo: novoRelatorio.titulo,
      descricao: novoRelatorio.descricao,
      criado_em: new Date().toISOString().split('T')[0]
    };

    setRelatorios(prev => [...prev, novoRelatorioCompleto]);
    setNovoRelatorio({ titulo: '', descricao: '' });
    setShowForm(false);
  };

  const handleCancel = () => {
    setNovoRelatorio({ titulo: '', descricao: '' });
    setShowForm(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Relatórios</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          + Novo Relatório
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Adicionar Novo Relatório</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título do Relatório
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={novoRelatorio.titulo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o título do relatório"
              />
            </div>
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={novoRelatorio.descricao}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite a descrição do relatório"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Salvar Relatório
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {relatorios.length === 0 ? (
        <div className="text-gray-500 text-center py-8">Nenhum relatório disponível.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {relatorios.map(rel => (
            <li key={rel.id} className="py-4">
              <div className="font-semibold text-gray-900 mb-1">{rel.titulo}</div>
              <div className="text-sm text-gray-700 mb-1">{rel.descricao}</div>
              <div className="text-xs text-gray-500">Criado em: {new Date(rel.criado_em).toLocaleDateString('pt-BR')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 