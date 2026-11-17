function Loading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Spinning loader */}
      <div style={{
        width: '60px',
        height: '60px',
        border: '6px solid #e9ecef',
        borderTop: '6px solid #0d6efd',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      
      {/* Loading text */}
      <p style={{ 
        marginTop: '24px',
        fontSize: '18px',
        color: '#6c757d',
        fontWeight: '500'
      }}>
        Loading...
      </p>
      
      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loading;
