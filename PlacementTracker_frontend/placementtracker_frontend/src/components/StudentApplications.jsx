import React, { useEffect, useState } from 'react';
import api from '../api';
import './StudentApplications.css';

function StudentApplications() {
  const [apps, setApps] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchApplications = async () => {
    console.log('Fetching applications for:', name);
    if (!name) {
      alert('Please enter your name');
      return;
    }
    const res = await api.get(`/student/applications/${name}?page=${page}&size=5`);
    setApps(res.data.content);
    setTotalPages(res.data.totalPages);
  };

  return (
    <div className="student-container">
      <h2>Your Applications</h2>
      <div className="input-group">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={fetchApplications}>View Applications</button>
      </div>

      <ul className="application-list">
        {apps.map(app => (
          <li key={app.id} className="application-item">
            <span>
              {app.companyName} – {app.role}
            </span>
            <span className="status">{app.status}</span>
          </li>
        ))}
      </ul>
      {apps.length === 0 && <p>No applications found.</p>}

      {/* Pagination controls */}
      <div>
        <button disabled={page <= 0} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {page + 1} of {totalPages} </span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

    </div>
  );
}

export default StudentApplications;
