import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Clock, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface PredictionDashboardProps {
  predictions?: PredictionData | null;
}

export function PredictionDashboard({ predictions }: PredictionDashboardProps) {
  // Default values for when predictions are null or undefined
  const defaultPredictions: PredictionData = {
    delay: {
      minutes: 0,
      confidence: 0,
      status: 'green'
    },
    conflict: {
      probability: 0,
      risk: 'low',
      confidence: 0
    },
    throughput: {
      target: 100,
      current: 0,
      trend: '+0.0%'
    },
    aiRecommendations: [],
    optimizedSchedule: null
  };

  const data = predictions || defaultPredictions;
  const hasData = predictions !== null && predictions !== undefined;
  const getDelayColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'warning':
        return 'text-amber-600 dark:text-amber-400';
      case 'danger':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-500';
    }
  };

  const getDelayStyles = (status: string) => {
    switch (status) {
      case 'green':
        return {
          card: 'bg-gradient-to-br from-emerald-50/80 via-white/80 to-emerald-50/30 dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/50 shadow-lg backdrop-blur-xl',
          icon: 'text-emerald-600 dark:text-emerald-400',
          progress: 'bg-emerald-500'
        };
      case 'warning':
        return {
          card: 'bg-gradient-to-br from-amber-50/80 via-white/80 to-amber-50/30 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-amber-950/20 border-amber-200/50 dark:border-amber-800/50 shadow-lg backdrop-blur-xl',
          icon: 'text-amber-600 dark:text-amber-400',
          progress: 'bg-amber-500'
        };
      case 'danger':
        return {
          card: 'bg-gradient-to-br from-red-50/80 via-white/80 to-red-50/30 dark:from-red-950/40 dark:via-slate-900/80 dark:to-red-950/20 border-red-200/50 dark:border-red-800/50 shadow-lg backdrop-blur-xl',
          icon: 'text-red-600 dark:text-red-400',
          progress: 'bg-red-500'
        };
      default:
        return {
          card: 'bg-white/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl',
          icon: 'text-slate-500',
          progress: 'bg-slate-500'
        };
    }
  };

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white';
      case 'medium':
        return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white';
      case 'high':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white';
    }
  };

  const getThroughputProgress = () => {
    return (data.throughput.current / data.throughput.target) * 100;
  };

  const delayStyles = getDelayStyles(data.delay.status);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Live Predictions</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {hasData ? 'Real-time AI analysis and forecasting' : 'Submit input data to see predictions'}
          </p>
        </div>
      </motion.div>

      {!hasData && (
        <div className="text-center py-12 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/5 shadow-inner">
          <div className="text-slate-500 dark:text-slate-400 text-lg mb-2 font-medium">
            No predictions available
          </div>
          <div className="text-slate-400 dark:text-slate-500 text-sm">
            Use the input panel to generate ML predictions
          </div>
        </div>
      )}
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >{hasData && (
        <>
        {/* Enhanced Delay Prediction */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Card className={`${delayStyles.card} overflow-hidden transition-all duration-300 hover:shadow-2xl`}>
          <CardHeader className="pb-4 border-b border-white/20 dark:border-white/5 bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-white/80 dark:bg-slate-700/80 rounded-lg">
                <Clock className={`h-5 w-5 ${delayStyles.icon}`} />
              </div>
              <div>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Delay Forecast</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">Network-wide analysis</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${getDelayColor(data.delay.status)}`}>
                {data.delay.minutes.toFixed(1)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">minutes average delay</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Confidence Level</span>
                <Badge variant="outline" className="bg-white/80 dark:bg-slate-700/80 font-semibold">
                  {data.delay.confidence}%
                </Badge>
              </div>
              
              <div className="relative">
                <Progress value={data.delay.confidence} className="h-3" />
              </div>
              
              <div className="text-center pt-2">
                <Badge 
                  className={
                    data.delay.status === 'green' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0' :
                    data.delay.status === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0' : 
                    'bg-gradient-to-r from-red-500 to-red-600 text-white border-0'
                  }
                >
                  {data.delay.status === 'green' ? '✓ On Schedule' :
                   data.delay.status === 'warning' ? '⚠ Minor Delays' : '⚠ Major Delays'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Enhanced Conflict Detection */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Card className="bg-gradient-to-br from-orange-50/80 via-white/80 to-amber-50/30 dark:from-orange-950/40 dark:via-slate-900/80 dark:to-amber-950/20 border-orange-200/50 dark:border-orange-800/50 shadow-lg backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="pb-4 border-b border-white/20 dark:border-white/5 bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-white/80 dark:bg-slate-700/80 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Conflict Analysis</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">Junction monitoring</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                {data.conflict.probability.toFixed(0)}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">conflict probability</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Risk Assessment</span>
                <Badge className={`${getRiskStyles(data.conflict.risk)} border-0 font-semibold`}>
                  {data.conflict.risk.toUpperCase()} RISK
                </Badge>
              </div>
              
              <div className="relative">
                <Progress value={data.conflict.probability} className="h-3" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Model Confidence</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{data.conflict.confidence}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Enhanced Throughput Target */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Card className="bg-gradient-to-br from-blue-50/80 via-white/80 to-indigo-50/30 dark:from-blue-950/40 dark:via-slate-900/80 dark:to-indigo-950/20 border-blue-200/50 dark:border-blue-800/50 shadow-lg backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="pb-4 border-b border-white/20 dark:border-white/5 bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-white/80 dark:bg-slate-700/80 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Throughput</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">Network efficiency</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {data.throughput.current.toFixed(0)}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                of {data.throughput.target}% target capacity
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <Progress value={getThroughputProgress()} className="h-3" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">24h Trend</span>
                <Badge 
                  className={
                    data.throughput.trend.startsWith('+') 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0' 
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white border-0'
                  }
                >
                  {data.throughput.trend}
                </Badge>
              </div>
              
              <div className="text-center pt-2">
                <div className="text-sm font-semibold">
                  <span className={
                    getThroughputProgress() >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                    getThroughputProgress() >= 75 ? 'text-blue-600 dark:text-blue-400' :
                    getThroughputProgress() >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                  }>
                    {getThroughputProgress() >= 90 ? '🟢 Optimal' : 
                     getThroughputProgress() >= 75 ? '🔵 Good' : 
                     getThroughputProgress() >= 60 ? '🟡 Fair' : '🔴 Below Target'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>
        </>
      )}
      </motion.div>
    </div>
  );
}