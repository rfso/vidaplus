import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MedicosList from './MedicosList';
import EnfermeirosList from './EnfermeirosList';
import TecnicosList from './TecnicosList';
import AgendasList from './AgendasList';
import PrescricoesList from './PrescricoesList';
import MeuHistoricoClinico from './MeuHistoricoClinico';
import AgendarCancelarConsulta from './AgendarCancelarConsulta';
import NotificacoesPaciente from './NotificacoesPaciente';
import TeleconsultaPaciente from './TeleconsultaPaciente';
import ProntuariosProfissional from './ProntuariosProfissional';
import HistoricoPacientesProfissional from './HistoricoPacientesProfissional';
import GerenciarCadastrosAdmin from './GerenciarCadastrosAdmin';
import InternacoesAdmin from './InternacoesAdmin';
import RelatoriosAdmin from './RelatoriosAdmin';

// Placeholders para novas telas
function Placeholder({ title }) {
  return (
    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mt-2">Funcionalidade em desenvolvimento</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Menus por tipo de usuário
  const menus = {
    paciente: [
      { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
      { id: 'meu-historico', name: 'Meu Histórico', icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6a2 2 0 012-2h12a2 2 0 012 2v8c0 2.21-3.582 4-8 4z' },
      { id: 'agendar-consulta', name: 'Agendar Consulta', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { id: 'notificacoes', name: 'Notificações', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C6.67 7.165 6 8.97 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
      { id: 'teleconsulta', name: 'Teleconsulta', icon: 'M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4m11 0H9' }
    ],
    profissional: [
      { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
      { id: 'agendas', name: 'Gerenciar Agendas', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { id: 'prontuarios', name: 'Prontuários', icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6a2 2 0 012-2h12a2 2 0 012 2v8c0 2.21-3.582 4-8 4z' },
      { id: 'prescricoes', name: 'Receitas Digitais', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { id: 'historico-pacientes', name: 'Histórico de Pacientes', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
    ],
    administrador: [
      { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
      { id: 'cadastros', name: 'Gerenciar Cadastros', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { id: 'internacoes', name: 'Internações', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { id: 'relatorios', name: 'Relatórios', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' }
    ]
  };

  // Determina menus do usuário logado
  const userMenus = menus[user?.tipo] || menus['paciente'];

  const renderContent = () => {
    switch (activeTab) {
      // Comuns
      case 'dashboard':
        return (
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard</h3>
              <p className="text-gray-500">Bem-vindo ao sistema SGHSS - VidaPlus</p>
              <p className="text-gray-400 text-sm mt-2">Selecione uma opção no menu lateral para começar</p>
            </div>
          </div>
        );
      // Paciente
      case 'agendar-consulta':
        return <AgendarCancelarConsulta />;
      case 'meu-historico':
        return <MeuHistoricoClinico />;
      case 'notificacoes':
        return <NotificacoesPaciente />;
      case 'teleconsulta':
        return <TeleconsultaPaciente />;
      // Profissional
      case 'agendas':
        return <AgendasList />;
      case 'prontuarios':
        return <ProntuariosProfissional />;
      case 'prescricoes':
        return <PrescricoesList />;
      case 'historico-pacientes':
        return <HistoricoPacientesProfissional />;
      // Administrador
      case 'cadastros':
        return <GerenciarCadastrosAdmin />;
      case 'internacoes':
        return <InternacoesAdmin />;
      case 'relatorios':
        return <RelatoriosAdmin />;
      default:
        return <Placeholder title="Funcionalidade" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-green-500/10 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#22c55e" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <h1 className="text-xl font-bold text-gray-900 hidden md:block">SGHSS - VidaPlus</h1> 
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Bem-vindo, <span className="font-semibold">{user?.nome || user?.username || 'Usuário'}</span>
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Visible only on screens smaller than 920px */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="py-3">
            <div className="flex space-x-1 overflow-x-auto">
              {userMenus.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border-b-2 border-green-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors flex-shrink-0`}
                >
                  <svg
                    className={`${
                      activeTab === tab.id ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-2 flex-shrink-0 h-5 w-5`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  {tab.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar - Hidden on screens smaller than 920px */}
        <div className="hidden lg:block w-64 bg-white shadow-sm border-r">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {userMenus.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border-r-2 border-green-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors`}
                >
                  <svg
                    className={`${
                      activeTab === tab.id ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  {tab.name}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 