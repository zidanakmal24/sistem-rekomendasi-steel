import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { Loader2 } from 'lucide-react';
import { fetchClustering } from '../utils/api';
import { useLanguage } from '../components/layout/LanguageContext';

const COLORS = ['#10b981', '#f59e0b', '#ef4444']; // Colors for Low, Medium, High clusters

const Clustering = () => {
  const { t } = useLanguage();
  const [data, setData] = useState({ scatter: [], profiles: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClustering()
      .then(res => {
        setData({
          scatter: res.scatter.map(d => ({
            x: d.Usage,
            y: d.CO2,
            z: 80, // Default ZAxis value since PowerFactor isn't returned for all rows to save space
            cluster: d.Cluster
          })),
          profiles: res.profiles
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('clTitle')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('clSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scatter Plot */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('clDist')}</h3>
          <div className="h-[400px] w-full bg-slate-50 dark:bg-industrial-950 rounded-lg p-4 border border-slate-200 dark:border-industrial-800">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis type="number" dataKey="x" name="Energy Usage" unit=" kWh" stroke="#64748b" tick={{fontSize: 12}} />
                <YAxis type="number" dataKey="y" name="CO2 Emission" unit=" tCO2" stroke="#64748b" tick={{fontSize: 12}} />
                <ZAxis type="number" dataKey="z" range={[40, 100]} name="Power Factor" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                {data.profiles.map((profile, i) => (
                  <Scatter 
                    key={profile.id}
                    name={profile.name}
                    data={data.scatter.filter(d => d.cluster === profile.id)} 
                    fill={COLORS[i % COLORS.length]} 
                    opacity={0.7}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cluster Profiles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('clProfiles')}</h3>
          {data.profiles.map((profile, index) => (
            <div key={profile.id} className="card relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1 h-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full block" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {profile.name}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{profile.description || "Cluster profile derived from usage and emissions."}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 dark:bg-industrial-950 p-3 rounded-lg border border-slate-200 dark:border-industrial-800">
                <div>
                  <span className="text-slate-500 block text-xs">{t('clAvgUsage')}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{profile.avgUsage} kWh</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">{t('clAvgCO2')}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{profile.avgCO2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Clustering;
