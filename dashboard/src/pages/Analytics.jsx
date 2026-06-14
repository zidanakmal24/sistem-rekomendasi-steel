import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';
import { fetchAnalytics } from '../utils/api';
import { useLanguage } from '../components/layout/LanguageContext';

const Analytics = () => {
  const { t } = useLanguage();
  const [filterWeekStatus, setFilterWeekStatus] = useState('All');
  const [data, setData] = useState({ dayOfWeek: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const usageHistogram = [
    { range: '0-20', count: 120 },
    { range: '21-40', count: 85 },
    { range: '41-60', count: 140 },
    { range: '61-80', count: 90 },
    { range: '81-100', count: 45 },
    { range: '>100', count: 20 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-accent-primary" size={48} />
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('anTitle')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('anSubtitle')}</p>
        </div>
        
        <div className="bg-white dark:bg-industrial-900 rounded-lg p-1 flex border border-slate-200 dark:border-industrial-800">
          {['All', 'Weekday', 'Weekend'].map(status => (
            <button
              key={status}
              onClick={() => setFilterWeekStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterWeekStatus === status 
                  ? 'bg-accent-primary text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-industrial-800'
              }`}
            >
              {status === 'All' ? t('anAll') : status === 'Weekday' ? t('anWeekday') : t('anWeekend')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Day of Week Comparison */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('anDayOfWeek')}</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dayOfWeek} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="Day_Of_Week" stroke="#64748b" />
                <YAxis yAxisId="left" stroke="#0ea5e9" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip cursor={{ fill: 'rgba(51, 65, 85, 0.1)' }} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="usage" name="Avg Usage (kWh)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="co2" name="Avg CO2" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Histogram Usage */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('anHistogram')}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageHistogram} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                <Tooltip cursor={{ fill: 'rgba(51, 65, 85, 0.1)' }} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" name="Frequency" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mock additional chart */}
        <div className="card flex items-center justify-center flex-col text-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-industrial-900 dark:to-industrial-800">
           <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4">{t('anHeatmap')}</h3>
           <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">{t('anHeatmapSub')}</p>
           <div className="w-full h-48 bg-slate-200 dark:bg-industrial-950 rounded-lg flex items-center justify-center border border-slate-300 dark:border-industrial-700 overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4b/Heatmap.png')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity mix-blend-luminosity"></div>
              <span className="relative z-10 px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-md font-medium text-slate-800 dark:text-white shadow-sm">{t('anInteractive')}</span>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Analytics;
