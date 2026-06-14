import { useState, ChangeEvent, FormEvent } from 'react';

interface PredictionResult {
    predicted_delay: number;
    predicted_conflict: number;
    predicted_throughput: number;
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { BrainCircuit, Train, Clock, MapPin, AlertCircle, Signal, CheckCircle2, ArrowRight } from 'lucide-react';

const Prediction = () => {
    const [formData, setFormData] = useState({
        trainType: 'Express',
        sectionId: 'SEC_12',
        priority: 'High',
        scheduledArrival: '09:05',
        scheduledDeparture: '09:07',
        trackCapacity: 4,
        hour: 9,
        signalStatus: 'Green',
        platformAvailable: false
    });

    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelectChange = (name: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const response = await fetch('http://localhost:3001/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Prediction request failed');
            }

            const result = await response.json();
            const parsed = result.prediction || result;
            setPrediction(parsed as PredictionResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                    <BrainCircuit className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">AI Scheduling Prediction</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Generate real-time delay and conflict predictions</p>
                </div>
            </div>

            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-2xl overflow-hidden transition-all duration-300 relative z-10">
                <CardHeader className="bg-gradient-to-r from-transparent to-white/20 dark:to-slate-800/20 border-b border-white/20 dark:border-white/5 pb-6">
                    <CardTitle className="text-lg flex items-center space-x-2 text-slate-800 dark:text-slate-100">
                        <Train className="h-5 w-5 text-indigo-500" />
                        <span>Input Parameters</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="trainType" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1">Train Type</Label>
                                <Select name="trainType" value={formData.trainType} onValueChange={(value) => handleSelectChange('trainType', value)}>
                                    <SelectTrigger className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all">
                                        <SelectValue placeholder="Select Train Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Express">Express</SelectItem>
                                        <SelectItem value="Passenger">Passenger</SelectItem>
                                        <SelectItem value="Freight">Freight</SelectItem>
                                    </SelectContent>
                                </Select>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="sectionId" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Section ID</Label>
                                <Input id="sectionId" name="sectionId" value={formData.sectionId} onChange={handleChange} className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="priority" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Priority</Label>
                                <Select name="priority" value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
                                    <SelectTrigger className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all">
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="scheduledArrival" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Scheduled Arrival</Label>
                                <Input id="scheduledArrival" name="scheduledArrival" type="time" value={formData.scheduledArrival} onChange={handleChange} className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="scheduledDeparture" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Scheduled Departure</Label>
                                <Input id="scheduledDeparture" name="scheduledDeparture" type="time" value={formData.scheduledDeparture} onChange={handleChange} className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="signalStatus" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1 flex items-center gap-1"><Signal className="w-3 h-3"/> Signal Status</Label>
                                <Select name="signalStatus" value={formData.signalStatus} onValueChange={(value) => handleSelectChange('signalStatus', value)}>
                                    <SelectTrigger className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all">
                                        <SelectValue placeholder="Select Signal Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Green">Green</SelectItem>
                                        <SelectItem value="Red">Red</SelectItem>
                                    </SelectContent>
                                </Select>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="trackCapacity" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1">Track Capacity</Label>
                                <Input id="trackCapacity" name="trackCapacity" type="number" value={formData.trackCapacity} onChange={handleChange} className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="hour" className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1">Hour of Day</Label>
                                <Input id="hour" name="hour" type="number" value={formData.hour} onChange={handleChange} className="bg-white/50 dark:bg-black/20 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-indigo-500 transition-all" />
                            </motion.div>
                        </div>
                        
                        <motion.div variants={itemVariants} className="flex items-center space-x-3 p-4 bg-white/40 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-xl">
                            <Checkbox id="platformAvailable" name="platformAvailable" checked={formData.platformAvailable} onCheckedChange={(checked) => handleSelectChange('platformAvailable', checked)} className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                            <Label htmlFor="platformAvailable" className="font-medium cursor-pointer">Platform Available at Station</Label>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <Button type="submit" disabled={loading} className="w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/30 font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                                {loading ? 'Running AI Model...' : (
                                    <span className="flex items-center gap-2">Generate Prediction <ArrowRight className="w-5 h-5" /></span>
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {prediction && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                            <Card className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 border-indigo-200 dark:border-indigo-800 shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                                <CardHeader className="border-b border-indigo-100 dark:border-indigo-900/50">
                                    <CardTitle className="flex items-center text-indigo-700 dark:text-indigo-300">
                                        <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500" />
                                        AI Prediction Results
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 relative z-10">
                                    <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-sm">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Predicted Delay</p>
                                        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{prediction.predicted_delay.toFixed(2)} <span className="text-sm font-normal text-slate-500">mins</span></p>
                                    </div>
                                    <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-sm">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Conflict Probability</p>
                                        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{(prediction.predicted_conflict * 100).toFixed(1)}<span className="text-lg font-normal text-slate-500">%</span></p>
                                    </div>
                                    <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-sm">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Network Throughput</p>
                                        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{prediction.predicted_throughput.toFixed(1)} <span className="text-sm font-normal text-slate-500">idx</span></p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Prediction;
