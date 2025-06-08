import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentApplyForm from './components/StudentApplyForm';
import StudentApplications from './components/StudentApplications';
import AdminApplications from './components/AdminApplications';
import './App.css'; // Add your global styles here

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/apply">Apply</Link>
          <Link to="/student">My Applications</Link>
          <Link to="/admin">Admin Panel</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Welcome to Placement Tracker</h2>} />
          <Route path="/apply" element={<StudentApplyForm />} />
          <Route path="/student" element={<StudentApplications />} />
          <Route path="/admin" element={<AdminApplications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
