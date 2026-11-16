import PropTypes from 'prop-types';

/**
 * Card Component - Reusable card with children props
 * Demonstrates the use of children props for component composition
 * 
 * @param {string} title - Card title (optional)
 * @param {React.ReactNode} children - Content to be rendered inside the card
 * @param {string} variant - Card style variant (default, primary, success, danger)
 * @param {string} className - Additional CSS classes
 */
function Card({ title, children, variant = 'default', className = '' }) {
  // Variant color mapping
  const variantStyles = {
    default: {
      border: '1px solid #ddd',
      backgroundColor: '#fff',
    },
    primary: {
      border: '1px solid #007bff',
      backgroundColor: '#f0f8ff',
    },
    success: {
      border: '1px solid #28a745',
      backgroundColor: '#f0fff4',
    },
    danger: {
      border: '1px solid #dc3545',
      backgroundColor: '#fff5f5',
    },
    warning: {
      border: '1px solid #ffc107',
      backgroundColor: '#fffbf0',
    },
  };

  const cardStyle = {
    ...variantStyles[variant],
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  return (
    <div style={cardStyle} className={className}>
      {title && (
        <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>
          {title}
        </h3>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// PropTypes validation
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning']),
  className: PropTypes.string,
};

// Default props
Card.defaultProps = {
  title: null,
  variant: 'default',
  className: '',
};

export default Card;
