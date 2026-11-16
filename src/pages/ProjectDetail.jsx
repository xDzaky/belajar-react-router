import { Container, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams();  // Ambil ID dari URL
  const navigate = useNavigate();
  
  // Dummy data (nanti bisa dari API)
  const projects = {
    1: {
      title: 'Mini Task Tracker',
      description: 'Aplikasi task management dengan localStorage persistence',
      tech: ['React', 'useState', 'useEffect', 'localStorage'],
      features: [
        'Add new tasks',
        'Mark tasks as completed',
        'Delete tasks',
        'LocalStorage persistence',
        'Dynamic document title'
      ],
      github: 'https://github.com/dzaky/task-tracker',
      demo: '#'
    },
    2: {
      title: 'Dashboard with Props',
      description: 'Dashboard interaktif dengan complete props implementation',
      tech: ['React', 'Props', 'PropTypes', 'React Bootstrap'],
      features: [
        'Stats cards with SVG icons',
        'Task management',
        'PropTypes validation',
        'Reusable components',
        'Clean design'
      ],
      github: 'https://github.com/dzaky/dashboard',
      demo: '#'
    },
    3: {
      title: 'Portfolio with Router',
      description: 'Multi-page portfolio website dengan React Router',
      tech: ['React', 'React Router', 'React Bootstrap', 'Nested Routes'],
      features: [
        'Multi-page navigation',
        'Dynamic routes with params',
        'Protected routes',
        '404 Not Found page',
        'Lazy loading'
      ],
      github: 'https://github.com/dzaky/portfolio',
      demo: '#'
    }
  };

  const project = projects[id];

  if (!project) {
    return (
      <Container style={{ paddingTop: '100px', textAlign: 'center' }}>
        <h1>Project Not Found 😢</h1>
        <p>Project dengan ID {id} tidak ditemukan</p>
        <Button onClick={() => navigate('/projects')}>
          Kembali ke Projects
        </Button>
      </Container>
    );
  }

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      {/* Breadcrumbs */}
      <div style={{ marginBottom: '24px', fontSize: '14px', color: '#6c757d' }}>
        <Link to="/" style={{ color: '#6c757d', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <Link to="/projects" style={{ color: '#6c757d', textDecoration: 'none' }}>Projects</Link>
        {' / '}
        <span>{project.title}</span>
      </div>

      <h1 style={{ marginBottom: '16px' }}>{project.title}</h1>
      <p style={{ fontSize: '18px', color: '#6c757d', marginBottom: '32px' }}>
        {project.description}
      </p>

      {/* Tech Stack */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Tech Stack</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {project.tech.map(tech => (
            <span 
              key={tech}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#e3f2fd', 
                borderRadius: '20px',
                fontSize: '14px',
                color: '#1976d2'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Features</h2>
        <ul style={{ lineHeight: '2' }}>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button 
          variant="primary" 
          href={project.github}
          target="_blank"
        >
          View on GitHub
        </Button>
        <Button 
          variant="outline-primary" 
          href={project.demo}
        >
          Live Demo
        </Button>
        <Button 
          variant="outline-secondary"
          onClick={() => navigate('/projects')}
        >
          ← Back to Projects
        </Button>
      </div>
    </Container>
  );
}

export default ProjectDetail;
