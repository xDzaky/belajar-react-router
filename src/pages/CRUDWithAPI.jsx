import { useEffect, useState } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { personService } from '../services/personService';
import UserForm from '../components/crud/UserForm';
import UserList from '../components/crud/UserList';

function CRUD() {
  // ==========================================
  // 1. STATE DATA & FEEDBACK
  // ==========================================
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loadingStatusId, setLoadingStatusId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')

  // Search Logic
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase().trim();
    const matchName = user.name.toLowerCase().includes(query);
    const matchEmail = user.email.toLowerCase().includes(query);
    return matchName || matchEmail
  })

  // ==========================================
  // 2. LOGIKA PAGINATION (5 Data per Halaman)
  // ==========================================
  const [page, setPage] = useState(1);
  const limit = 5;

  const startIndex = (page - 1) * limit;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(filteredUsers.length / limit);

  // Cari object pengguna yang sedang diedit (jika ada)
  const editingUser = users.find((u) => u.id === editingId) || null;

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1)
  }

  // ==========================================
  // 3. OPERASI API (CRUD)
  // ==========================================

  // READ (GET): Mengambil semua data pengguna saat halaman dibuka
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

  // CREATE (POST) & UPDATE (PUT): Menyimpan data dari UserForm
  const handleFormSubmit = async (formData) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (editingId) {
        // Mode UPDATE (PUT): Memperbarui seluruh data
        const payload = {
          ...formData,
          status: editingUser?.status || 'active',
        };
        const res = await personService.update(editingId, payload);
        setUsers(users.map((u) => (u.id === editingId ? res.data : u)));
        setSuccessMessage('Data pengguna berhasil diperbarui!');
        setEditingId(null);
      } else {
        // Mode CREATE (POST): Menambahkan data baru
        const payload = { ...formData, status: 'active' };
        const res = await personService.create(payload);
        setUsers([...users, res.data]);
        setSuccessMessage('Pengguna baru berhasil ditambahkan!');
      }
    } catch {
      setErrorMessage('Terjadi kesalahan saat menyimpan data ke server.');
    }
  };

  // PARTIAL UPDATE (PATCH): Mengubah status aktif / nonaktif
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

  // DELETE: Menghapus data pengguna
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pengguna ini?')) return;

    setErrorMessage(null);
    try {
      await personService.delete(id);
      const remainingUsers = users.filter((u) => u.id !== id);
      setUsers(remainingUsers);
      setSuccessMessage('Pengguna berhasil dihapus.');

      // Jika data terakhir di halaman ini dihapus, mundur 1 halaman
      if (displayedUsers.length === 1 && page > 1) {
        setPage(page - 1);
      }

      if (editingId === id) setEditingId(null);
    } catch {
      setErrorMessage('Gagal menghapus pengguna.');
    }
  };

  // ==========================================
  // 4. TAMPILAN HALAMAN (JSX)
  // ==========================================
  return (
    <Container className="mt-4 mb-5" style={{ maxWidth: '760px' }}>
      {/* Alert Notifikasi Sukses / Error */}
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

      {/* Komponen 1: Form Input Pengguna */}
      <UserForm
        onSubmit={handleFormSubmit}
        editingUser={editingUser}
        onCancelEdit={() => setEditingId(null)}
      />

      {/* Komponen 2: Daftar Pengguna & Pagination */}
      <UserList
        displayedUsers={displayedUsers}
        totalUsers={users.length}
        filteredCount={filteredUsers.length}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isLoading={isLoading}
        loadingStatusId={loadingStatusId}
        onToggleStatus={handleToggleStatus}
        onEdit={(user) => setEditingId(user.id)}
        onDelete={handleDelete}
        page={page}
        totalPages={totalPages}
        startIndex={startIndex}
        limit={limit}
        onPageChange={(targetPage) => setPage(targetPage)}
      />
    </Container>
  );
}

export default CRUD;
