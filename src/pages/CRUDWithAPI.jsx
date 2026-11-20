import React, { useState } from 'react'
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap'

function CRUD() {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([
    { id: 1, nama: 'Nama Pengguna', email: 'email@gmail.com' },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nama || !email) return
    setUsers([...users, { id: Date.now(), nama, email }])
    setNama('')
    setEmail('')
  }

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <Container className="mt-4 mb-5" style={{ maxWidth: '600px' }}>
      {/* Header / Form Tambah */}
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white p-3">
          <h3 className="mb-0">Tambah Pengguna</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNama">
              <Form.Control
                type="text"
                placeholder="Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Simpan
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Data Pengguna */}
      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <h3 className="mb-3 ">Data Pengguna</h3> <hr />
          <ListGroup variant="flush">
            {users.map((user) => (
              <ListGroup.Item
                key={user.id}
                className="d-flex justify-content-between align-items-center px-0"
              >
                <div>
                  {user.nama}{' '}
                  <span className="text-muted">({user.email})</span>
                </div>
                <div>
                  <a href="#" className="text-secondary text-decoration-none me-2">
                    Edit
                  </a>
                  -
                  <a
                    href="#"
                    className="text-danger text-decoration-none ms-2"
                    onClick={(e) => {
                      e.preventDefault()
                      handleDelete(user.id)
                    }}
                  >
                    Delete
                  </a>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CRUD;