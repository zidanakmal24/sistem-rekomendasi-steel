import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Layout, Info } from 'lucide-react';
import { useLanguage } from '../components/layout/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  return (
    <motion.div 
      className="space-y-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-accent-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent-primary">
          <Cpu size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('abTitle')}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t('abSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Layout className="text-accent-primary" size={24} />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('abFrontend')}</h3>
          </div>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-500"></span> React 18 + Vite</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Tailwind CSS for Styling</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Recharts for Visualizations</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Framer Motion for Animations</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Lucide React for Icons</li>
          </ul>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-accent-secondary" size={24} />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('abCore')}</h3>
          </div>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Real-time Data Visualization</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> K-Means Clustering Analysis</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Predictive Modeling Simulation</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Constraint-based Recommendations</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Dark/Light Theme Support</li>
          </ul>
        </div>
      </div>

      <div className="card mt-6 border-l-4 border-l-accent-primary">
        <div className="flex items-start gap-4">
          <Info className="text-accent-primary mt-1" size={24} />
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{t('abContext')}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t('abContextDesc')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
