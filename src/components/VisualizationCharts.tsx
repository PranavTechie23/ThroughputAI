import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
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
}

interface VisualizationChartsProps {
  predictions: PredictionData;
}

export function VisualizationCharts({ predictions }: VisualizationChartsProps) {
  // Mock historical data for charts
  const delayTrendData = [
    { time: '08:00', delay: 5.2, predicted: 5.5 },
    { time: '09:00', delay: 7.8, predicted: 8.1 },
    { time: '10:00', delay: 12.3, predicted: 11.8 },
    { time: '11:00', delay: 9.1, predicted: 9.5 },
    { time: '12:00', delay: 15.6, predicted: 14.9 },
    { time: '13:00', delay: 11.2, predicted: 12.5 },
    { time: '14:00', delay: predictions.delay.minutes, predicted: predictions.delay.minutes }
  ];

  const conflictBySection = [
    { section: 'A1', conflicts: 12, capacity: 50 },
    { section: 'A2', conflicts: 8, capacity: 40 },
    { section: 'A3', conflicts: 15, capacity: 45 },
    { section: 'B1', conflicts: 6, capacity: 35 },
    { section: 'B2', conflicts: 22, capacity: 60 },
    { section: 'C1', conflicts: 4, capacity: 25 },
    { section: 'C2', conflicts: 9, capacity: 30 }
  ];

  const trainTypeDistribution = [
    { name: 'Express', value: 35, color: '#8884d8' },
    { name: 'Local', value: 28, color: '#82ca9d' },
    { name: 'Freight', value: 20, color: '#ffc658' },
    { name: 'High-Speed', value: 10, color: '#ff7300' },
    { name: 'Suburban', value: 7, color: '#8dd1e1' }
  ];

  const throughputData = [
    { hour: '06', throughput: 65 },
    { hour: '07', throughput: 78 },
    { hour: '08', throughput: 85 },
    { hour: '09', throughput: 82 },
    { hour: '10', throughput: 79 },
    { hour: '11', throughput: 88 },
    { hour: '12', throughput: 91 },
    { hour: '13', throughput: 87 },
    { hour: '14', throughput: predictions.throughput.current }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Analytics & Visualization</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Deep dive into network performance metrics</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delay Trend Chart */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
          <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5">
            <CardTitle className="text-base flex items-center space-x-3 text-slate-800 dark:text-slate-100">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg shadow-inner">
                <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="font-semibold">Delay Trends (Last 7 Hours)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={delayTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', color: '#fff', borderRadius: 8, border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value, name) => [
                    `${value} min`, 
                    name === 'delay' ? 'Actual' : 'Predicted'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="delay" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  name="delay"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#22d3ee" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        </motion.div>

        {/* Throughput Performance */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
          <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5">
            <CardTitle className="text-base flex items-center space-x-3 text-slate-800 dark:text-slate-100">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg shadow-inner">
                <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="font-semibold">Hourly Throughput (%)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#1e293b', color: '#fff', borderRadius: 8, border: 'none' }} itemStyle={{ color: '#fff' }} formatter={(value) => [`${value}%`, 'Throughput']} />
                <Bar 
                  dataKey="throughput" 
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        </motion.div>

        {/* Section-wise Conflicts */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
          <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5">
            <CardTitle className="text-base flex items-center space-x-3 text-slate-800 dark:text-slate-100">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg shadow-inner">
                <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="font-semibold">Conflicts by Section</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={conflictBySection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis dataKey="section" stroke="#64748b" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#1e293b', color: '#fff', borderRadius: 8, border: 'none' }} itemStyle={{ color: '#fff' }} />
                <Bar dataKey="conflicts" fill="#f59e42" name="Conflicts" />
                <Bar dataKey="capacity" fill="#22d3ee" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        </motion.div>

        {/* Train Type Distribution */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
          <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5">
            <CardTitle className="text-base flex items-center space-x-3 text-slate-800 dark:text-slate-100">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg shadow-inner">
                <PieChartIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="font-semibold">Train Type Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trainTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#6366f1"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {trainTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', color: '#fff', borderRadius: 8, border: 'none' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        </motion.div>
      </div>

      {/* Real-time Heatmap Simulation */}
      <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
      <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5">
          <CardTitle className="text-base flex items-center space-x-3 text-slate-800 dark:text-slate-100">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/50 rounded-lg shadow-inner">
              <Activity className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </div>
            <span className="font-semibold">Network Status Heatmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-7 gap-3 h-32">
            {Array.from({ length: 49 }, (_, i) => {
              const intensity = Math.random();
              const getColor = () => {
                if (intensity < 0.3) return 'from-emerald-400/50 to-emerald-500/80 dark:from-emerald-500/40 dark:to-emerald-600/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                if (intensity < 0.6) return 'from-amber-400/50 to-amber-500/80 dark:from-amber-500/40 dark:to-amber-600/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]';
                return 'from-red-400/50 to-red-500/80 dark:from-red-500/40 dark:to-red-600/60 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
              };
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  key={i}
                  className={`rounded-md bg-gradient-to-br transition-all duration-500 hover:scale-110 ${getColor()}`}
                  title={`Section ${Math.floor(i / 7) + 1}-${(i % 7) + 1}: ${(intensity * 100).toFixed(0)}% load`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-6 text-xs font-medium text-slate-500 dark:text-slate-400 px-2">
            <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span>Optimal</span></div>
            <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span>Moderate</span></div>
            <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Congested</span></div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </motion.div>
  );
}