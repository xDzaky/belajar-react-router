import { Container } from 'react-bootstrap';

function About() {
  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '32px' }}>Tentang Saya 👨‍💻</h1>
      
      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Bio</h2>
          <p style={{ lineHeight: '1.8', color: '#495057' }}>
            Halo! Saya Achmad Dzaky Habibullah Al Azhar, siswa SMK Negeri 1 Probolinggo 
            yang sedang menjalani program magang frontend di Hummatech. Saya passionate 
            dalam web development dan sedang belajar React JS.
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['HTML', 'CSS', 'JavaScript', 'React JS', 'React Bootstrap', 'Laravel', 'Git'].map(skill => (
              <span 
                key={skill}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#e9ecef', 
                  borderRadius: '20px',
                  fontSize: '14px'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Contact</h2>
          <p style={{ lineHeight: '1.8', color: '#495057' }}>
            📧 Email: dzaky@example.com<br />
            📱 Phone: 0812-3456-7890<br />
            🏫 School: SMK Negeri 1 Probolinggo
          </p>
        </div>
      </div>
    </Container>
  );
}

export default About;
