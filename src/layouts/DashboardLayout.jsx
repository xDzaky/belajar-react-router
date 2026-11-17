import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // ← IMPORT useAuth

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();  // ← Ambil user & logout dari context
  
  const handleLogout = () => {
    // Panggil logout() dari AuthContext
    logout();
    
    // Redirect ke login
    navigate('/login');
  };

  // Style untuk link sidebar
  const getLinkStyle = (isActive) => ({
    display: 'block',
    padding: '10px 15px',
    marginBottom: '8px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: isActive ? '#ffffff' : '#333333',
    backgroundColor: isActive ? '#0d6efd' : 'transparent',
    transition: 'all 0.2s ease',
    fontWeight: isActive ? '600' : '400'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar - Full height dengan position fixed */}
      <aside style={{ 
        position: 'fixed',
        top: '0px',
        left: 0,
        bottom: 0,
        width: '250px', 
        backgroundColor: '#f8f9fa', 
        padding: '20px',
        borderRight: '2px solid #dee2e6',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* ← USER INFO SECTION - NEW! */}
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #0d6efd'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#666', 
            marginBottom: '4px' 
          }}>
            Logged in as
          </div>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#0d6efd',
            wordBreak: 'break-word'
          }}>
            👤 {user?.username || 'User'}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#888',
            marginTop: '4px'
          }}>
            {user?.email || 'user@example.com'}
          </div>
        </div>
        
        <h4 style={{ 
          marginBottom: '20px', 
          paddingBottom: '10px', 
          borderBottom: '2px solid #0d6efd',
          color: '#333'
        }}>
          Dashboard Menu
        </h4>
        
        <nav style={{ flex: 1 }}>
          <NavLink 
            to="/dashboard" 
            end
            style={({ isActive }) => getLinkStyle(isActive)}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/dashboard/stats"
            style={({ isActive }) => getLinkStyle(isActive)}
          >
            Statistics
          </NavLink>
          
          <NavLink 
            to="/dashboard/settings"
            style={({ isActive }) => getLinkStyle(isActive)}
          >
            Settings
          </NavLink>
        </nav>
        
        <hr style={{ margin: '20px 0', borderColor: '#dee2e6' }} />
        
        <button 
          onClick={handleLogout}
          className="btn btn-danger w-100"
          style={{ 
            padding: '10px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          Logout
        </button>
      </aside>
      
      {/* Main Content - Dengan margin kiri untuk sidebar */}
      <main style={{ 
        marginLeft: '250px',
        marginTop: '56px',
        flex: 1, 
        padding: '30px', 
        backgroundColor: '#fff',
        minHeight: 'calc(100vh - 56px)'
      }}>
        <Outlet />  {/* 🔑 Dashboard sub-pages muncul di sini */}
      </main>
    </div>
  );
}

export default DashboardLayout;