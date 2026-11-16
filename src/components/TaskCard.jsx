import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

/**
 * TaskCard Component - Display individual task with actions
 * Demonstrates passing multiple types of props including functions
 * 
 * @param {number} id - Task ID
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @param {string} status - Task status (pending, in-progress, completed)
 * @param {string} priority - Task priority (low, medium, high)
 * @param {function} onDelete - Callback when delete button clicked
 * @param {function} onStatusChange - Callback when status changes
 * @param {function} onClick - Callback when card is clicked
 */
function TaskCard({ 
  id, 
  title, 
  description, 
  status, 
  priority, 
  onDelete, 
  onStatusChange,
  onClick 
}) {
  // Status badge styles
  const statusStyles = {
    pending: { bg: '#ffc107', color: '#000' },
    'in-progress': { bg: '#007bff', color: '#fff' },
    completed: { bg: '#28a745', color: '#fff' },
  };

  // Priority badge styles
  const priorityStyles = {
    low: { bg: '#6c757d', color: '#fff' },
    medium: { bg: '#fd7e14', color: '#fff' },
    high: { bg: '#dc3545', color: '#fff' },
  };

  const cardStyle = {
    border: '1px solid #e1e4e8',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: status === 'completed' ? '#f0fff4' : '#fff',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s',
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      style={cardStyle} 
      onClick={handleCardClick}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '18px',
            textDecoration: status === 'completed' ? 'line-through' : 'none',
            color: status === 'completed' ? '#6c757d' : '#24292e'
          }}>
            {title}
          </h4>
          <p style={{ 
            margin: '0 0 12px 0', 
            color: '#586069',
            fontSize: '14px'
          }}>
            {description}
          </p>
          
          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              ...statusStyles[status],
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
            }}>
              {status}
            </span>
            <span style={{
              ...priorityStyles[priority],
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
            }}>
              {priority} Priority
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button 
          variant="outline-primary" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(id);
          }}
        >
          {status === 'completed' ? 'Reopen' : 'Complete'}
        </Button>
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

// PropTypes validation
TaskCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.oneOf(['pending', 'in-progress', 'completed']).isRequired,
  priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

// Default props
TaskCard.defaultProps = {
  description: 'No description provided',
  onClick: null,
};

export default TaskCard;
