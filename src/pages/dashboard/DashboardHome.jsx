import { Container, Row, Col, Card } from 'react-bootstrap';

function DashboardHome() {
  const username = localStorage.getItem('username') || 'User';
  
  return (
    <Container fluid>
      <h1 style={{ marginBottom: '16px' }}>Dashboard Overview</h1>
      <p style={{ color: '#6c757d', marginBottom: '32px' }}>
        Welcome back, {username}!
      </p>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Tasks</Card.Title>
              <h2>10</h2>
              <Card.Text className="text-muted">
                All tasks in your workspace
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <h2>7</h2>
              <Card.Text className="text-muted">
                Tasks you've finished
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <h2>3</h2>
              <Card.Text className="text-muted">
                Tasks waiting for you
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Quick Actions */}
      <Card>
        <Card.Body>
          <Card.Title>Quick Actions</Card.Title>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="btn btn-primary">➕ New Task</button>
            <button className="btn btn-outline-secondary">📊 View Reports</button>
            <button className="btn btn-outline-secondary">⚙️ Settings</button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardHome;
