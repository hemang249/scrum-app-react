import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Header = (props) => {
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Navbar.Brand className="text-center">
        <strong>Scrum App</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link className="text-light" href="/home">
            Home
          </Nav.Link>
          <Nav.Link className="text-light" eventKey={2} href="/">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
