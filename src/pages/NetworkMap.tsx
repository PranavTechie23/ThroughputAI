import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Train, Navigation, Activity, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock active trains data
const mockActiveTrains = [
  { id: 'T-101', type: 'Express', section: 'SEC_04', status: 'Optimal', delay: 0 },
  { id: 'T-204', type: 'Freight', section: 'SEC_12', status: 'Congested', delay: 14 },
  { id: 'T-309', type: 'Passenger', section: 'SEC_08', status: 'Moderate', delay: 3 },
  { id: 'T-412', type: 'High-Speed', section: 'SEC_21', status: 'Optimal', delay: 0 },
  { id: 'T-501', type: 'Express', section: 'SEC_15', status: 'Moderate', delay: 5 },
];

export function NetworkMap() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-lg">
          <Map className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Live Network Map</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Real-time topology and train tracking</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map Visualization */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden h-[600px] relative">
            <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5 relative z-10">
              <CardTitle className="text-base flex items-center space-x-2 text-slate-800 dark:text-slate-100">
                <Navigation className="h-4 w-4 text-indigo-500" />
                <span>Topology Visualization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
              {/* Decorative grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              {/* Abstract Map Nodes */}
              <div className="relative w-full h-full p-12">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  {/* Static connections */}
                  <path d="M 100 150 Q 250 50 400 150 T 700 200" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 100 350 Q 300 450 500 350 T 800 250" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 400 150 L 500 350" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

                {/* Nodes rendering */}
                {[
                  { id: 1, label: 'SEC_04', x: '10%', y: '20%', status: 'optimal' },
                  { id: 2, label: 'SEC_08', x: '45%', y: '15%', status: 'moderate' },
                  { id: 3, label: 'SEC_12', x: '80%', y: '25%', status: 'congested' },
                  { id: 4, label: 'SEC_15', x: '15%', y: '60%', status: 'optimal' },
                  { id: 5, label: 'SEC_21', x: '55%', y: '70%', status: 'optimal' },
                  { id: 6, label: 'SEC_24', x: '85%', y: '50%', status: 'optimal' },
                ].map((node) => {
                  const isCongested = node.status === 'congested';
                  const isModerate = node.status === 'moderate';
                  const glowColor = isCongested ? 'rgba(239,68,68,0.5)' : isModerate ? 'rgba(245,158,11,0.5)' : 'rgba(16,185,129,0.5)';
                  const bgColor = isCongested ? 'bg-red-500' : isModerate ? 'bg-amber-500' : 'bg-emerald-500';

                  return (
                    <motion.div
                      key={node.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                      style={{ left: node.x, top: node.y }}
                      whileHover={{ scale: 1.2 }}
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      <div className="relative">
                        {/* Outer pulse ring */}
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className={`absolute inset-0 rounded-full ${bgColor} opacity-20 blur-md`}
                          style={{ boxShadow: `0 0 20px ${glowColor}` }}
                        />
                        {/* Inner solid node */}
                        <div className={`w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 ${bgColor} shadow-lg relative z-10 flex items-center justify-center`}>
                          {isCongested && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                        </div>
                        {/* Label */}
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md text-xs font-bold border border-slate-200 dark:border-slate-700 transition-opacity ${activeNode === node.id ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
                          {node.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Train representation (moving dot) */}
                <motion.div
                  className="absolute w-4 h-4 bg-indigo-500 border-2 border-white rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)] z-20"
                  animate={{ 
                    left: ['10%', '45%', '80%'], 
                    top: ['20%', '15%', '25%'] 
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Trains Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden h-[600px] flex flex-col">
            <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5 shrink-0">
              <CardTitle className="text-base flex items-center space-x-2 text-slate-800 dark:text-slate-100">
                <Train className="h-4 w-4 text-indigo-500" />
                <span>Active Trains</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
              {mockActiveTrains.map((train, i) => (
                <motion.div 
                  key={train.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      {train.id}
                      <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {train.type}
                      </span>
                    </div>
                    {train.delay > 0 ? (
                      <Badge variant="destructive" className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-500/20">
                        <AlertTriangle className="w-3 h-3" /> +{train.delay}m
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-500/20">
                        On Time
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      Section {train.section}
                    </div>
                    <div className={`text-xs font-medium ${train.status === 'Congested' ? 'text-red-500' : train.status === 'Moderate' ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {train.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
