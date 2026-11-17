import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} style={{ textAlign: 'center' }}>
            {/* Big 404 Number */}
            <h1 style={{ 
              fontSize: '150px', 
              fontWeight: 'bold',
              margin: '0',
              lineHeight: '1',
              textShadow: '0 5px 10px rgba(0,0,0,0.2)'
            }}>
              404
            </h1>
            
            {/* Main Message */}
            <h2 style={{ 
              fontSize: '36px',
              marginTop: '30px',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              Oops! Halaman Tidak Ditemukan
            </h2>
            
            {/* Description */}
            <p style={{ 
              fontSize: '18px',
              opacity: 0.9,
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Halaman yang kamu cari tidak ada atau sudah dipindahkan.
              <br />
              Mungkin kamu salah ketik URL? 🤔
            </p>
            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button
                size="lg"
                onClick={() => navigate('/')}
                style={{
                  padding: '12px 35px',
                  fontSize: '16px',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  color: '#667eea',
                  border: 'none',
                  borderRadius: '30px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🏠 Kembali ke Home
              </Button>
              
              <Button
                size="lg"
                variant="outline-light"
                onClick={() => navigate(-1)}
                style={{
                  padding: '12px 35px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '30px',
                  borderWidth: '2px',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ← Halaman Sebelumnya
              </Button>
            </div>
            
            {/* Helpful Links */}
            <div style={{ 
              marginTop: '50px',
              paddingTop: '30px',
              borderTop: '1px solid rgba(255,255,255,0.3)'
            }}>
              <p style={{ 
                fontSize: '14px',
                opacity: 0.8,
                marginBottom: '15px'
              }}>
                Atau coba link ini:
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: '14px'
              }}>
                <a 
                  href="/" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'underline',
                    opacity: 0.9,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                >
                  Home
                </a>
                <a 
                  href="/about" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'underline',
                    opacity: 0.9,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                >
                  About
                </a>
                <a 
                  href="/projects" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'underline',
                    opacity: 0.9,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                >
                  Projects
                </a>
                <a 
                  href="/contact" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'underline',
                    opacity: 0.9,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                >
                  Contact
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotFound;
