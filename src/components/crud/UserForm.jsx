import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, Form, Button, Spinner } from 'react-bootstrap';

// Skema Validasi Zod
const personSchema = z.object({
  name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
});

function UserForm({ onSubmit, editingUser, onCancelEdit }) {
  const isEditing = Boolean(editingUser);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(personSchema),
    defaultValues: { name: '', email: '' },
  });

  // Saat editingUser berubah (misal tombol edit diklik), isi form
  useEffect(() => {
    if (editingUser) {
      setValue('name', editingUser.name);
      setValue('email', editingUser.email);
    } else {
      reset({ name: '', email: '' });
    }
  }, [editingUser, setValue, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset({ name: '', email: '' });
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header
        className={`${
          isEditing ? 'bg-warning text-dark' : 'bg-primary text-white'
        } p-3`}
      >
        <h5 className="mb-0">
          {isEditing ? '✏️ Edit Pengguna' : 'Tambah Pengguna Baru'}
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Input Nama */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama"
              isInvalid={!!errors.name}
              {...register('name')}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Input Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="nama@email.com"
              isInvalid={!!errors.email}
              {...register('email')}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Tombol Simpan & Batal */}
          <div className="d-flex gap-2">
            <Button
              variant={isEditing ? 'warning' : 'primary'}
              type="submit"
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Menyimpan...
                </>
              ) : isEditing ? (
                'Perbarui'
              ) : (
                'Simpan'
              )}
            </Button>

            {isEditing && (
              <Button
                variant="outline-secondary"
                type="button"
                onClick={onCancelEdit}
              >
                Batal
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserForm;
