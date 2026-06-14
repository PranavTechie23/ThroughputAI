import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link, Outlet } from 'react-router-dom';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from './components/ui/menubar';
import { Button } from './components/ui/button';
import { ThemeToggle } from './components/ThemeToggle';
import { Toaster } from './components/ui/toaster';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, LayoutDashboard, BrainCircuit, Settings, LineChart, LogOut, Globe, Map, CalendarClock } from 'lucide-react';
import Login from './pages/Login';
import { ConfigurationPage } from './pages/Configuration';
import { AnalyticsPage } from './pages/Analytics';
import { DashboardHomePage } from './pages/DashboardHomePage';
import LandingPage from './pages/LandingPage';
import { NetworkMap } from './pages/NetworkMap';
import { Timetable } from './pages/Timetable';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslation } from './hooks/useTranslation';
import { useLocation } from 'react-router-dom';

// Type definitions
interface PredictionData {
  delay: {
    minutes: number;
    confidence: number;
    status: 'green' | 'warning' | 'danger';
  };
  conflict: {
    probability: number;
    risk: 'low' | 'medium' | 'high';
    confidence: number;
  };
  throughput: {
    target: number;
    current: number;
    trend: string;
  };
  aiRecommendations?: string[];
  optimizedSchedule?: any;
}

interface ControllerMessage {
  priority: string;
  title: string;
  body: string;
  expectedResult: string;
  reason: string;
  confidence: number;
  computeTime: number;
  timestamp: Date;
}

interface TrendsMessage {
  title: string;
  description: string;
}

interface DashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  predictionResult: PredictionData | null;
  handlePrediction: (result: any) => void;
  controllerMessage: ControllerMessage;
}

// Mock data for demonstration
const mockPredictionData: PredictionData = {
  delay: { minutes: 14, confidence: 95.2, status: 'warning' as const },
  conflict: { probability: 25, risk: 'medium' as const, confidence: 88.9 },
  throughput: { target: 100, current: 85, trend: '+7.2%' }
};

const mockControllerMessage: ControllerMessage = {
  priority: 'High Priority',
  title: 'Recommendation: Let other Train Pass',
  body: 'Delay is about 14 mins. Let other Train Pass if its arrival time falls before the departure time.',
  expectedResult: 'average network delay reduced by ~2.5 minutes; throughput ↑ 7.2%.',
  reason: 'Allowing the other train to pass now prevents a longer hold later and reduces cascading delays.',
  confidence: 95,
  computeTime: 280,
  timestamp: new Date()
};

const mockTrendsMessage: TrendsMessage = {
  title: "Operational Trends",
  description: "Analysis of recent operational data shows a positive trend in on-time arrivals. Further details and historical data are available in the analytics section."
};

