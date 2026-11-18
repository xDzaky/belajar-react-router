import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';  // ← Tambah useLocation
import { useAuth } from '../context/AuthContext';  // ← IMPORT useAuth
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from "zod";

  // const loginSchema = z.object({
  //   email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid!'),
  //   password: z.string().min(6, 'Password minimal 6 karakter')
  // })

  // type LoginFormType = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();  // ← Untuk akses state dari redirect
  const { login } = useAuth();  // ← Ambil login function dari context
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');  // ← State untuk error message

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');  // ← Clear error sebelum submit
    
    // Validasi input kosong
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Username dan password harus diisi!');
      return;
    }
    
    // Panggil login() dari AuthContext
    const success = login(credentials.username, credentials.password);
    
    if (success) {
      // Login berhasil!
      
      // Ambil intended route dari location.state (dari PrivateRoute redirect)
      const from = location.state?.from?.pathname || '/dashboard';
      
      // Redirect ke halaman yang dimaksud
      // replace: true → ganti history entry (user gak bisa back ke login)
      navigate(from, { replace: true });
    } else {
      // Login gagal (shouldn't happen dengan current logic, tapi untuk safety)
      setError('Login gagal. Coba lagi.');
    }
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '400px' }}>
      <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Login</h1>
      
      {/* ← Show error message jika ada */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="dzaky"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="password123"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: '100%' }}>
          Login
        </Button>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: '#6c757d' }}>
          <p>Demo - Masukkan username & password apapun untuk login</p>
          <p style={{ fontSize: '12px', marginTop: '8px' }}>
            Contoh: username: <strong>dzaki</strong>, password: <strong>12345</strong>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default Login;