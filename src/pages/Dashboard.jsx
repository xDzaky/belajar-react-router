import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TaskCard from '../components/TaskCard';

/**
 * Dashboard Page Component
 * Demonstrates Props usage, useState, and component composition
 * 
 * @param {string} userName - User's name
 * @param {number} totalTasks - Total number of tasks
 * @param {number} completedTasks - Number of completed tasks
 * @param {Array} recentTasks - Array of recent tasks to display
 */
function Dashboard({ userName, totalTasks, completedTasks, recentTasks }) {
  // State untuk demo tasks (jika tidak ada recentTasks dari props)
  const [tasks, setTasks] = useState(recentTasks);

  // Calculate stats
  const pendingTasks = totalTasks - completedTasks;

  // Handler untuk delete task
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
      alert(`Task ${taskId} deleted!`);
    }
  };

  // Handler untuk change status
  const handleStatusChange = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'completed' ? 'pending' : 'completed'
        };
      }
      return task;
    }));
  };

  // Handler untuk card click
  const handleTaskClick = (taskId) => {
    alert(`Viewing details for task ${taskId}`);
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Welcome back, {userName}! 👋
        </h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          Here's what's happening with your tasks today.
        </p>
      </div>

      {/* Simple Stats Cards */}
      <Row className="mb-5">
        <Col md={4}>
          <div style={{
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '24px',
            backgroundColor: '#fff',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <img 
              src="/tasks-tick.svg" 
              alt="Total Tasks" 
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                Total Tasks
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#212529' }}>
                {totalTasks}
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div style={{
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '24px',
            backgroundColor: '#fff',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <img 
              src="/complete.svg" 
              alt="Completed" 
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                Completed
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#212529' }}>
                {completedTasks}
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div style={{
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '24px',
            backgroundColor: '#fff',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <img 
              src="/pending-icon.svg" 
              alt="Pending" 
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                Pending
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#212529' }}>
                {pendingTasks}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Recent Tasks Section */}
      <div>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600', color: '#212529' }}>
          Recent Tasks ({tasks.length})
        </h3>
        
        {tasks.length === 0 ? (
          <div style={{
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '60px 20px',
            backgroundColor: '#fff',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <h4 style={{ color: '#6c757d', marginBottom: '8px' }}>No tasks yet</h4>
            <p style={{ color: '#6c757d', marginBottom: '24px' }}>
              Create your first task to get started!
            </p>
            <Button variant="primary">Create Task</Button>
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
                onClick={handleTaskClick}
              />
            ))}
          </>
        )}
      </div>
    </Container>
  );
}

// PropTypes validation
Dashboard.propTypes = {
  userName: PropTypes.string.isRequired,
  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired,
  recentTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.oneOf(['pending', 'in-progress', 'completed']).isRequired,
      priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
    })
  ).isRequired,
};

// Default props
Dashboard.defaultProps = {
  userName: 'User',
  totalTasks: 0,
  completedTasks: 0,
  recentTasks: [],
};

export default Dashboard;
