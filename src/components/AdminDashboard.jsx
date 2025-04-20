import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Button, Nav } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import People from 'react-bootstrap-icons/dist/icons/people';
import FileEarmarkBarGraph from 'react-bootstrap-icons/dist/icons/file-earmark-bar-graph';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:5123/api/dashboard/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch dashboard stats');

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const chartData = stats
    ? [
        { name: 'Total', value: stats.totalApplications },
        { name: 'Pending', value: stats.pending },
        { name: 'Approved', value: stats.approved },
        { name: 'Rejected', value: stats.rejected },
      ]
    : [];

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white vh-100 p-3">
          <h4 className="mb-4">Hello, Admin</h4>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/view-loan-application" className="text-white">
              View Loan Applications
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="text-white">
              Logout
            </Nav.Link>
            <hr />
            {/* Add more essentials here */}
          </Nav>
        </Col>

        {/* Main content */}
        <Col md={10} className="p-4">
          <h2 className="mb-4">Admin Dashboard</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <Row className="mb-4">
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <FileEarmarkBarGraph size={32} className="mb-2 text-primary" />
                      <Card.Title>Total Applications</Card.Title>
                      <h3>{stats.totalApplications}</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Pending</Card.Title>
                      <h3>{stats.pending}</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Approved</Card.Title>
                      <h3>{stats.approved}</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Rejected</Card.Title>
                      <h3>{stats.rejected}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card>
                <Card.Body>
                  <h5 className="mb-4">Application Status Overview</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#007bff" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
