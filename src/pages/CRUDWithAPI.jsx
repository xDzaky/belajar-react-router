import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  Spinner,
  Alert,
  Badge,
} from 'react-bootstrap';
import { personService } from '../services/personService';

// Skema Validasi Zod
const personSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nama harus memiliki minimal 3 karakter' }),
  email: z
    .string()
    .email({ message: 'Format email tidak valid (contoh: nama@domain.com)' }),
});

function CRUD() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // Fetch Data Pengguna (READ / GET)
  const fetchUsers = () => {
    personService
      .getAll()
      .then((response) => {
        setUsers(response.data);
        setErrorMessage(null);
      })
      .catch(() => {
        setErrorMessage(
          'Gagal mengambil data dari server. Pastikan json-server berjalan (npm run server).'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRetry = () => {
    setIsLoading(true);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Submit Form: CREATE (POST) atau UPDATE (PUT)
  const onSubmit = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (editingId) {
        // Mode UPDATE (PUT)
        const response = await personService.update(editingId, data);
        setUsers(users.map((u) => (u.id === editingId ? response.data : u)));
        setSuccessMessage('Data pengguna berhasil diperbarui!');
        setEditingId(null);
      } else {
        // Mode CREATE (POST)
        const response = await personService.create(data);
        setUsers([...users, response.data]);
        setSuccessMessage('Pengguna baru berhasil ditambahkan!');
      }
      reset();
    } catch {
      setErrorMessage('Terjadi kesalahan saat menyimpan data ke server.');
    }
  };

  // Handle Edit
  const handleEdit = (user) => {
    setEditingId(user.id);
    setValue('name', user.name);
    setValue('email', user.email);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  // Batal Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
  };

  // Handle Delete (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return;

    setErrorMessage(null);
    try {
      await personService.delete(id);
      setUsers(users.filter((u) => u.id !== id));
      setSuccessMessage('Pengguna berhasil dihapus.');
      if (editingId === id) handleCancelEdit();
    } catch {
      setErrorMessage('Gagal menghapus pengguna dari server.');
    }
  };

  return (
    <Container className="mt-4 mb-5" style={{ maxWidth: '650px' }}>
      {/* Alert Notifikasi */}
      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" dismissible onClose={() => setErrorMessage(null)}>
          <div className="d-flex justify-content-between align-items-center">
            <span>{errorMessage}</span>
            <Button variant="outline-danger" size="sm" onClick={handleRetry}>
              Coba Lagi
            </Button>
          </div>
        </Alert>
      )}

      {/* Form Card (Tambah / Edit Pengguna) */}
      <Card className="shadow-sm border-0">
        <Card.Header
          className={`${
            editingId ? 'bg-warning text-dark' : 'bg-primary text-white'
          } p-3`}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              {editingId ? '✏️ Edit Pengguna' : 'Tambah Pengguna'}
            </h4>
            {editingId && <Badge bg="dark">ID: {editingId}</Badge>}
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Input Nama */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama lengkap"
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

            {/* Tombol Aksi */}
            <div className="d-flex gap-2">
              <Button
                variant={editingId ? 'warning' : 'primary'}
                type="submit"
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" />
                    Menyimpan...
                  </>
                ) : editingId ? (
                  'Perbarui Pengguna'
                ) : (
                  'Simpan Pengguna'
                )}
              </Button>

              {editingId && (
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Batal
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* List Data Pengguna */}
      <Card className="mt-4 shadow-sm border-0">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Daftar Pengguna</h5>
          <Badge bg="secondary">{users.length} Data</Badge>
        </Card.Header>
        <Card.Body>
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="text-muted mt-2 mb-0">Memuat data dari API...</p>
            </div>
          ) : users.length === 0 ? (
            /* Empty State */
            <div className="text-center py-4 text-muted">
              <p className="mb-0">Belum ada data pengguna.</p>
              <small>Gunakan form di atas untuk menambahkan data baru.</small>
            </div>
          ) : (
            /* Data List */
            <ListGroup variant="flush">
              {users.map((user) => (
                <ListGroup.Item
                  key={user.id}
                  className="d-flex justify-content-between align-items-center px-2 py-3"
                >
                  <div>
                    <strong className="d-block">{user.name}</strong>
                    <small className="text-muted">{user.email}</small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CRUD;
