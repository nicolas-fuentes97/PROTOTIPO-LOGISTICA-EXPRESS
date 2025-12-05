import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Shield, Truck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-cyan-500/50 relative overflow-hidden"
          >
            {/* Speed lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute left-2 w-8 h-0.5 bg-white/30 rounded-full"></div>
              <div className="absolute left-1 w-6 h-0.5 bg-white/20 rounded-full translate-y-2"></div>
              <div className="absolute left-1 w-6 h-0.5 bg-white/20 rounded-full -translate-y-2"></div>
            </div>
            <Truck className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <h1 className="text-cyan-400 mb-2">LOGÍSTICA EXPRESS</h1>
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Validación de Acceso y Roles de Seguridad
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-white mb-6">Portal de Acceso</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                emailFocused ? 'text-cyan-400' : 'text-slate-500'
              }`}>
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all peer"
                placeholder="Correo Electrónico"
                id="email"
              />
              <label
                htmlFor="email"
                className={`absolute left-12 transition-all pointer-events-none ${
                  email || emailFocused
                    ? '-top-2.5 text-xs bg-slate-900 px-2 text-cyan-400'
                    : 'top-1/2 -translate-y-1/2 text-slate-400'
                }`}
              >
                Correo Electrónico
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                passwordFocused ? 'text-cyan-400' : 'text-slate-500'
              }`}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all peer"
                placeholder="Contraseña"
                id="password"
              />
              <label
                htmlFor="password"
                className={`absolute left-12 transition-all pointer-events-none ${
                  password || passwordFocused
                    ? '-top-2.5 text-xs bg-slate-900 px-2 text-cyan-400'
                    : 'top-1/2 -translate-y-1/2 text-slate-400'
                }`}
              >
                Contraseña
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
            >
              ACCEDER AL SISTEMA
            </motion.button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-500 text-sm text-center">
              Sistema de Gestión Logística Avanzada
            </p>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-slate-600 text-xs flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Protegido con Cifrado de Nivel Empresarial
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}