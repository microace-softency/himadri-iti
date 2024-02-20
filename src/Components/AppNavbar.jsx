import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../App.css"

function AppNavbar() {
  const [isFixed, setIsFixed] = useState(false)
  const handleDownloadPDF = () => {
    // Replace 'your-pdf-file.pdf' with the actual filename of your PDF
    const pdfUrl = '/Prospectus.pdf';

    // Create a new anchor element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank'; // Open in a new tab/window

    // Trigger a click event on the anchor element
    link.click();
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 131) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-100">
      <Navbar expand="md" data-bs-theme="dark" className="bg-p1" fixed={isFixed ? 'top' : ''} style={{background:"#590000", color:"white"}}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginLeft: 'auto' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-around w-100" style={{fontSize:"20px", color:"white"}}>
              <Nav.Link as={Link} to="/"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                } >Home</Nav.Link>
              <Nav.Link as={Link} to="/about"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }>About us</Nav.Link>
              <Nav.Link as={Link} to="/courses"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }>Courses</Nav.Link>
              <NavDropdown title="Admission" id="basic-nav-dropdown">
                <NavDropdown.Item href="#process">Process of Admission</NavDropdown.Item>
                <NavDropdown.Item target="_blank">Online Form</NavDropdown.Item>
                {/* <NavDropdown.Item href="admissionForm" target="_blank">Online Form</NavDropdown.Item> */}
                {/* <NavDropdown.Item onClick={handleDownloadPDF}>Prospectus</NavDropdown.Item> */}
              </NavDropdown>
              <Nav.Link as={Link} to="/events"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }>Events</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
export default AppNavbar;