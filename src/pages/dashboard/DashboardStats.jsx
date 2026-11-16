import { Container, Card, Row, Col, ProgressBar } from 'react-bootstrap';

function DashboardStats() {
  const learningData = [
    { topic: 'React Basics', progress: 100, color: 'success' },
    { topic: 'Props & State', progress: 100, color: 'success' },
    { topic: 'Hooks (useState, useEffect)', progress: 100, color: 'success' },
    { topic: 'React Router - Basic', progress: 100, color: 'success' },
    { topic: 'React Router - Advanced', progress: 75, color: 'warning' },
    { topic: 'Context API', progress: 0, color: 'secondary' },
  ];
  
  return (
    <Container fluid>
      <h1 style={{ marginBottom: '16px' }}>Learning Statistics</h1>
      <p style={{ color: '#6c757d', marginBottom: '32px' }}>
        Track your learning progress and achievements
      </p>
      
      {/* Overall Progress */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Overall Progress</Card.Title>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>React JS Learning Path</span>
              <strong>79%</strong>
            </div>
            <ProgressBar now={79} variant="success" style={{ height: '24px' }} />
          </div>
        </Card.Body>
      </Card>
      
      {/* Topic Progress */}
      <Card>
        <Card.Body>
          <Card.Title>Topics Progress</Card.Title>
          {learningData.map((item, index) => (
            <div key={index} style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{item.topic}</span>
                <strong>{item.progress}%</strong>
              </div>
              <ProgressBar 
                now={item.progress} 
                variant={item.color} 
                style={{ height: '12px' }} 
              />
            </div>
          ))}
        </Card.Body>
      </Card>
      
      {/* Achievement Cards */}
      <Row className="mt-4">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <div style={{ fontSize: '64px' }}>🏆</div>
              <Card.Title>Days Learned</Card.Title>
              <h2>15 Days</h2>
              <Card.Text className="text-muted">
                Consecutive learning streak
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <div style={{ fontSize: '64px' }}>🎯</div>
              <Card.Title>Projects Completed</Card.Title>
              <h2>3</h2>
              <Card.Text className="text-muted">
                Mini projects finished
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardStats;
