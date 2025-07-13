import { useState } from 'react';
import mockData from '../data/mockData.json';
import DataCard from './DataCard';

export default function MedicosList() {
  const [medicos] = useState(mockData.medicos);

  const fields = [
    { key: 'nome', label: 'Nome' },
    { key: 'crm', label: 'CRM' },
    { key: 'especialidade', label: 'Especialidade' },
    { key: 'contato', label: 'Contato' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Médicos
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {medicos.length} ativos
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {medicos.map((medico) => (
            <DataCard
              key={medico.id}
              data={{
                ...medico,
                contato: (
                  <span>
                    <span className="block">{medico.telefone}</span>
                    <span className="block">{medico.email}</span>
                  </span>
                ),
                status: (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {medico.status}
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