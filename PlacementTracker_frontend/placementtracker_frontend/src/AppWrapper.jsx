import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentApplyForm from './components/StudentApplyForm';
import StudentApplications from './components/StudentApplications';
import AdminApplications from './components/AdminApplications';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import './AppWrapper.css';
import { AuthContext } from './AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';


function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {

  const { token, role, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  }

  return (
        <div className="app-container">
          <nav className="navbar">
            <Link to="/">Placement Tracker</Link>
            
            {/* {!token && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}          */}
 
            {token && <button className='logout-button' onClick={handleLogout}>Logout</button>}

          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/register" element={<Register />} />
            <Route path="/apply" element={<StudentApplyForm />} />
            <Route path="/student" element={<StudentApplications />} />
            <Route path="/admin/all" element={<AdminApplications />} />
          </Routes>
        </div>
  );
}

export default AppWrapper;
