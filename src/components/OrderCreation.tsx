import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, MapPin, Weight, Box, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function OrderCreation() {
  const [formData, setFormData] = useState({
    address: '',
    weight: '',
    volume: '',
    priority: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate validation and processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowSuccess(true);
    toast.success('Datos de Carga Validados', {
      description: '✅ Datos disponibles para Motor de Ruteo',
    });

    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ address: '', weight: '', volume: '', priority: '' });
      setShowSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white mb-2">Registro de Nuevas Órdenes</h1>
        <p className="text-slate-400">Sistema de Validación de Carga</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Form */}
        <div className="col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white">Datos Críticos de Pedido</h2>
                <p className="text-slate-400 text-sm">Ingrese la información de carga</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address */}
              <div>
                <label htmlFor="address" className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Dirección de Entrega
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese la dirección completa"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              {/* Weight and Volume */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                    <Weight className="w-4 h-4 text-cyan-400" />
                    Peso de la Carga (KG)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="volume" className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                    <Box className="w-4 h-4 text-cyan-400" />
                    Volumen de la Carga (m³)
                  </label>
                  <input
                    type="number"
                    id="volume"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-cyan-400" />
                  Prioridad de Entrega
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                >
                  <option value="">-- Seleccione una prioridad --</option>
                  <option value="critical">Crítica</option>
                  <option value="high">Alta</option>
                  <option value="standard">Estándar</option>
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Validando Datos...' : 'GUARDAR Y VALIDAR DATOS'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/50 rounded-xl p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-emerald-400 mb-1">Validación Exitosa</h3>
                  <p className="text-emerald-200/70 text-sm">
                    ✅ Datos de Carga Validados y Disponibles para Motor de Ruteo
                  </p>
                </div>
              </div>
              <div className="bg-emerald-500/10 rounded-lg p-3 space-y-1">
                <p className="text-emerald-300 text-xs">Pedido procesado correctamente</p>
                <p className="text-emerald-200/60 text-xs">Sistema preparado para optimización</p>
              </div>
            </motion.div>
          )}

          {/* Validation Info */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white mb-4">Validación de Datos</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-slate-300 text-sm">Verificación de Integridad</p>
                  <p className="text-slate-500 text-xs mt-1">Todos los campos son obligatorios</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-slate-300 text-sm">Validación de Capacidad</p>
                  <p className="text-slate-500 text-xs mt-1">Peso y volumen son validados</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-slate-300 text-sm">Priorización Automática</p>
                  <p className="text-slate-500 text-xs mt-1">El sistema asigna recursos según prioridad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white mb-4">Estadísticas del Día</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Órdenes Procesadas</span>
                  <span className="text-cyan-400">24</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Carga Total</span>
                  <span className="text-cyan-400">3.2 Ton</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}