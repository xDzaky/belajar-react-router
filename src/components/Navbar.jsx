import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * NavbarComponent - Reusable Navigation Bar
 * @param {string} brandName - The brand/app name displayed in navbar
 * @param {Array} menuItems - Array of menu objects with label and href
 */
function NavbarComponent({ brandName, menuItems }) {
  return (
    <>
      <Navbar fixed="top" bg="light" data-bs-theme="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">{brandName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {menuItems.map((item, index) => (
                <Nav.Link 
                  key={index} 
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

// PropTypes untuk validasi props
NavbarComponent.propTypes = {
  brandName: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Default props jika tidak diberikan
NavbarComponent.defaultProps = {
  brandName: 'My App',
  menuItems: [
    { label: 'Home', href: '#home' }
  ],
};

export default NavbarComponent;