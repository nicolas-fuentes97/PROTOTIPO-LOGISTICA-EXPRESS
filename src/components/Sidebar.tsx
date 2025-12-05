import { motion } from 'motion/react';
import { LayoutDashboard, Package, Route, Settings, Truck } from 'lucide-react';

type Screen = 'login' | 'dashboard' | 'orders' | 'analytics' | 'config';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const menuItems = [
  { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders' as Screen, label: 'Ingreso de Pedidos', icon: Package },
  { id: 'analytics' as Screen, label: 'Análisis de Rutas', icon: Route },
  { id: 'config' as Screen, label: 'Configuración', icon: Settings },
];

export default function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 relative overflow-hidden">
            {/* Speed lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute left-1 w-6 h-0.5 bg-white/30 rounded-full"></div>
              <div className="absolute left-0.5 w-4 h-0.5 bg-white/20 rounded-full translate-y-1.5"></div>
              <div className="absolute left-0.5 w-4 h-0.5 bg-white/20 rounded-full -translate-y-1.5"></div>
            </div>
            <Truck className="w-6 h-6 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-white">LOGIXPRESS</h2>
            <p className="text-slate-500 text-xs">Centro de Comando</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-r"
                />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-3">
          <p className="text-white text-sm">Gestor de Logística</p>
          <p className="text-slate-500 text-xs">Admin • Sesión Activa</p>
        </div>
      </div>
    </aside>
  );
}