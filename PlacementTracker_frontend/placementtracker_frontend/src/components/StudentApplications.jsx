import React, { useEffect, useState } from 'react';
import api from '../api';

function StudentApplications() {
  const [apps, setApps] = useState([]);
  const [name, setName] = useState('');

  const fetchApplications = async () => {
    const res = await api.get(`/student/applications?studentName=${name}`);
    setApps(res.data);
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
      <button onClick={fetchApplications}>View Applications</button>

      <ul>
        {apps.map(app => (
          <li key={app.id}>{app.companyName} – {app.role} – {app.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentApplications;
