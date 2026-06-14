import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-industrial-950 transition-colors duration-200">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 flex flex-col lg:pl-64 h-full w-full">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Layout;
