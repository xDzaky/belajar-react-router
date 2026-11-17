import { Navigate, useLocation } from 'react-router-dom';  // ← Tambah useLocation
import { useAuth } from '../context/AuthContext';  // ← IMPORT useAuth

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();  // ← Ambil dari context
  const location = useLocation();  // ← Untuk simpan current location
  
  // Show loading saat check auth pertama kali
  // Ini prevent flicker (loading → login → dashboard)
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        <div>Loading...</div>
      </div>
    );
  }
  
  // Kalau belum login, redirect ke login page
  if (!isAuthenticated) {
    // PENTING: Simpan current location di state
    // Jadi setelah login, user bisa balik ke sini
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Kalau sudah login, tampilkan page
  return children;
}

export default PrivateRoute;
