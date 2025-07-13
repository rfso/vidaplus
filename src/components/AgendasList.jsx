import { useState } from 'react';
import mockData from '../data/mockData.json';
import DataCard from './DataCard';

export default function AgendasList() {
  const [agendas] = useState(mockData.agendas);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Consulta':
        return 'bg-blue-100 text-blue-800';
      case 'Retorno':
        return 'bg-purple-100 text-purple-800';
      case 'Cirurgia':
        return 'bg-red-100 text-red-800';
      case 'Exame':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const fields = [
    { key: 'medico', label: 'Médico' },
    { key: 'paciente', label: 'Paciente' },
    { key: 'data', label: 'Data' },
    { key: 'hora', label: 'Hora' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Agendas
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {agendas.length} agendamentos
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {agendas.map((agenda) => (
            <DataCard
              key={agenda.id}
              data={{
                ...agenda,
                data: new Date(agenda.data).toLocaleDateString('pt-BR'),
                tipo: (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(agenda.tipo)}`}>
                    {agenda.tipo}
                  </span>
                ),
                status: (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agenda.status)}`}>
                    {agenda.status}
                  </span>
                ),
              }}
              fields={fields}
              actions={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 