function Dashboard({ onLogout, isDarkMode, toggleDarkMode, predictionResult, handlePrediction, controllerMessage }: DashboardProps) {
    const { t } = useTranslation();
    const location = useLocation();
    const [predictions, setPredictions] = useState<PredictionData>(mockPredictionData);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        if (predictionResult) {
            setPredictions(predictionResult);
        }
    }, [predictionResult]);

    // Simulate real-time updates
    useEffect(() => {
        if (predictionResult) return; // Don't simulate if we have a real prediction
        const interval = setInterval(() => {
            setPredictions(prev => ({
                delay: { 
                    ...prev.delay, 
                    minutes: Math.max(0, prev.delay.minutes + (Math.random() - 0.5) * 2), 
                    confidence: Math.max(70, Math.min(99, prev.delay.confidence + (Math.random() - 0.5) * 5)) 
                },
                conflict: { 
                    ...prev.conflict, 
                    probability: Math.max(0, Math.min(100, prev.conflict.probability + (Math.random() - 0.5) * 5)), 
                    confidence: Math.max(70, Math.min(99, prev.conflict.confidence + (Math.random() - 0.5) * 3)) 
                },
                throughput: { 
                    ...prev.throughput, 
                    current: Math.max(60, Math.min(100, prev.throughput.current + (Math.random() - 0.5) * 3))
                }
            }));
            setLastUpdated(new Date());
        }, 5000);
        return () => clearInterval(interval);
    }, [predictionResult]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-all duration-500 scroll-smooth"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/20 blur-[100px]"
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px]"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 mix-blend-overlay"></div>
            </div>

            <motion.header
                variants={itemVariants}
                className="relative z-50 border-b border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl shadow-sm"
            >
                <div className="container mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
                                    <Train className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                                        {t('railwayControlCenter')}
                                    </h1>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {t('aiPoweredDashboard')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-700">
                                {t('live')} • {lastUpdated.toLocaleTimeString()}
                            </div>

                            <Button onClick={onLogout} variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full px-4">
                                <LogOut className="w-4 h-4 mr-2" />
                                {t('logout')}
                            </Button>
                            <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <nav className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-200/50 dark:border-white/10 shadow-inner">
                            {[
                                { path: '/dashboard/home', label: t('home'), icon: LayoutDashboard },
                                { path: '/dashboard/map', label: 'Live Map', icon: Map },
                                { path: '/dashboard/timetable', label: 'Timetable', icon: CalendarClock },
                                { path: '/dashboard/configuration', label: 'Simulation', icon: BrainCircuit },
                                { path: '/dashboard/analytics', label: t('analytics'), icon: LineChart }
                            ].map((item) => {
                                const isActive = location.pathname.includes(item.path);
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 z-10 flex items-center space-x-2 ${
                                            isActive 
                                              ? 'text-white shadow-md' 
                                              : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-white/5'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-nav-pill"
                                                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full -z-10 shadow-lg shadow-indigo-500/40"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                    </div>
                </div>
            </motion.header>
            <motion.div
                variants={containerVariants}
                className="container mx-auto px-6 py-8 space-y-8 relative z-10"
            >
                <Outlet context={{ predictions, controllerMessage, mockTrendsMessage, itemVariants, handlePrediction }} />
            </motion.div>
            <Toaster />
        </motion.div>
    );
}

function AppContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });
    const navigate = useNavigate();
    const [predictionResult, setPredictionResult] = useState<PredictionData | null>(null);
    const [controllerMessage, setControllerMessage] = useState<ControllerMessage>(mockControllerMessage);

    const handlePrediction = (result: PredictionData) => {
        setPredictionResult(result);

        if (result.aiRecommendations && result.aiRecommendations.length > 0) {
            const newControllerMessage: ControllerMessage = {
                priority: 'High Priority',
                title: 'AI Scheduler Recommendation',
                body: result.aiRecommendations.join('\n'),
                expectedResult: `Reduce average network delay by ~${result.delay.minutes.toFixed(1)} minutes; throughput optimization ${result.throughput.trend}`,
                reason: `ML model analysis indicates ${result.conflict.probability.toFixed(1)}% conflict probability. Optimized scheduling reduces cascading delays and improves network efficiency.`,
                timestamp: new Date(),
                confidence: result.delay.confidence,
                computeTime: Math.floor(Math.random() * 500) + 200,
            };
            setControllerMessage(newControllerMessage);
        } else {
            // Fallback message when no specific recommendations are available
            const newControllerMessage: ControllerMessage = {
                priority: result.delay.minutes > 10 ? 'High Priority' : 'Medium Priority',
                title: 'Train Operations Analysis Complete',
                body: `Predicted delay: ${result.delay.minutes.toFixed(1)} minutes\nConflict probability: ${result.conflict.probability.toFixed(1)}%\nThroughput: ${result.throughput.current.toFixed(1)}%`,
                expectedResult: `Current operations forecast shows ${result.throughput.trend} throughput trend with ${result.conflict.risk} risk level`,
                reason: `ML analysis of current train parameters indicates ${result.delay.status} operational status with ${result.delay.confidence}% confidence`,
                timestamp: new Date(),
                confidence: result.delay.confidence,
                computeTime: Math.floor(Math.random() * 500) + 200,
            };
            setControllerMessage(newControllerMessage);
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate('/dashboard/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        // Don't automatically redirect - let users see the landing page first
        // Only redirect if they're trying to access protected routes while not logged in
    }, [isLoggedIn, navigate]);

    return (
        <Routes>
            <Route path="/" element={!isLoggedIn ? <LandingPage /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} predictionResult={predictionResult} handlePrediction={handlePrediction} controllerMessage={controllerMessage} /> : <Navigate to="/" />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<DashboardHomePage />} />
                <Route path="map" element={<NetworkMap />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="configuration" element={<ConfigurationPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                {/* System Status route removed */}
                {/* Removed Trends and Achievements routes */}
                {/* Removed Controller Records route */}
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}


export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}