import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertTriangle, Clock, TrendingUp, CheckCircle2, RotateCcw, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ControllerMessageProps {
  message: {
    priority: string;
    title: string;
    body: string;
    expectedResult: string;
    reason: string;
    confidence: number;
    computeTime: number;
    timestamp: Date;
  };
}

export function ControllerMessage({ message }: ControllerMessageProps) {
  const getPriorityStyles = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high priority':
        return {
          badge: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] border-0',
          card: 'border border-red-500/50 bg-gradient-to-br from-red-50/80 via-white/80 to-red-50/30 dark:from-red-950/40 dark:via-slate-900/80 dark:to-red-950/20 shadow-[0_0_30px_rgba(220,38,38,0.15)] backdrop-blur-xl',
          icon: 'text-red-500',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          shouldPulse: true
        };
      case 'medium priority':
        return {
          badge: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] border-0',
          card: 'border border-amber-500/50 bg-gradient-to-br from-amber-50/80 via-white/80 to-amber-50/30 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-amber-950/20 shadow-[0_0_30px_rgba(245,158,11,0.1)] backdrop-blur-xl',
          icon: 'text-amber-500',
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          shouldPulse: false
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border-0',
          card: 'border border-blue-500/50 bg-gradient-to-br from-blue-50/80 via-white/80 to-blue-50/30 dark:from-blue-950/40 dark:via-slate-900/80 dark:to-blue-950/20 shadow-[0_0_30px_rgba(37,99,235,0.1)] backdrop-blur-xl',
          icon: 'text-blue-500',
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          shouldPulse: false
        };
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-emerald-600 dark:text-emerald-400';
    if (confidence >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const styles = getPriorityStyles(message.priority);

  return (
    <Card className={`${styles.card} overflow-hidden transition-all duration-300 hover:shadow-2xl`}>
      <CardHeader className="pb-6 border-b border-white/20 dark:border-white/5 bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <motion.div 
              animate={styles.shouldPulse ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}} 
              transition={{ duration: 2, repeat: Infinity }}
              className={`p-3 ${styles.iconBg} rounded-xl shadow-lg border border-white/50 dark:border-white/10`}
            >
              <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
            </motion.div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Badge className={styles.badge}>
                  {message.priority}
                </Badge>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 backdrop-blur-sm">
                  AI Recommendation
                </Badge>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Generated at {message.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* Main Recommendation - Enhanced */}
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-6 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-inner">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            🚂 {message.title}
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
            {message.body}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expected Result */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-emerald-50/80 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/10 p-5 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg shadow-inner">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">Expected Impact</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400/90 leading-relaxed">{message.expectedResult}</p>
              </div>
            </div>
          </motion.div>

          {/* Reason */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/10 p-5 rounded-xl border border-blue-200/50 dark:border-blue-800/50 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg shadow-inner">
                <div className="h-5 w-5 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Analysis</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400/90 leading-relaxed">{message.reason}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="my-6 bg-slate-200/50 dark:bg-slate-700/50" />

        {/* Enhanced Metrics and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-sm">
              <div className="flex items-center space-x-2 mb-1">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">AI Confidence</span>
              </div>
              <div className={`text-3xl font-bold tracking-tight ${getConfidenceColor(message.confidence)}`}>
                {message.confidence}%
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-sm">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Compute Time</span>
              </div>
              <div className="text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
                {message.computeTime}<span className="text-lg text-slate-500">ms</span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Enhanced */}
          <div className="flex items-center space-x-3">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] border-0 px-8 transition-all duration-300"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Execute
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
              <RotateCcw className="h-5 w-5 mr-2" />
              Alternative
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:border-red-200 dark:hover:border-red-900/50">
              <X className="h-5 w-5 mr-2" />
              Override
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}