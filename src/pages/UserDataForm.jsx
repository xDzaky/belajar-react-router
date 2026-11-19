import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { userDataSchema } from '../validations/userDataSchema';

function UserDataForm() {
  // State untuk pesan sukses/gagal global
  const [submitStatus, setSubmitStatus] = useState({
    type: '', // 'success' | 'error'
    message: ''
  });

  // State untuk menyimpan data yang berhasil disubmit (untuk ditampilkan)
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isValid,
      isDirty,
    },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
      address: '',
      occupation: '',
      bio: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setSubmitStatus({ type: '', message: '' });
    setSubmittedData(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Full Name:', data.fullName);
      console.log('Email:', data.email);
      console.log('Phone Number:', data.phoneNumber);
      console.log('Gender:', data.gender);
      console.log('Date of Birth:', data.dateOfBirth);
      console.log('Address:', data.address);
      console.log('Occupation:', data.occupation);
      console.log('Bio:', data.bio || '(empty)');
      console.log('Submitted at:', new Date().toISOString());

      setSubmittedData(data);

      setSubmitStatus({
        type: 'success',
        message: 'Data berhasil disimpan!'
      });

      reset();

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan saat menyimpan data.'
      });
    }
  };

  const handleReset = () => {
    reset();
    setSubmitStatus({ type: '', message: '' });
    setSubmittedData(null);
  };

  const handleAutoFillPhone = () => {
    setValue('phoneNumber', '+62 812 3456 7890');
  };

  const handleShowCurrentValues = () => {
    const currentValues = getValues();
    console.log('Current form values:', currentValues);
    alert('Lihat console untuk melihat nilai form saat ini');
  };

  return (
    <Container style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>
        User Data Form
      </h1>
      
      <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '32px' }}>
        Form pendataan pengguna dengan React Hook Form & Zod Validation
      </p>

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

      {submittedData && (
        <Card className="mb-4">
          <Card.Header style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold' }}>
            Data yang Berhasil Dikirim
          </Card.Header>
          <Card.Body>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '4px',
              fontSize: '14px',
              maxHeight: '300px',
              overflow: 'auto'
            }}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </Card.Body>
        </Card>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama lengkap"
            isInvalid={!!errors.fullName}
            disabled={isSubmitting}
            {...register('fullName')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="nama@email.com"
            isInvalid={!!errors.email}
            disabled={isSubmitting}
            {...register('email')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number *</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="+62 812 3456 7890"
            isInvalid={!!errors.phoneNumber}
            disabled={isSubmitting}
            {...register('phoneNumber')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Hanya angka, +, -, dan spasi. Minimal 10 digit.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender *</Form.Label>
          <Form.Select 
            isInvalid={!!errors.gender}
            disabled={isSubmitting}
            {...register('gender')}
          >
            <option value="">Pilih Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.gender?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth *</Form.Label>
          <Form.Control 
            type="date" 
            isInvalid={!!errors.dateOfBirth}
            disabled={isSubmitting}
            {...register('dateOfBirth')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dateOfBirth?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address *</Form.Label>
          <Form.Control 
            as="textarea"
            placeholder="Masukkan alamat lengkap"
            rows={4}
            isInvalid={!!errors.address}
            disabled={isSubmitting}
            {...register('address')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Occupation *</Form.Label>
          <Form.Select 
            isInvalid={!!errors.occupation}
            disabled={isSubmitting}
            {...register('occupation')}
          >
            <option value="">Pilih Occupation</option>
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="freelancer">Freelancer</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="unemployed">Unemployed</option>
            <option value="other">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.occupation?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Bio (Optional)</Form.Label>
          <Form.Control 
            as="textarea"
            placeholder="Tulis bio singkat tentang Anda..."
            rows={3}
            isInvalid={!!errors.bio}
            disabled={isSubmitting}
            {...register('bio')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bio?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Maksimal 200 karakter. Tidak wajib diisi.
          </Form.Text>
        </Form.Group>

        <Row className="g-2">
          <Col>
            <Button 
              variant="primary" 
              type="submit" 
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
            </Button>
          </Col>
          <Col>
            <Button 
              variant="secondary" 
              type="button"
              style={{ width: '100%' }}
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset Form
            </Button>
          </Col>
        </Row>

        <Row className="g-2 mt-3">
          <Col>
            <Button 
              variant="outline-info" 
              type="button"
              size="sm"
              style={{ width: '100%' }}
              onClick={handleAutoFillPhone}
              disabled={isSubmitting}
            >
              Auto-fill Phone (setValue)
            </Button>
          </Col>
          <Col>
            <Button 
              variant="outline-secondary" 
              type="button"
              size="sm"
              style={{ width: '100%' }}
              onClick={handleShowCurrentValues}
              disabled={isSubmitting}
            >
              Show Values (getValues)
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default UserDataForm;
