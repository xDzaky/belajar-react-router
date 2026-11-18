import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

/**
 * ContactFormManual - Implementasi Form Handling Manual dengan useState
 * 
 * Tujuan:
 * - Memahami Controlled Components
 * - Memahami pengelolaan form dengan useState
 * - Memahami validasi manual
 * - Memahami handling submit
 * 
 * Ini adalah pendekatan MANUAL tanpa library.
 * Nanti bandingkan dengan implementasi React Hook Form!
 */
function ContactFormManual() {
  // State untuk menyimpan nilai semua input form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // State untuk error messages per field
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // State untuk pesan sukses/gagal global
  const [submitStatus, setSubmitStatus] = useState({
    type: '', // 'success' | 'error'
    message: ''
  });

  // State untuk loading (opsional, untuk UX)
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handler untuk perubahan input
   * Menggunakan spread operator untuk mempertahankan nilai field lain
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update nilai input
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error untuk field yang sedang diedit
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    // Clear status submit jika user mulai mengedit lagi
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  /**
   * Validasi manual untuk setiap field
   * Returns true jika valid, false jika ada error
   */
  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      subject: '',
      message: ''
    };
    let isValid = true;

    // Validasi Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name wajib diisi';
      isValid = false;
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name minimal 3 karakter';
      isValid = false;
    }

    // Validasi Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
      isValid = false;
    } else {
      // Simple email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
        isValid = false;
      }
    }

    // Validasi Subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject wajib diisi';
      isValid = false;
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject minimal 5 karakter';
      isValid = false;
    }

    // Validasi Message
    if (!formData.message.trim()) {
      newErrors.message = 'Message wajib diisi';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message minimal 10 karakter';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handler untuk submit form
   * Menggunakan e.preventDefault() untuk mencegah reload halaman
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // ← Penting! Mencegah reload halaman
    
    // Reset status
    setSubmitStatus({ type: '', message: '' });

    // Validasi form
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Mohon periksa kembali input Anda.'
      });
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    try {
      // Simulasi API call (di real app, ini akan menjadi fetch/axios)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Tampilkan data yang disubmit ke console
      console.log('Full Name:', formData.fullName);
      console.log('Email:', formData.email);
      console.log('Subject:', formData.subject);
      console.log('Message:', formData.message);
      console.log('Submitted at:', new Date().toISOString());

      // Tampilkan pesan sukses
      setSubmitStatus({
        type: 'success',
        message: 'Pesan berhasil dikirim uy!'
      });

      // Reset form setelah submit berhasil
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan saat mengirim pesan.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>
        Contact Form
      </h1>
      
      {/* Global Status Message */}
      {submitStatus.message && (
        <Alert 
          variant={submitStatus.type === 'success' ? 'success' : 'danger'} 
          dismissible 
          onClose={() => setSubmitStatus({ type: '', message: '' })}
          style={{ marginBottom: '24px' }}
        >
          {submitStatus.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Full Name Field */}
        <Form.Group className="mb-3">
          <Form.Label>Full Name *</Form.Label>
          <Form.Control 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            isInvalid={!!errors.fullName}
            disabled={isSubmitting}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email Field */}
        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            isInvalid={!!errors.email}
            disabled={isSubmitting}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Subject Field */}
        <Form.Group className="mb-3">
          <Form.Label>Subject *</Form.Label>
          <Form.Control 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Masukkan subject pesan"
            isInvalid={!!errors.subject}
            disabled={isSubmitting}
          />
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Message Field */}
        <Form.Group className="mb-3">
          <Form.Label>Message *</Form.Label>
          <Form.Control 
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tulis pesan Anda di sini..."
            rows={5}
            isInvalid={!!errors.message}
            disabled={isSubmitting}
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <Button 
          variant="primary" 
          type="submit" 
          style={{ width: '100%' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
        </Button>
      </Form>

    </Container>
  );
}

export default ContactFormManual;
