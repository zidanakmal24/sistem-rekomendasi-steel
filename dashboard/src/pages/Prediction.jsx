import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Activity, ShieldCheck, AlertCircle } from 'lucide-react';
import { predictEnergy } from '../utils/api';
import { useLanguage } from '../components/layout/LanguageContext';

const Prediction = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    weekStatus: 'Weekday',
    dayOfWeek: 'Monday',
    loadType: 'Medium Load',
    nsm: 36000,
    reactivePower: 25.5,
    powerFactor: 0.85,
    hour: 10
  });

  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsPredicting(true);
    
    try {
      const result = await predictEnergy({
        weekStatus: formData.weekStatus,
        dayOfWeek: formData.dayOfWeek,
        loadType: formData.loadType,
        hour: parseInt(formData.hour),
        nsm: parseInt(formData.nsm),
        powerFactor: parseFloat(formData.powerFactor),
        reactivePower: parseFloat(formData.reactivePower)
      });
      
      setPrediction(result);
    } catch (error) {
      console.error("Prediction failed:", error);
      // Fallback or error handling can go here
    } finally {
      setIsPredicting(false);
    }
  };

  const gaugeData = prediction ? [
    { name: '100%', value: 100, fill: 'transparent' }, // Max invisible
    { name: 'Prediction', value: prediction.confidence, fill: '#0ea5e9' }
  ] : [];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('prTitle')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('prSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-industrial-800 pb-4">{t('prInputParams')}</h3>
          
          <form onSubmit={handlePredict} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('prWeekStatus')}</label>
                <select name="weekStatus" value={formData.weekStatus} onChange={handleChange} className="input-field">
                  <option>Weekday</option>
                  <option>Weekend</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('prDayOfWeek')}</label>
                <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} className="input-field">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('prLoadType')}</label>
                <select name="loadType" value={formData.loadType} onChange={handleChange} className="input-field">
                  <option>Light Load</option>
                  <option>Medium Load</option>
                  <option>Maximum Load</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('prHour')}</label>
                <input type="number" name="hour" min="0" max="23" value={formData.hour} onChange={handleChange} className="input-field" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('prNsm')}</label>
                <input type="number" name="nsm" value={formData.nsm} onChange={handleChange} className="input-field" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('prPowerFactor')}</label>
                <input type="number" step="0.01" name="powerFactor" value={formData.powerFactor} onChange={handleChange} className="input-field" />
              </div>
            </div>

            <div className="space-y-1 pb-4">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('prReactivePower')}</label>
              <input type="number" step="0.1" name="reactivePower" value={formData.reactivePower} onChange={handleChange} className="input-field" />
            </div>

            <button type="submit" disabled={isPredicting} className="btn-primary w-full flex justify-center items-center gap-2 text-lg py-3">
              {isPredicting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('prAnalyzing')}
                </>
              ) : (
                <>
                  <Activity size={20} />
                  {t('prRunModel')}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Prediction Output */}
        <div className="card flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-industrial-800 pb-4">{t('prResults')}</h3>
          
          <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
            {!prediction && !isPredicting ? (
              <div className="text-center text-slate-400 dark:text-slate-500 space-y-4">
                <Activity size={48} className="mx-auto opacity-50" />
                <p>{t('prSubmitToView')}</p>
              </div>
            ) : isPredicting ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-slate-200 dark:border-industrial-800 border-t-accent-primary rounded-full animate-spin"></div>
                <p className="text-slate-500 dark:text-slate-400 animate-pulse">{t('prRunningModel')}</p>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="w-full space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-50 dark:bg-sky-500/10 p-6 rounded-xl text-center border border-sky-100 dark:border-sky-900">
                    <p className="text-sky-600 dark:text-sky-400 font-medium mb-1">{t('prPredEnergy')}</p>
                    <h4 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{prediction.usage} <span className="text-lg font-normal text-slate-500">kWh</span></h4>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-500/10 p-6 rounded-xl text-center border border-emerald-100 dark:border-emerald-900">
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">{t('prPredCO2')}</p>
                    <h4 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{prediction.co2} <span className="text-lg font-normal text-slate-500">tCO2</span></h4>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-industrial-950 rounded-xl p-6 border border-slate-200 dark:border-industrial-800 flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t('prPredCluster')}</p>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full block ${prediction.clusterId === 0 ? 'bg-emerald-500' : prediction.clusterId === 1 ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
                      {prediction.clusterName}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t('prConfidence')}</p>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 justify-end">
                      {prediction.confidence >= 90 ? <ShieldCheck className="text-emerald-500" size={20} /> : <AlertCircle className="text-amber-500" size={20} />}
                      {prediction.confidence.toFixed(1)}%
                    </h4>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Prediction;
