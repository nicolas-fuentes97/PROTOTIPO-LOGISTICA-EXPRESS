import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Truck, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Vehicle {
  id: number;
  status: string;
}

interface ManualAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
}

const pendingOrders = [
  { id: 'ORD-2401', address: 'Av. Principal 1234, Zona Norte', priority: 'Crítica', weight: 450 },
  { id: 'ORD-2402', address: 'Calle Secundaria 567, Centro', priority: 'Alta', weight: 320 },
  { id: 'ORD-2403', address: 'Boulevard Este 890, Zona Este', priority: 'Estándar', weight: 180 },
  { id: 'ORD-2404', address: 'Ruta Industrial 45, Polígono Sur', priority: 'Crítica', weight: 520 },
];

export default function ManualAssignmentModal({ isOpen, onClose, vehicles }: ManualAssignmentModalProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Ruta de Emergencia Aplicada', {
      description: `Vehículo ${selectedVehicle} asignado a orden ${selectedOrder}`,
    });

    setIsSubmitting(false);
    setSelectedVehicle('');
    setSelectedOrder('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border-b border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white">Asignación Manual de Ruta</h2>
                      <p className="text-slate-400 text-sm">Control de Excepción Operacional • LOGIXPRESS-19</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Warning Banner */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-400 text-sm">Modo de Control Manual Activo</p>
                    <p className="text-amber-200/70 text-xs mt-1">
                      Esta acción sobrescribe las asignaciones automáticas del motor de ruteo.
                    </p>
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="text-slate-300 text-sm mb-3 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-cyan-400" />
                    Seleccionar Vehículo
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  >
                    <option value="">-- Seleccione un vehículo --</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        Vehículo {vehicle.id} - {vehicle.status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Order Selection */}
                <div>
                  <label className="text-slate-300 text-sm mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-cyan-400" />
                    Seleccionar Orden Pendiente
                  </label>
                  <div className="space-y-3">
                    {pendingOrders.map((order) => (
                      <motion.label
                        key={order.id}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedOrder === order.id
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="order"
                          value={order.id}
                          checked={selectedOrder === order.id}
                          onChange={(e) => setSelectedOrder(e.target.value)}
                          className="mt-1"
                          required
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-white">{order.id}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              order.priority === 'Crítica' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              order.priority === 'Alta' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                              'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                            }`}>
                              {order.priority}
                            </span>
                          </div>
                          <p className="text-slate-400 text-sm mb-2">{order.address}</p>
                          <p className="text-slate-500 text-xs">Peso: {order.weight} kg</p>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Info Box */}
                {selectedVehicle && selectedOrder && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-400 text-sm">Asignación Lista para Aplicar</p>
                      <p className="text-emerald-200/70 text-xs mt-1">
                        Vehículo {selectedVehicle} será asignado a la orden {selectedOrder}
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>

              {/* Footer */}
              <div className="border-t border-slate-700 p-6 bg-slate-900/50 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!selectedVehicle || !selectedOrder || isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Aplicando...' : 'APLICAR RUTA DE EMERGENCIA'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
