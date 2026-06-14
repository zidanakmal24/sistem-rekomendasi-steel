import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Placeholder imports for pages
import Overview from './pages/Overview';
import Analytics from './pages/Analytics';
import Clustering from './pages/Clustering';
import Prediction from './pages/Prediction';
import Recommendation from './pages/Recommendation';
import SmartInsights from './pages/SmartInsights';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="clustering" element={<Clustering />} />
        <Route path="prediction" element={<Prediction />} />
        <Route path="recommendation" element={<Recommendation />} />
        <Route path="insights" element={<SmartInsights />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
