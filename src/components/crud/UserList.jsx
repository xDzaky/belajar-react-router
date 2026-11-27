import {
  Card,
  Badge,
  Spinner,
  ListGroup,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import PaginationControl from './PaginationControl';
import UserItem from './UserItem';

function UserList({
  displayedUsers,
  totalUsers,
  filteredCount,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  onResetFilters,
  isLoading,
  loadingStatusId,
  onToggleStatus,
  onEdit,
  onDelete,
  page,
  totalPages,
  startIndex,
  limit,
  onPageChange,
}) {
  const isFiltered = searchQuery !== '' || statusFilter !== 'all' || sortBy !== 'default';

  return (
    <Card className="shadow-sm border-0">
      {/* Header Card */}
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Daftar Pengguna</h5>
        <div className="d-flex gap-2 align-items-center">
          {isFiltered && (
            <Badge bg="info">{filteredCount} Ditemukan</Badge>
          )}
          <Badge bg="primary">{totalUsers} Total Data</Badge>
        </div>
      </Card.Header>

      <Card.Body>
        {/* Kontrol Pencarian, Filter Status & Sorting */}
        <Row className="g-2 mb-3">
          {/* 1. Input Pencarian */}
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Cari nama atau email..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Col>

          {/* 2. Filter Status */}
          <Col sm={6} md={3}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </Form.Select>
          </Col>

          {/* 3. Sorting */}
          <Col sm={6} md={3}>
            <Form.Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="default">Urutan Default</option>
              <option value="name-asc">Nama (A - Z)</option>
              <option value="name-desc">Nama (Z - A)</option>
            </Form.Select>
          </Col>

          {/* 4. Tombol Reset Filter */}
          <Col md={1} className="d-grid">
            <Button
              variant="outline-secondary"
              onClick={onResetFilters}
              disabled={!isFiltered}
              title="Reset Filter & Pencarian"
            >
              Reset
            </Button>
          </Col>
        </Row>

        {/* Kondisi 1: Sedang Memuat Data */}
        {isLoading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-2 mb-0">Memuat data...</p>
          </div>
        ) : totalUsers === 0 ? (
          /* Kondisi 2: Data Master Kosong */
          <div className="text-center py-4 text-muted">
            <p className="mb-0">Belum ada data pengguna.</p>
            <small>Silakan tambahkan data melalui form di atas.</small>
          </div>
        ) : filteredCount === 0 ? (
          /* Kondisi 3: Hasil Pencarian / Filter Tidak Ditemukan */
          <div className="text-center py-4 text-muted">
            <p className="mb-1">
              Tidak ada data yang cocok dengan kriteria pencarian/filter.
            </p>
            <Button variant="link" size="sm" onClick={onResetFilters}>
              Reset Semua Filter
            </Button>
          </div>
        ) : (
          /* Kondisi 4: Tampilkan List Pengguna */
          <>
            <ListGroup variant="flush">
              {displayedUsers.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isLoadingStatus={loadingStatusId === user.id}
                />
              ))}
            </ListGroup>

            {/* Navigasi Pagination */}
            <PaginationControl
              currentPage={page}
              totalPages={totalPages}
              totalItems={filteredCount}
              startIndex={startIndex}
              limit={limit}
              onPageChange={onPageChange}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserList;
