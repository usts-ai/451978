import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CoursPage from './pages/CoursPage';
import MoniteurDashboard from './pages/MoniteurDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          {/* Routes pour les élèves */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cours" element={<CoursPage />} />
          
          {/* Routes pour les moniteurs */}
          <Route path="/moniteur" element={<MoniteurDashboard />} />
          <Route path="/eleves" element={<Navigate to="/moniteur" replace />} />
          <Route path="/planning" element={<Navigate to="/moniteur" replace />} />
          <Route path="/evaluations" element={<Navigate to="/moniteur" replace />} />
          
          {/* Routes pour les administrateurs */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/utilisateurs" element={<Navigate to="/admin" replace />} />
          <Route path="/statistiques" element={<Navigate to="/admin" replace />} />
          <Route path="/configuration" element={<Navigate to="/admin" replace />} />
          
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
