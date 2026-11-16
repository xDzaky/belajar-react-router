import { Outlet, NavLink, useNavigate } from 'react-router-dom';

function DashboardLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Hapus auth dari localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
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
            fontWeight: '500'
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