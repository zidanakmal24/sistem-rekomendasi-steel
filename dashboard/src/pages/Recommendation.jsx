import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { getRecommendations } from '../utils/api';
import { useLanguage } from '../components/layout/LanguageContext';

const Recommendation = () => {
  const { t } = useLanguage();
  const [constraints, setConstraints] = useState({
    maxEnergy: 80,
    maxCO2: 35,
    preferredDay: 'Monday'
  });
  
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConstraints(prev => ({ ...prev, [name]: value }));
  };

  const generateRecommendations = async (e) => {
    e.preventDefault();
    
    try {
      const res = await getRecommendations(constraints);
      setResults(res.results);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('rcTitle')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('rcSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Constraints Form */}
        <div className="card lg:col-span-1 h-fit">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-industrial-800 pb-4">{t('rcConstraints')}</h3>
          <form onSubmit={generateRecommendations} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex justify-between">
                <span>{t('rcMaxEnergy')}</span>
                <span className="text-accent-primary font-bold">{constraints.maxEnergy} kWh</span>
              </label>
              <input 
                type="range" 
                name="maxEnergy" 
                min="10" 
                max="200" 
                value={constraints.maxEnergy} 
                onChange={handleChange} 
                className="w-full accent-accent-primary" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex justify-between">
                <span>{t('rcMaxCO2')}</span>
                <span className="text-accent-secondary font-bold">{constraints.maxCO2} tCO2</span>
              </label>
              <input 
                type="range" 
                name="maxCO2" 
                min="5" 
                max="100" 
                value={constraints.maxCO2} 
                onChange={handleChange} 
                className="w-full accent-accent-secondary" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('rcPreferredDay')}</label>
              <select name="preferredDay" value={constraints.preferredDay} onChange={handleChange} className="input-field">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2 py-3 mt-4">
              <Search size={20} />
              {t('rcFindWindows')}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="card lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-industrial-800 pb-4">{t('rcRecHours')}</h3>
          
          {!results ? (
             <div className="flex flex-col justify-center items-center h-64 text-slate-400 dark:text-slate-500">
               <CheckCircle size={48} className="mb-4 opacity-50" />
               <p>{t('rcAdjust')}</p>
             </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((rec, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-industrial-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-700 w-16 h-16 rounded-xl flex flex-col justify-center items-center shadow-sm">
                      <span className="text-xs text-slate-500 font-medium uppercase">Hour</span>
                      <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{rec.hour}:00</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100">{rec.loadType}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500"></span> {rec.estUsage} kWh</span>
                        <span className="text-slate-300 dark:text-industrial-700">|</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {rec.estCO2} tCO2</span>
                        <span className="text-slate-300 dark:text-industrial-700 hidden sm:inline">|</span>
                        <span className="hidden sm:inline">PF: {rec.powerFactor}</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm whitespace-nowrap">{t('rcSchedule')}</button>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-900/50 rounded-xl p-6 text-center"
            >
              <AlertTriangle size={48} className="mx-auto text-rose-500 mb-4" />
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{t('rcNoRecs')}</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{t('rcTooRestrictive')}</p>
              
              <div className="text-left bg-white dark:bg-industrial-900 p-4 rounded-lg border border-rose-100 dark:border-rose-900/30">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wider">{t('rcSuggested')}</h5>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2"><span className="text-rose-500">•</span> {t('rcSug1')} {parseFloat(constraints.maxEnergy) + 20} kWh</li>
                  <li className="flex items-start gap-2"><span className="text-rose-500">•</span> {t('rcSug2')}</li>
                  <li className="flex items-start gap-2"><span className="text-rose-500">•</span> {t('rcSug3')}</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendation;
