import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // Redirect ke home setelah 1 detik
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '32px' }}>Contact Me 📧</h1>
      
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
      </Form>
    </Container>
  );
}

export default Contact;
