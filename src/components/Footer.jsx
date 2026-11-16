import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Footer Component - Reusable footer with social links and menus
 * @param {string} companyName - Company/brand name
 * @param {string} copyright - Copyright text
 * @param {string} description - Short description about the company
 * @param {Array} companyMenu - Array of company menu items
 * @param {Array} helpMenu - Array of help menu items
 */
function Footer({ companyName, copyright, description, companyMenu, helpMenu }) {
    return (
        <footer className="py-5 bg-light border-top">
            <Container fluid="lg">
                <Row className="g-4 gy-md-5">
                    {/* Brand & Social Links */}
                    <Col xs={12} lg={4} className="pe-lg-4">
                        <h5 className="fw-bold mb-3">{companyName}</h5>
                        <p className="text-secondary mt-3 mb-4">
                            {description}
                        </p>
                    </Col>

                    {/* Company Menu */}
                    <Col xs={6} md={3} lg={4}>
                        <p className="text-uppercase text-secondary fw-semibold fs-7 tracking-wider mb-3">Company</p>
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            {companyMenu.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href} className="text-dark text-decoration-none hover-blue">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Help Menu */}
                    <Col xs={6} md={3} lg={4}>
                        <p className="text-uppercase text-secondary fw-semibold fs-7 tracking-wider mb-3">Help</p>
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            {helpMenu.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href} className="text-dark text-decoration-none hover-blue">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>

                <hr className="my-5 border-secondary-subtle" />

                <p className="text-center text-secondary mb-0 small">
                    {copyright}
                </p>
            </Container>
        </footer>
    );
}

// PropTypes validation
Footer.propTypes = {
    companyName: PropTypes.string.isRequired,
    copyright: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    socialLinks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            iconPath: PropTypes.string.isRequired,
        })
    ).isRequired,
    companyMenu: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
    helpMenu: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
};

// Default props
Footer.defaultProps = {
    companyName: 'My Company',
    copyright: '© 2026 All rights reserved.',
    description: 'We build amazing products.',
    companyMenu: [],
    helpMenu: [],
};

export default Footer;