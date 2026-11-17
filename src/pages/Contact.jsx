import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Track unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Detect when form has data (unsaved changes)
  useEffect(() => {
    const hasData = formData.name || formData.email || formData.message;
    setHasUnsavedChanges(hasData);
  }, [formData]);
  
  // Navigation Guard - Prevent leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires this for the dialog
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulasi kirim form
    alert(`Terima kasih ${formData.name}! Pesan kamu sudah dikirim.`);
    
    // Reset form & clear unsaved changes flag
    setFormData({ name: '', email: '', message: '' });
    setHasUnsavedChanges(false);
    
    // Redirect ke home setelah 1 detik
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  // Handle cancel dengan confirm
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        'Ada perubahan yang belum disimpan. Yakin ingin keluar?'
      );
      if (confirm) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '32px' }}>Contact Me 📧</h1>
      
      {/* Warning untuk unsaved changes */}
      {hasUnsavedChanges && (
        <Alert variant="warning">
          ⚠️ Ada perubahan yang belum disimpan
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama kamu"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tulis pesan kamu di sini..."
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send Message
        </Button>
        
        {/* Cancel button */}
        <Button 
          variant="secondary" 
          onClick={handleCancel}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
