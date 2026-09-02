import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

import Ledger from './pages/Ledger';
import Project from './pages/Project';
import Provenance from './pages/Provenance';
import Andamooka from './pages/Andamooka';
import GetInvolved from './pages/GetInvolved';
import Compliance from './pages/Compliance';
import Navigation from './components/Navigation';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Ledger />} />
        <Route path="/project" element={<Project />} />
        <Route path="/provenance" element={<Provenance />} />
        <Route path="/andamooka" element={<Andamooka />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/compliance" element={<Compliance />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
