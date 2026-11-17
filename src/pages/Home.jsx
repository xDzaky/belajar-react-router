import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
          Welcome to My Portfolio 👋
        </h1>
        <p style={{ fontSize: '20px', color: '#6c757d', marginBottom: '32px' }}>
          Saya Dzaki, lagi magang divisi frontend di Hummatech
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/projects">
            <Button variant="primary" size="lg">
              Lihat Projects
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline-secondary" size="lg">
              Tentang Saya
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ marginTop: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>
          Yang Sudah Kupelajari
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div style={{ padding: '24px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
            <h3>React JS</h3>
            <p>Components, Props, State, Hooks</p>
          </div>
          <div style={{ padding: '24px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
            <h3>React Bootstrap</h3>
            <p>UI Components, Responsive Design</p>
          </div>
          <div style={{ padding: '24px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
            <h3>React Router</h3>
            <p>Multi-page Navigation</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
