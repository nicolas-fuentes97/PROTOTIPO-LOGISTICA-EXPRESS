import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OrderCreation from './components/OrderCreation';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import Sidebar from './components/Sidebar';

type Screen = 'login' | 'dashboard' | 'orders' | 'analytics' | 'config';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <main className="flex-1 overflow-auto">
        {currentScreen === 'dashboard' && <Dashboard />}
        {currentScreen === 'orders' && <OrderCreation />}
        {currentScreen === 'analytics' && <PerformanceAnalytics />}
        {currentScreen === 'config' && (
          <div className="p-8">
            <h1 className="text-cyan-400 mb-4">Configuración del Sistema</h1>
            <p className="text-slate-400">Panel de configuración en desarrollo...</p>
          </div>
        )}
      </main>
    </div>
  );
}
