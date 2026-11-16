import { Container, Form } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  
  const projects = [
    {
      id: 1,
      title: 'Mini Task Tracker',
      description: 'Aplikasi task management dengan localStorage',
      tech: ['React', 'useState', 'useEffect'],
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Dashboard with Props',
      description: 'Dashboard interaktif dengan props implementation',
      tech: ['React', 'Props', 'PropTypes'],
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Portfolio with Router',
      description: 'Multi-page portfolio website',
      tech: ['React', 'React Router', 'React Bootstrap'],
      status: 'In Progress'
    }
  ];

  // Filter projects berdasarkan search
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSearch = (keyword) => {
    if (keyword) {
      setSearchParams({ search: keyword });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '24px' }}>My Projects 🚀</h1>
      
      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="🔍 Search projects by name, description, or technology..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: '16px', maxWidth: '500px' }}
      />
      
      <p style={{ color: '#6c757d', marginBottom: '32px' }}>
        Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        {search && ` matching "${search}"`}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                style={{ 
                  padding: '24px', 
                  border: '1px solid #dee2e6', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h3 style={{ marginBottom: '12px' }}>{project.title}</h3>
                <p style={{ color: '#6c757d', marginBottom: '16px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  {project.tech.map(tech => (
                    <span 
                      key={tech}
                      style={{ 
                        padding: '4px 8px', 
                        backgroundColor: '#e3f2fd', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#1976d2'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span 
                  style={{ 
                    fontSize: '12px',
                    color: project.status === 'Completed' ? '#28a745' : '#ffc107',
                    fontWeight: 'bold'
                  }}
                >
                  {project.status}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
            No projects found matching "{search}". Try a different search term.
          </p>
        )}
      </div>
    </Container>
  );
}

export default Projects;
