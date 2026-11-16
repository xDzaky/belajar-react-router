import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Components
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardStats from './pages/dashboard/DashboardStats';
import DashboardSettings from './pages/dashboard/DashboardSettings';

import './App.css';

function App() {
  return (
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
        {/* Index route - default page */}
        <Route index element={<DashboardHome />} />
        <Route path="stats" element={<DashboardStats />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
