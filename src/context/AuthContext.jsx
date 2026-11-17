import { createContext, useContext, useState, useEffect } from 'react';

// ========================================
// 1. CREATE CONTEXT
// ========================================
// Ini seperti "radio tower" yang akan broadcast auth state
const AuthContext = createContext(undefined);

// ========================================
// 2. CUSTOM HOOK untuk akses context
// ========================================
// Hook ini memudahkan component untuk "listen" ke auth state
export function useAuth() {
  const context = useContext(AuthContext);
  
  // Error handling: pastikan hook dipanggil di dalam AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}

// ========================================
// 3. AUTH PROVIDER COMPONENT
// ========================================
export function AuthProvider({ children }) {
  // ------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------
  
  // State untuk menyimpan user info
  const [user, setUser] = useState(null);
  
  // State untuk loading (saat check auth pertama kali)
  const [loading, setLoading] = useState(true);
  
  // ------------------------------------
  // LOAD USER dari localStorage saat app start
  // ------------------------------------
  useEffect(() => {
    // Cek apakah ada user tersimpan di localStorage
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      // Parse JSON string jadi object
      setUser(JSON.parse(savedUser));
    }
    
    // Selesai loading
    setLoading(false);
  }, []); // [] = hanya run sekali saat mount
  
  // ------------------------------------
  // LOGIN FUNCTION
  // ------------------------------------
  const login = (username, password) => {
    // Validasi input
    if (!username || !password) {
      return false;
    }
    
    // Simulasi login (di production, ini panggil API)
    // Untuk demo, terima username & password apapun
    const userData = {
      id: Date.now(), // Unique ID dari timestamp
      username: username,
      email: `${username}@example.com`,
      loginTime: new Date().toISOString()
    };
    
    // Set user state
    setUser(userData);
    
    // Simpan ke localStorage untuk persistence
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    return true; // Login berhasil
  };
  
  // ------------------------------------
  // LOGOUT FUNCTION
  // ------------------------------------
  const logout = () => {
    // Clear user state
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };
  
  // ------------------------------------
  // COMPUTED VALUES
  // ------------------------------------
  
  // Check apakah user sudah login
  const isAuthenticated = !!user; // !! = convert to boolean
  
  // ------------------------------------
  // VALUE yang di-provide ke children
  // ------------------------------------
  const value = {
    user,              // User info object
    login,             // Function untuk login
    logout,            // Function untuk logout
    isAuthenticated,   // Boolean: true jika sudah login
    loading            // Boolean: true saat loading
  };
  
  // ------------------------------------
  // RENDER PROVIDER
  // ------------------------------------
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
