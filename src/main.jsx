import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'  // ← IMPORT AuthProvider
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>           {/* ← WRAP dengan AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)

