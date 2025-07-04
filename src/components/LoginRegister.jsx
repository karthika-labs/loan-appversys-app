import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { decode as jwt_decode } from 'jwt-decode';  // Use named import
import { ToastContainer, toast } from 'react-toastify';
import { Container, Tab, Tabs, Form, Button, Alert } from 'react-bootstrap';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [tabKey, setTabKey] = useState('login');
  const [formData, setFormData] = useState({
    mailID: '',
    password: '',
    username: '',
    role: 'applicant',
    phoneno: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await fetch('http://localhost:5123/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mailID: formData.mailID,
          password: formData.password
        })
      });
  
      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
  
          // Dynamically import jwt-decode and decode the token
          const { default: jwt_decode } = await import('jwt-decode');
  
          const decoded = jwt_decode(data.token);  // Decode JWT token
          toast.success('Login successful! Redirecting...');
          // Check role and navigate
          setTimeout(() => {
            if (decoded.role === 'admin' || decoded.role === 'loan_authority') {
              navigate('/admin-dashboard');
            } else {
              navigate('/home');
            }
          }, 1500);
          
        } else {
          toast.error('Login failed: No token received');
        }
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Server error during login');
    }
  };
  
  
  
  
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5123/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Register data:",data);
      if (res.ok) {
        toast.success(data.message);
        setTabKey('login');
        
      } else {
         console.log(data.error || data.message); // Log to console for debugging
         toast.error(data.error || data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Server error during registration');
    }
  };

  return (
    <Container className="mt-5 p-4 border rounded" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4">Loan Portal</h3>
      <Tabs activeKey={tabKey} onSelect={setTabKey} className="mb-3">
        <Tab eventKey="login" title="Login">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="mailID" required onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required onChange={handleInputChange} />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit" variant="primary" className="w-100">Login</Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" required onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="mailID" required onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phoneno" required onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" onChange={handleInputChange}>
                <option value="applicant">User</option> 
                
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required onChange={handleInputChange} />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit" variant="success" className="w-100">Register</Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default LoginRegister;
