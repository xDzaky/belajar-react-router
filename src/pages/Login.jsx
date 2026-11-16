import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dummy authentication
    if (credentials.username === 'dzaky' && credentials.password === 'password123') {
      // Set login flag
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', credentials.username);
      
      navigate('/dashboard');
    } else {
      alert('Username atau password salah!');
    }
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '400px' }}>
      <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Login 🔐</h1>
      
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
          <p>Demo credentials:</p>
          <p>Username: <strong>dzaky</strong></p>
          <p>Password: <strong>password123</strong></p>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
