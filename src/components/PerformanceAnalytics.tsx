import { motion } from 'motion/react';
import { Activity, Zap, TrendingUp, CheckCircle, BarChart3, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const efficiencyData = [
  { name: 'Optimizado', value: 15, color: '#06b6d4' },
  { name: 'Estándar', value: 85, color: '#1e293b' },
];

const performanceData = [
  { name: 'Lun', tiempo: 24 },
  { name: 'Mar', tiempo: 26 },
  { name: 'Mié', tiempo: 23 },
  { name: 'Jue', tiempo: 27 },
  { name: 'Vie', tiempo: 25 },
  { name: 'Sáb', tiempo: 28 },
  { name: 'Dom', tiempo: 22 },
];

const processedOrdersData = [
  { hour: '08:00', orders: 12 },
  { hour: '10:00', orders: 18 },
  { hour: '12:00', orders: 24 },
  { hour: '14:00', orders: 20 },
  { hour: '16:00', orders: 16 },
  { hour: '18:00', orders: 8 },
];

export default function PerformanceAnalytics() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white mb-2">Análisis de Eficiencia del Motor de Ruteo</h1>
        <p className="text-slate-400">Monitoreo de Rendimiento</p>
      </div>

      {/* Main KPI - Performance Metric */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border-2 border-cyan-500/50 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Métrica Crítica de Rendimiento (RNF)</p>
                <h2 className="text-cyan-400">T. Promedio de Cálculo</h2>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <span className="text-white text-7xl">27</span>
              </motion.div>
              <div>
                <p className="text-slate-400 text-2xl">Segundos</p>
                <p className="text-emerald-400 text-sm mt-1 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Cumplimiento Óptimo de Requisito No Funcional (&lt; 30s)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Mejor Tiempo</p>
                <p className="text-emerald-400 text-xl">22s</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Tiempo Máx</p>
                <p className="text-amber-400 text-xl">28s</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Desviación</p>
                <p className="text-cyan-400 text-xl">±2.1s</p>
              </div>
            </div>
          </div>

          <div className="w-64 h-64 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 60 }}
              className="relative w-48 h-48"
            >
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-slate-800"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(27 / 30) * 502.4} 502.4`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-3xl">90%</p>
                  <p className="text-slate-400 text-xs">Eficiencia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-3 gap-6">
        {/* Efficiency Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white mb-1">Eficiencia del Algoritmo</h3>
              <p className="text-slate-400 text-sm">Optimización de Distancia</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="flex items-center justify-center h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={efficiencyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {efficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center mt-4">
            <p className="text-cyan-400 text-3xl">15%</p>
            <p className="text-slate-400 text-sm">Ahorro de Distancia Estimada</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded"></div>
              <span className="text-slate-400">Optimizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-700 rounded"></div>
              <span className="text-slate-400">Estándar</span>
            </div>
          </div>
        </motion.div>

        {/* Processed Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white mb-1">Carga Procesada</h3>
              <p className="text-slate-400 text-sm">Pedidos por Hora</p>
            </div>
            <BarChart3 className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedOrdersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="orders" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center mt-4">
            <p className="text-cyan-400 text-3xl">98</p>
            <p className="text-slate-400 text-sm">Pedidos Procesados Hoy</p>
          </div>
        </motion.div>

        {/* Weekly Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white mb-1">Rendimiento Semanal</h3>
              <p className="text-slate-400 text-sm">Tiempo de Cálculo</p>
            </div>
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[20, 30]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tiempo"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center mt-4">
            <p className="text-cyan-400 text-3xl">25.0s</p>
            <p className="text-slate-400 text-sm">Promedio Semanal</p>
          </div>
        </motion.div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Tasa de Éxito</p>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-white text-2xl">99.7%</p>
          <p className="text-emerald-400 text-xs mt-1">↑ 0.3% vs. semana anterior</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Rutas Calculadas</p>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-white text-2xl">1,247</p>
          <p className="text-cyan-400 text-xs mt-1">En las últimas 24h</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Uptime Sistema</p>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-white text-2xl">99.9%</p>
          <p className="text-slate-400 text-xs mt-1">30 días</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Carga CPU</p>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-white text-2xl">34%</p>
          <p className="text-emerald-400 text-xs mt-1">Recursos óptimos</p>
        </motion.div>
      </div>

      {/* Compliance Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-white mb-1">Certificación de Cumplimiento RNF</h3>
              <p className="text-slate-400 text-sm">
                El Motor de Ruteo opera consistentemente dentro de los parámetros de calidad definidos. 
                Tiempo de respuesta promedio: <span className="text-emerald-400">27s</span> • 
                Objetivo: <span className="text-cyan-400">&lt; 30s</span>
              </p>
            </div>
          </div>
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-6 py-3">
            <p className="text-emerald-400 text-sm">Estado: <span className="font-bold">ÓPTIMO</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}