import mockData from '../data/mockData.json';
import DataCard from './DataCard';

export default function InternacoesAdmin() {
  const fields = [
    { key: 'paciente', label: 'Paciente' },
    { key: 'data_entrada', label: 'Data Entrada' },
    { key: 'data_saida', label: 'Data Saída' },
    { key: 'motivo', label: 'Motivo' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Internações</h2>
      {mockData.internacoes.length === 0 ? (
        <div className="text-gray-500">Nenhuma internação registrada.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockData.internacoes.map(internacao => (
            <DataCard
              key={internacao.id}
              data={{
                ...internacao,
                data_entrada: new Date(internacao.data_entrada).toLocaleDateString('pt-BR'),
                data_saida: internacao.data_saida ? new Date(internacao.data_saida).toLocaleDateString('pt-BR') : '-',
                status: (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${internacao.status === 'Internado' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {internacao.status}
                  </span>
                ),
              }}
              fields={fields}
              actions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
} 