import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, MapPin, Activity, AlertTriangle, Navigation, Clock } from 'lucide-react';
import ManualAssignmentModal from './ManualAssignmentModal';
import TrafficMap from './TrafficMap';

const vehicles = [
  { id: 101, lat: 35, lng: 25, status: 'En ruta', speed: '65 km/h', cargo: '85%' },
  { id: 102, lat: 55, lng: 45, status: 'En ruta', speed: '72 km/h', cargo: '92%' },
  { id: 103, lat: 75, lng: 70, status: 'Detenido', speed: '0 km/h', cargo: '60%' },
  { id: 104, lat: 20, lng: 60, status: 'En ruta', speed: '58 km/h', cargo: '78%' },
  { id: 105, lat: 45, lng: 15, status: 'Retornando', speed: '45 km/h', cargo: '15%' },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Centro de Comando y Flota</h1>
          <p className="text-slate-400">Monitoreo en Tiempo Real</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-2">
            <p className="text-emerald-400 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Sistema Operativo
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Flota Activa</p>
            <Truck className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-white text-2xl">5</p>
          <p className="text-emerald-400 text-xs mt-1">↑ 100% Operativa</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">En Ruta</p>
            <Navigation className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-white text-2xl">3</p>
          <p className="text-slate-400 text-xs mt-1">Entregas Activas</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Velocidad Prom.</p>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-white text-2xl">60</p>
          <p className="text-slate-400 text-xs mt-1">km/h</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Tiempo Estimado</p>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-white text-2xl">2.5</p>
          <p className="text-slate-400 text-xs mt-1">horas promedio</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Map Component */}
        <div className="col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-white">Visualización de Flota</h3>
              <p className="text-slate-500 text-sm">Trazabilidad en Tiempo Real</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm">Live</span>
            </div>
          </div>

          {/* Map Area */}
          <div className="relative bg-slate-950 h-[600px] overflow-hidden">
            <TrafficMap 
              vehicles={vehicles}
              onVehicleClick={setSelectedVehicle}
              selectedVehicle={selectedVehicle}
            />
          </div>
        </div>

        {/* Exception Control Panel */}
        <div className="space-y-6">
          {/* Manual Assignment Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white">Control de Excepciones</h3>
                <p className="text-slate-400 text-sm">Operacionales</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-6">
              Gestión manual de rutas en situaciones críticas o excepcionales del sistema.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-3 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
            >
              ASIGNAR MANUALMENTE
            </motion.button>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-slate-500 text-xs">Control Manual</p>
            </div>
          </motion.div>

          {/* Fleet Status List */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white mb-4">Estado de Flota</h3>
            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      vehicle.status === 'En ruta' ? 'bg-cyan-500/20' :
                      vehicle.status === 'Detenido' ? 'bg-red-500/20' :
                      'bg-emerald-500/20'
                    }`}>
                      <Truck className={`w-4 h-4 ${
                        vehicle.status === 'En ruta' ? 'text-cyan-400' :
                        vehicle.status === 'Detenido' ? 'text-red-400' :
                        'text-emerald-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-white text-sm">V-{vehicle.id}</p>
                      <p className="text-slate-500 text-xs">{vehicle.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-300 text-sm">{vehicle.speed}</p>
                    <p className="text-slate-500 text-xs">{vehicle.cargo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manual Assignment Modal */}
      <ManualAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicles={vehicles}
      />
    </div>
  );
}