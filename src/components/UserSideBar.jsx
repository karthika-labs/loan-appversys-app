// UserSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, NavItem } from 'react-bootstrap';
import '../styles/sidebar.css'; // Custom CSS file for the sidebar

const UserSidebar = () => {
  return (
    <div className="sidebar">
      <Container>
        <h4>Welcome User</h4>
        <Nav className="flex-column">
          <NavItem>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <button className="btn btn-danger" onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}>
              Logout
            </button>
          </NavItem>
        </Nav>
      </Container>
    </div>
  );
};

export default UserSidebar;
