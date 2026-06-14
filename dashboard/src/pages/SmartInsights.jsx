import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingDown, Clock, Leaf, Zap, Info } from 'lucide-react';
import { useLanguage } from '../components/layout/LanguageContext';

const SmartInsights = () => {
  const { t } = useLanguage();
  const insights = [
    {
      id: 1,
      type: 'efficiency',
      title: 'Most Efficient Operating Hours',
      description: 'Historical data shows that operating between 02:00 and 05:00 AM yields a 15% reduction in overall energy consumption compared to peak daytime hours.',
      icon: Clock,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20'
    },
    {
      id: 2,
      type: 'emissions',
      title: 'Lowest Emission Periods',
      description: 'Weekends currently account for only 18% of total weekly emissions while maintaining 25% of operational output. Consider shifting non-critical loads to weekends.',
      icon: Leaf,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20'
    },
    {
      id: 3,
      type: 'savings',
      title: 'Optimal Cluster Transition',
      description: 'Moving 10% of operations from the "High Consumption" cluster to the "Medium Consumption" cluster could save approximately 450 kWh monthly.',
      icon: TrendingDown,
      color: 'text-sky-500',
      bg: 'bg-sky-50 dark:bg-sky-500/10 border-sky-100 dark:border-sky-500/20'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Power Factor Optimization',
      description: 'We detected frequent drops in Power Factor below 0.85 during "Maximum Load" scenarios. Installing capacitor banks or scheduling heavy machinery sequentially could improve this.',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent-primary/10 rounded-xl text-accent-primary">
          <Lightbulb size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{t('siTitle')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('siSubtitle')}</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {insights.map((insight) => (
          <motion.div key={insight.id} variants={itemVariants} className={`card border ${insight.bg} transition-transform hover:-translate-y-1`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-white dark:bg-industrial-900 shadow-sm border border-slate-200 dark:border-industrial-800 ${insight.color}`}>
                <insight.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{insight.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {insight.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-accent-primary uppercase tracking-wider flex items-center gap-1 transition-colors">
                    <Info size={14} /> {t('siViewDetails')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="card mt-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white border-none">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4">
          <div>
            <h4 className="text-lg font-bold mb-1">{t('siReportTitle')}</h4>
            <p className="text-slate-400 text-sm">{t('siReportDesc')}</p>
          </div>
          <button className="btn-primary whitespace-nowrap bg-accent-primary hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20">
            {t('siGenReport')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartInsights;
