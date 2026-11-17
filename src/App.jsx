import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// ========================================
// EAGER LOADING (Load immediately)
// ========================================
// Pages yang SERING diakses / KECIL ukurannya
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Layouts (perlu eager karena sering digunakan)
import MainLayout from './layouts/MainLayout';

// Components
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';

// ========================================
// LAZY LOADING (Load on demand)
// ========================================
// Pages yang JARANG diakses / BESAR ukurannya

// Public Pages - Lazy
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));

// Dashboard - Lazy (karena butuh auth, gak semua user akses)
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const DashboardStats = lazy(() => import('./pages/dashboard/DashboardStats'));
const DashboardSettings = lazy(() => import('./pages/dashboard/DashboardSettings'));

import './App.css';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes dengan MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* Login Route (no layout) */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes dengan DashboardLayout (Protected) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="stats" element={<DashboardStats />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
