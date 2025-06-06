import React, { useState, useEffect } from 'react';
import api from '../api';

function AdminApplications() {
  const [apps, setApps] = useState([]);

  const fetch = async () => {
    const res = await api.get('/admin/applications');
    setApps(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/applications/${id}`, { status });
    fetch(); // reload list
  };

  return (
    <div>
      <h2>All Applications</h2>
      <ul>
        {apps.map(app => (
          <li key={app.id}>
            {app.studentName} | {app.companyName} | {app.status}
            <button onClick={() => updateStatus(app.id, 'Approved')}>Approve</button>
            <button onClick={() => updateStatus(app.id, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminApplications;
