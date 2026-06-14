import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, ScatterChart, Activity, Cpu, Lightbulb, Info, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { t } = useLanguage();

  const navItems = [
    { name: t('navOverview'), path: '/', icon: LayoutDashboard },
    { name: t('navAnalytics'), path: '/analytics', icon: BarChart3 },
    { name: t('navClustering'), path: '/clustering', icon: ScatterChart },
    { name: t('navPrediction'), path: '/prediction', icon: Activity },
    { name: t('navRecommendation'), path: '/recommendation', icon: Cpu },
    { name: t('navInsights'), path: '/insights', icon: Lightbulb },
    { name: t('navAbout'), path: '/about', icon: Info },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64
        bg-white dark:bg-industrial-950 border-r border-slate-200 dark:border-industrial-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-industrial-800">
          <span className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Cpu className="text-accent-primary" size={24} />
            IndusEnergy
          </span>
          <button 
            className="lg:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                ${isActive 
                  ? 'bg-accent-primary/10 text-accent-primary dark:bg-accent-primary/20 dark:text-sky-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-industrial-900'}
              `}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-industrial-800">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"></div>
            {t('systemOnline')}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
