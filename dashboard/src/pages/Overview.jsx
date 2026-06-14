import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Zap, CloudRain, Database, Activity, Target, Loader2 } from 'lucide-react';
import { fetchOverview } from '../utils/api';
import { useLanguage } from '../components/layout/LanguageContext';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

const Overview = () => {
  const { t } = useLanguage();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ kpis: null, trend: [], distribution: [] });

  useEffect(() => {
    fetchOverview()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const kpiCards = [
    { title: t('ovTotalRecords'), value: data.kpis?.totalRecords?.toLocaleString() || '-', icon: Database, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-500/10' },
    { title: t('ovAvgEnergy'), value: data.kpis?.avgUsage || '-', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { title: t('ovAvgCO2'), value: data.kpis?.avgCO2 || '-', icon: CloudRain, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { title: t('ovActiveClusters'), value: data.kpis?.activeClusters || '-', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { title: t('ovModelScore'), value: '0.94', icon: Target, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('ovTitle')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('ovSubtitle')}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className="card flex items-center gap-4">
            <div className={`p-3 rounded-xl ${kpi.bg}`}>
              <kpi.icon className={kpi.color} size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{kpi.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <motion.div variants={itemVariants} className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('ovTrends')}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="date" tick={{fontSize: 12}} tickFormatter={(val) => val.split('-').slice(1).join('/')} stroke="#64748b" />
                <YAxis yAxisId="left" stroke="#0ea5e9" tick={{fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="usage" name="Energy (kWh)" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="co2" name="CO2 Emission" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution Chart */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('ovDistribution')}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Overview;
