import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  // Kalau belum login, redirect ke login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Kalau sudah login, tampilkan page
  return children;
}

export default PrivateRoute;
