import { Pagination } from 'react-bootstrap';

function PaginationControl({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  limit,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  // Deretan nomor halaman [1, 2, 3, ...]
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startDisplay = startIndex + 1;
  const endDisplay = Math.min(startIndex + limit, totalItems);

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 pt-3 border-top gap-2">
      {/* Keterangan Halaman */}
      <small className="text-muted">
        Menampilkan data ke-<strong>{startDisplay}</strong> sampai{' '}
        <strong>{endDisplay}</strong> dari <strong>{totalItems}</strong> pengguna
      </small>

      {/* Navigasi Tombol Pagination */}
      <Pagination className="mb-0">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {pageNumbers.map((num) => (
          <Pagination.Item
            key={num}
            active={num === currentPage}
            onClick={() => onPageChange(num)}
          >
            {num}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}

export default PaginationControl;
