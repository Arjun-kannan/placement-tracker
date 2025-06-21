import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import api from '../api';

function Register() {
  const [form, setForm] = useState({
    rollNumber: '',
    name: '',
    email: '',
    password: '',
    cgpa: '',
    activeBacklogs: '',
    backlogHistory: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.rollNumber.trim()) newErrors.name = 'Roll number is required';
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    if (!form.cgpa || form.cgpa < 0 || form.cgpa > 10)
      newErrors.cgpa = 'CGPA must be between 0 and 10';
    if (form.activeBacklogs < 0)
      newErrors.activeBacklogs = 'Backlogs cannot be negative';
    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post('/api/v1/auth/register', form);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setErrors({ api: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        <input
          placeholder="Roll Number"
          onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
        />
        {errors.rollNumber && <p className="error">{errors.rollNumber}</p>}
        <br />

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <br />

        {/* CGPA, Backlogs, History on one line */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            step="0.01"
            placeholder="CGPA (0 - 10)"
            onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
          />
          <input
            type="number"
            placeholder="Active Backlogs"
            onChange={(e) =>
              setForm({ ...form, activeBacklogs: e.target.value })
            }
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '8px', color: 'black' }}>
            History of Backlogs
            <input
              type="checkbox"
              checked={form.backlogHistory}
              onChange={(e) =>
                setForm({ ...form, backlogHistory: e.target.checked })
              }
            />
          </label>
        </div>
        {errors.cgpa && <p className="error">{errors.cgpa}</p>}
        {errors.activeBacklogs && (
          <p className="error">{errors.activeBacklogs}</p>
        )}

        <br />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <br />

        {errors.api && <p className="error">{errors.api}</p>}

        <button onClick={handleRegister}>Register</button>
        <button onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    </div>
  );
}

export default Register;
