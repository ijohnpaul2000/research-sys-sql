import React, { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Navigationbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="/" className="brand">
          CEIT Manuscript <br /> Information System
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-end w-100">
            <Nav.Link>
              <Link to="/guest" className="link">
                Guest Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/login" className="link_user">
                Login
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
