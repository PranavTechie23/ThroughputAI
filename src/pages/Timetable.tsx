import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, ArrowUpRight, ArrowDownRight, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const mockTimetableData = [
  { id: 'T-101', name: 'Rajdhani Express', type: 'Express', priority: 'High', scheduled: '09:00', predicted: '09:00', delay: 0, status: 'On Time' },
  { id: 'T-204', name: 'Freight Coromandel', type: 'Freight', priority: 'Low', scheduled: '09:15', predicted: '09:29', delay: 14, status: 'Delayed' },
  { id: 'T-309', name: 'Intercity Fast', type: 'Passenger', priority: 'Medium', scheduled: '09:30', predicted: '09:33', delay: 3, status: 'Minor Delay' },
  { id: 'T-412', name: 'Vande Bharat', type: 'High-Speed', priority: 'High', scheduled: '09:45', predicted: '09:45', delay: 0, status: 'On Time' },
  { id: 'T-501', name: 'Duronto Express', type: 'Express', priority: 'High', scheduled: '10:00', predicted: '10:05', delay: 5, status: 'Minor Delay' },
  { id: 'T-602', name: 'Local Fast', type: 'Local', priority: 'Low', scheduled: '10:15', predicted: '10:15', delay: 0, status: 'On Time' },
  { id: 'T-705', name: 'Coal Freight', type: 'Freight', priority: 'Low', scheduled: '10:30', predicted: '11:10', delay: 40, status: 'Severely Delayed' },
];

export function Timetable() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = mockTimetableData.filter(train => 
    train.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    train.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'High': return <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50">High</Badge>;
      case 'Medium': return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50">Medium</Badge>;
      case 'Low': return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50">Low</Badge>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string, delay: number) => {
    if (delay === 0) {
      return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50">On Time</Badge>;
    } else if (delay <= 10) {
      return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50">+{delay}m Delay</Badge>;
    } else {
      return <Badge variant="destructive" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> +{delay}m Delay</Badge>;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <CalendarClock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">AI-Optimized Timetable</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">View predicted arrival and departure schedules</p>
          </div>
        </div>
        
        <div className="w-72">
          <Input 
            placeholder="Search train ID or name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-700/50 focus:ring-indigo-500 rounded-full px-4"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase font-semibold text-xs border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Train ID & Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Scheduled</th>
                    <th className="px-6 py-4">AI Predicted</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {filteredData.map((train, index) => (
                    <motion.tr 
                      key={train.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-default"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-100">{train.id}</div>
                        <div className="text-xs text-slate-500">{train.name}</div>
                      </td>
                      <td className="px-6 py-4">{train.type}</td>
                      <td className="px-6 py-4">{getPriorityBadge(train.priority)}</td>
                      <td className="px-6 py-4 font-mono text-slate-500">{train.scheduled}</td>
                      <td className="px-6 py-4 font-mono font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        {train.predicted}
                        {train.delay > 0 && <ArrowUpRight className="w-3 h-3 text-red-500" />}
                        {train.delay === 0 && <Clock className="w-3 h-3 text-emerald-500" />}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(train.status, train.delay)}
                      </td>
                    </motion.tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No trains found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
