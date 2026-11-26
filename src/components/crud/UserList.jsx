import { Card, Badge, Spinner, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import PaginationControl from './PaginationControl';
import UserItem from './UserItem';

function UserList({ displayedUsers, totalUsers, filteredCount, searchQuery, onSearchChange, isLoading, loadingStatusId, onToggleStatus, onEdit, onDelete, page, totalPages, startIndex, limit, onPageChange }) {

  return (
    <Card className="shadow-sm border-0">
      {/* Header Card */}
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Daftar Pengguna</h5>
        <div className="d-flex gap-2 align-items-center">
          {searchQuery && (
            <Badge bg="info">{filteredCount} Ditemukan</Badge>
          )}
          <Badge bg="primary">{totalUsers} Total Data</Badge>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text id='search-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </InputGroup.Text>
            <Form.Control 
              type='text'
              placeholder='Cari berdasarkan nama atau email...'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            
            {searchQuery && (
              <Button
                variant="outline-secondary"
                onClick={() => onSearchChange('')}
              >
                Reset
              </Button>
            )}
          </InputGroup>
        </div>
        {/* Kondisi 1: Sedang Memuat Data */}
        {isLoading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-2 mb-0">Memuat data...</p>
          </div>
        ) : totalUsers === 0 ? (
          /* Kondisi 2: Data Kosong */
          <div className="text-center py-4 text-muted">
            <p className="mb-0">Belum ada data pengguna.</p>
            <small>Silakan tambahkan data melalui form di atas.</small>
          </div>
        ) : filteredCount === 0 ? (
          <div className="text-center py-4 text-muted">
            <p className="mb-1">Tidak ada pengguna dengan kata kunci &quot;<strong>{searchQuery}</strong>&quot;.</p>
            <Button variant="link" size="sm" onClick={() => onSearchChange('')}>Hapus pencarian</Button>
          </div>
        ) : (
          /* Kondisi 3: Tampilkan List Pengguna */
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
              totalItems={totalUsers}
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
