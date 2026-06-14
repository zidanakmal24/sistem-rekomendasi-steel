import React from 'react';
import { Menu, Moon, Sun, Download, FileText, Globe } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const Header = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleExportCSV = () => {
    alert("Export to CSV triggered. In a full implementation, this would download the dataset.");
  };

  const handleExportPDF = () => {
    alert("Export to PDF triggered. This would generate a PDF report of the current view.");
  };

  return (
    <header className="h-16 bg-white dark:bg-industrial-950 border-b border-slate-200 dark:border-industrial-800 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-industrial-900 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 hidden sm:block">
          {t('dashboard')}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 mr-2">
          <div className="relative flex items-center">
            <Globe size={16} className="absolute left-3 text-slate-500" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="btn-secondary pl-9 pr-8 text-sm py-1.5 appearance-none cursor-pointer focus:ring-2 focus:ring-accent-primary focus:outline-none"
            >
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>
          <button onClick={handleExportCSV} className="btn-secondary flex items-center gap-2 text-sm py-1.5">
            <FileText size={16} />
            <span className="hidden lg:inline">{t('exportCsv')}</span>
          </button>
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2 text-sm py-1.5">
            <Download size={16} />
            <span className="hidden lg:inline">{t('exportPdf')}</span>
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-industrial-800 hidden md:block"></div>

        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-accent-primary dark:text-slate-400 dark:hover:text-sky-400 rounded-lg hover:bg-slate-100 dark:hover:bg-industrial-900 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-industrial-800 border-2 border-slate-300 dark:border-industrial-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium overflow-hidden">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=0ea5e9&color=fff" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
