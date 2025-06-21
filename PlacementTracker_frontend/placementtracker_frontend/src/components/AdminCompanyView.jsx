import React, { useEffect, useState } from 'react';
import api from '../api';
import './CompanyView.css';

function AdminCompanyView() {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await api.get(`/admin/company?page=${page}&size=5`);
                setCompanies(res.data.content);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error('Failed to fetch companies:', err);
                setError('Could not load company notifications.');
            }
        };

        fetchCompanies();
    }, [page]);

    return (
        <div className="company-container">
            <h2 className="company-title">All Company Notifications</h2>

            {error && <p className="error">{error}</p>}

            {companies.length === 0 ? (
                <p>No companies available.</p>
            ) : (
                <div className="company-grid">
                    {companies.map((company) => {
                        const validTill = new Date(
                            new Date(company.timestamp).getTime() + company.validity * 60 * 60 * 1000
                        );
                        const day = validTill.getDate().toString().padStart(2, '0');
                        const month = (validTill.getMonth() + 1).toString().padStart(2, '0');
                        const year = validTill.getFullYear();
                        const hour = validTill.getHours().toString().padStart(2, '0');
                        const minute = validTill.getMinutes().toString().padStart(2, '0');
                        const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;

                        return (
                            <div key={company.id} className="company-card">
                                <h3>{company.companyName}</h3>
                                <p><strong>Job Description:</strong> {company.jobDescription}</p>
                                <p><strong>Required CGPA:</strong> {company.requiredCgpa}</p>
                                <p><strong>Allow Backlog History:</strong> {company.allowedBacklogHistory ? 'Yes' : 'No'}</p>
                                <p><strong>Allowed Active Backlogs:</strong> {company.allowActiveBacklog}</p>
                                <p><strong>CTC Slab:</strong> {company.slab}</p>
                                <p><strong>Valid Till:</strong> {formattedDate}</p>
                                <p><strong>Application Count:</strong> {company.applicationCount}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="pagination">
                <button disabled={page <= 0} onClick={() => setPage(page - 1)}>Previous</button>
                <span> Page {page + 1} of {totalPages} </span>
                <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );

}

export default AdminCompanyView;
