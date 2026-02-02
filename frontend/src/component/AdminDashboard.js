import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('antrian');
  const [antrian, setAntrian] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({ status: '', date: '' });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  // Check authentication
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const fetchAntrian = async (filterParams = {}) => {
    if (!token) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filterParams).toString();
      const response = await fetch(`http://localhost:3000/api/antrian?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setAntrian(data.data);
      } else {
        setMessage('✗ Gagal mengambil data antrian');
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/antrian/statistics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setStatistics(data.data);
      }
    } catch (error) {
      console.error('Fetch statistics error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    navigate('/admin/login');
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/antrian/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        setMessage('✓ Status antrian diperbarui');
        fetchAntrian(filters);
      } else {
        setMessage('✗ ' + data.message);
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus antrian ini?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/antrian/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setMessage('✓ Antrian dihapus');
        fetchAntrian(filters);
      } else {
        setMessage('✗ ' + data.message);
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    }
  };

  const handleDeleteAntrian = handleDelete;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    if (name === 'status' || name === 'date') {
      fetchAntrian(newFilters);
    }
  };

  useEffect(() => {
    if (token && activeTab === 'antrian') {
      fetchAntrian(filters);
    } else if (token && activeTab === 'statistics') {
      fetchStatistics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, token]);

  if (!token) {
    return <div className="loading">Checking authentication...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-content">
          <h1>📊 Admin Dashboard</h1>
          <p>ICON PLUS Customer Service Management System</p>
        </div>
        <div className="header-actions">
          <span className="user-info">👤 {user.username}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'antrian' ? 'active' : ''}`}
          onClick={() => setActiveTab('antrian')}
        >
          📋 Data Antrian
        </button>
        <button 
          className={`tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          📈 Statistik
        </button>
      </div>

      {activeTab === 'antrian' && (
        <div className="tab-content">
          <div className="filters">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Semua Status</option>
              <option value="menunggu">Menunggu</option>
              <option value="dipanggil">Dipanggil</option>
              <option value="selesai">Selesai</option>
              <option value="batal">Batal</option>
            </select>

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="filter-select"
            />
          </div>

          {loading ? (
            <div className="loading">Memuat data...</div>
          ) : (
            <div className="table-container">
              <table className="antrian-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No. Antrian</th>
                    <th>ID Pelanggan</th>
                    <th>Nama</th>
                    <th>No. Telepon</th>
                    <th>Kategori</th>
                    <th>Status</th>
                    <th>Waktu Masuk</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {antrian.length > 0 ? (
                    antrian.map((item, index) => (
                      <tr key={item.id_pengunjung}>
                        <td>{index + 1}</td>
                        <td><strong>{String(item.no_antrian).padStart(3, '0')}</strong></td>
                        <td>{item.id_pelanggan || '-'}</td>
                        <td>{item.nama}</td>
                        <td>{item.no_telp}</td>
                        <td>{item.kategori_keluhan}</td>
                        <td>
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id_pengunjung, e.target.value)}
                            className={`status-select status-${item.status}`}
                          >
                            <option value="menunggu">Menunggu</option>
                            <option value="dipanggil">Dipanggil</option>
                            <option value="selesai">Selesai</option>
                            <option value="batal">Batal</option>
                          </select>
                        </td>
                        <td>{item.created_at ? new Date(item.created_at).toLocaleString('id-ID') : '-'}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteAntrian(item.id_pengunjung)}
                            className="delete-btn"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="no-data">Tidak ada data antrian</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'statistics' && (
        <div className="tab-content">
          {loading ? (
            <div className="loading">Memuat statistik...</div>
          ) : statistics ? (
            <div className="statistics-container">
              <div className="stat-card">
                <h3>Total Antrian</h3>
                <p className="stat-value">{statistics.total || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Menunggu</h3>
                <p className="stat-value menunggu">{statistics.menunggu || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Sedang Dilayani</h3>
                <p className="stat-value dilayani">{statistics.sedang_dilayani || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Selesai</h3>
                <p className="stat-value selesai">{statistics.selesai || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Batal</h3>
                <p className="stat-value batal">{statistics.batal || 0}</p>
              </div>
            </div>
          ) : (
            <div className="no-data">Tidak ada data statistik</div>
          )}
        </div>
      )}
    </div>
  );
};


export default AdminDashboard;
