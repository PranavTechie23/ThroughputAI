import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Lock, Mail, Loader2, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  
  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === 'user' && trimmedPassword === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Use user/password');
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Auto login after mock registration
    localStorage.setItem('isLoggedIn', 'true');
    onLoginSuccess();
  };

  const autofillFix = "[&:-webkit-autofill]:transition-colors [&:-webkit-autofill]:duration-[9999s] [&:-webkit-autofill]:text-white";

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left side - Beautiful Photo */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2168&auto=format&fit=crop" 
          alt="Modern Railway" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-20"></div>
        
        <div className="relative z-30 flex flex-col justify-end p-16 h-full w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Intelligence for <br/><span className="text-indigo-400">Modern Railways</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-md">
              Advanced ML-powered scheduling, delay predictions, and real-time operations control center.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Animated Background Elements for Right Side */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 lg:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white tracking-tight">ThroughputAI</h2>
              <p className="text-slate-400 mt-2 text-sm">
                {view === 'login' ? 'Sign in to access the control center' : 'Create an account to access the control center'}
              </p>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: view === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: view === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {view === 'login' && (
                    <div className="mt-0 outline-none">
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Username</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                            <User size={18} />
                          </div>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${autofillFix}`}
                            placeholder="Enter your username"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Password</label>
                          <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                        </div>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                            <Lock size={18} />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${autofillFix}`}
                            placeholder="••••••••"
                            required
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-indigo-300 transition-colors focus:outline-none"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                          <ShieldCheck size={16} className="text-red-400" />
                          {error}
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all duration-300 group"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <span className="flex items-center gap-2">
                            Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>
                    </form>
                      <div className="mt-6 text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <button type="button" onClick={() => setView('register')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                          Sign up
                        </button>
                      </div>
                    </div>
                  )}

                  {view === 'register' && (
                    <div className="mt-0 outline-none">
                    <form onSubmit={handleRegister} className="space-y-5">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Email</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                            <Mail size={18} />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${autofillFix}`}
                            placeholder="name@railway.gov.in"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Username</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                            <User size={18} />
                          </div>
                          <input
                            type="text"
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${autofillFix}`}
                            placeholder="Choose a username"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Password</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                            <Lock size={18} />
                          </div>
                          <input
                            type={showRegisterPassword ? "text" : "password"}
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className={`w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${autofillFix}`}
                            placeholder="Create a password"
                            required
                          />
                          <button 
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-indigo-300 transition-colors focus:outline-none"
                          >
                            {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all duration-300 group"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <span className="flex items-center gap-2">
                            Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>
                    </form>
                      <div className="mt-6 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <button type="button" onClick={() => setView('login')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                          Sign in
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
          </div>
          
          <div className="mt-8 text-center text-slate-500 text-xs">
            &copy; 2026 Ministry of Railways. All rights reserved.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
