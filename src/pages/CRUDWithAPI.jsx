import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Badge,
  ListGroup,
  Pagination,
} from 'react-bootstrap';
import { personService } from '../services/personService';

// 1. Skema Validasi Form dengan Zod
const personSchema = z.object({
  name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
});

function CRUD() {
  // ==========================================
  // STATE DATA & STATUS
  // ==========================================
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loadingStatusId, setLoadingStatusId] = useState(null);

  // ==========================================
  // LOGIKA PAGINATION (Sangat Sederhana)
  // ==========================================
  const [page, setPage] = useState(1);
  const limit = 5; // 5 data per halaman

  // Potong array data untuk halaman saat ini
  const startIndex = (page - 1) * limit;
  const displayedUsers = users.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(users.length / limit);

  // Buat deretan nomor halaman [1, 2, 3, ...]
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // ==========================================
  // FORM HANDLING (React Hook Form)
  // ==========================================
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

  // ==========================================
  // OPERASI API (CRUD)
  // ==========================================

  // 1. Ambil Data (GET)
  const loadUsers = () => {
    personService
      .getAll()
      .then((res) => {
        setUsers(res.data);
        setErrorMessage(null);
      })
      .catch(() => {
        setErrorMessage('Gagal memuat data dari server. Pastikan json-server aktif.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 2. Simpan Data: Tambah (POST) atau Edit (PUT)
  const onSubmit = async (formData) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (editingId) {
        // Mode Edit (PUT)
        const currentUser = users.find((u) => u.id === editingId);
        const payload = { ...formData, status: currentUser?.status || 'active' };

        const res = await personService.update(editingId, payload);
        setUsers(users.map((u) => (u.id === editingId ? res.data : u)));
        setSuccessMessage('Data pengguna berhasil diperbarui!');
        setEditingId(null);
      } else {
        // Mode Tambah (POST)
        const payload = { ...formData, status: 'active' };
        const res = await personService.create(payload);
        setUsers([...users, res.data]);
        setSuccessMessage('Pengguna baru berhasil ditambahkan!');
      }
      reset();
    } catch {
      setErrorMessage('Terjadi kesalahan saat menyimpan data.');
    }
  };

  // 3. Ubah Status Aktif/Nonaktif (PATCH)
  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === 'inactive' ? 'active' : 'inactive';
    setLoadingStatusId(user.id);
    setErrorMessage(null);

    try {
      const res = await personService.patchStatus(user.id, nextStatus);
      setUsers(
        users.map((u) => (u.id === user.id ? { ...u, status: res.data.status } : u))
      );
      setSuccessMessage(`Status ${user.name} berhasil diubah.`);
    } catch {
      setErrorMessage('Gagal mengubah status pengguna.');
    } finally {
      setLoadingStatusId(null);
    }
  };

  // 4. Tombol Edit (Isi form dengan data yang dipilih)
  const handleStartEdit = (user) => {
    setEditingId(user.id);
    setValue('name', user.name);
    setValue('email', user.email);
    setSuccessMessage(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
  };

  // 5. Hapus Data (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pengguna ini?')) return;

    setErrorMessage(null);
    try {
      await personService.delete(id);
      setUsers(users.filter((u) => u.id !== id));
      setSuccessMessage('Pengguna berhasil dihapus.');

      // Jika data terakhir di halaman ini dihapus, mundur 1 halaman
      if (displayedUsers.length === 1 && page > 1) {
        setPage(page - 1);
      }

      if (editingId === id) handleCancelEdit();
    } catch {
      setErrorMessage('Gagal menghapus pengguna.');
    }
  };

  // ==========================================
  // TAMPILAN (JSX)
  // ==========================================
  return (
    <Container className="mt-4 mb-5" style={{ maxWidth: '760px' }}>
      {/* Pesan Alert Sukses / Error */}
      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" dismissible onClose={() => setErrorMessage(null)}>
          <div className="d-flex justify-content-between align-items-center">
            <span>{errorMessage}</span>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                setIsLoading(true);
                loadUsers();
              }}
            >
              Coba Lagi
            </Button>
          </div>
        </Alert>
      )}

      {/* FORM INPUT PENGGUNA */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header
          className={`${
            editingId ? 'bg-warning text-dark' : 'bg-primary text-white'
          } p-3`}
        >
          <h5 className="mb-0">
            {editingId ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
          </h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                  'Perbarui'
                ) : (
                  'Simpan'
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

      {/* DAFTAR PENGGUNA BERUPA CARD */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Daftar Pengguna</h5>
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="primary">{users.length} Total Data</Badge>
          </div>
        </Card.Header>

        <Card.Body>
          {/* Kondisi 1: Sedang Memuat Data */}
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="text-muted mt-2 mb-0">Memuat data...</p>
            </div>
          ) : users.length === 0 ? (
            /* Kondisi 2: Data Kosong */
            <div className="text-center py-4 text-muted">
              <p className="mb-0">Belum ada data pengguna.</p>
              <small>Silakan tambahkan data melalui form di atas.</small>
            </div>
          ) : (
            /* Kondisi 3: Tampilkan Daftar Pengguna secara Horizontal */
            <>
              <ListGroup variant="flush">
                {displayedUsers.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    className="d-flex justify-content-between align-items-center px-0 py-3"
                  >
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <strong className="fs-6">{user.name}</strong>
                        <Badge
                          bg={user.status === 'inactive' ? 'secondary' : 'success'}
                          className="text-capitalize"
                        >
                          {user.status || 'active'}
                        </Badge>
                      </div>
                      <small className="text-muted">{user.email}</small>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="d-flex gap-2 align-items-center">
                      <Button
                        variant={
                          user.status === 'inactive'
                            ? 'outline-success'
                            : 'outline-secondary'
                        }
                        size="sm"
                        disabled={loadingStatusId === user.id}
                        onClick={() => handleToggleStatus(user)}
                      >
                        {loadingStatusId === user.id ? (
                          <Spinner size="sm" animation="border" />
                        ) : user.status === 'inactive' ? (
                          'Aktifkan'
                        ) : (
                          'Nonaktifkan'
                        )}
                      </Button>

                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleStartEdit(user)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* NAVIGASI PAGINATION */}
              {totalPages > 1 && (
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 pt-3 border-top gap-2">
                  <small className="text-muted">
                    Menampilkan data ke-<strong>{startIndex + 1}</strong> sampai{' '}
                    <strong>{Math.min(startIndex + limit, users.length)}</strong> dari{' '}
                    <strong>{users.length}</strong> pengguna
                  </small>

                  <Pagination className="mb-0">
                    {/* Tombol Mundur */}
                    <Pagination.Prev
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    />

                    {/* Nomor Halaman [1, 2, ...] */}
                    {pageNumbers.map((num) => (
                      <Pagination.Item
                        key={num}
                        active={num === page}
                        onClick={() => setPage(num)}
                      >
                        {num}
                      </Pagination.Item>
                    ))}

                    {/* Tombol Maju */}
                    <Pagination.Next
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CRUD;
