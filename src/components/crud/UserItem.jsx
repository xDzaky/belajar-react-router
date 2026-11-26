import { ListGroup, Badge, Button, Spinner } from 'react-bootstrap';

function UserItem({ user, onToggleStatus, onEdit, onDelete, isLoadingStatus }) {
  const isInactive = user.status === 'inactive';

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3">
      {/* Sisi Kiri: Nama, Status, Email */}
      <div>
        <div className="d-flex align-items-center gap-2 mb-1">
          <strong className="fs-6">{user.name}</strong>
          <Badge
            bg={isInactive ? 'secondary' : 'success'}
            className="text-capitalize"
          >
            {user.status || 'active'}
          </Badge>
        </div>
        <small className="text-muted">{user.email}</small>
      </div>

      {/* Sisi Kanan: Tombol Aksi */}
      <div className="d-flex gap-2 align-items-center">
        {/* Tombol PATCH: Toggle Status */}
        <Button
          variant={isInactive ? 'outline-success' : 'outline-secondary'}
          size="sm"
          disabled={isLoadingStatus}
          onClick={() => onToggleStatus(user)}
        >
          {isLoadingStatus ? (
            <Spinner size="sm" animation="border" />
          ) : isInactive ? (
            'Aktifkan'
          ) : (
            'Nonaktifkan'
          )}
        </Button>

        {/* Tombol PUT: Edit Data */}
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onEdit(user)}
        >
          Edit
        </Button>

        {/* Tombol DELETE: Hapus Data */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(user.id)}
        >
          Hapus
        </Button>
      </div>
    </ListGroup.Item>
  );
}

export default UserItem;
