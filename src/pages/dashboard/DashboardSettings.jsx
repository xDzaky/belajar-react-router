import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function DashboardSettings() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  
  const [profile, setProfile] = useState({
    name: 'Achmad Dzaki Habibullah Al Azhar',
    email: 'dzaky@example.com',
    school: 'SMK Negeri 1 Probolinggo',
    notifications: true
  });
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      navigate('/login');
    }
  };
  
  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully! ✅');
  };
  
  return (
    <Container fluid>
      <h1 style={{ marginBottom: '16px' }}>Settings</h1>
      <p style={{ color: '#6c757d', marginBottom: '32px' }}>
        Manage your account settings and preferences
      </p>
      
      {/* Profile Settings */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Profile Information</Card.Title>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>School</Form.Label>
              <Form.Control 
                type="text" 
                value={profile.school}
                onChange={(e) => setProfile({...profile, school: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox"
                label="Enable email notifications"
                checked={profile.notifications}
                onChange={(e) => setProfile({...profile, notifications: e.target.checked})}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              💾 Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardSettings;
