import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '120px', marginBottom: '24px' }}>404</h1>
      <h2 style={{ marginBottom: '16px' }}>Page Not Found 😢</h2>
      <p style={{ fontSize: '18px', color: '#6c757d', marginBottom: '32px' }}>
        Halaman yang kamu cari tidak ditemukan
      </p>
      <Button 
        variant="primary" 
        size="lg"
        onClick={() => navigate('/')}
      >
        ← Kembali ke Home
      </Button>
    </Container>
  );
}

export default NotFound;
