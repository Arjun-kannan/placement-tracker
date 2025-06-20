import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import api from '../api'; // ✅ Import centralized API instance

function Register() {
  const [form, setForm] = useState({
    rollNumber: '', name: '', email: '', password: ''
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post('/api/v1/auth/register', form); // ✅ Use centralized API
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <input
          placeholder="Roll Number"
          onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
        /><br />
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br />
        <button onClick={handleRegister}>Register</button>
        <button onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    </div>
  );
}

export default Register;
