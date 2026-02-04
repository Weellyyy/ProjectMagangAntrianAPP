import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiList, FiBarChart2 } from "react-icons/fi";
import React, { useState, useEffect, useCallback } from 'react'; // Tambah useCallback


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('antrian');
  const [antrian, setAntrian] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({ status: '', date: '', no_telp: '' });
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [user] = useState(JSON.parse(sessionStorage.getItem('user') || '{}'));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // --- STATE BARU: Untuk Modal Detail ---
  const [selectedKeluhan, setSelectedKeluhan] = useState(null);
  const [totalPengunjung, setTotalPengunjung] = useState(0);

  // Check authentication
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  // Bungkus fungsi dengan useCallback
  const fetchAntrian = useCallback(async (filterParams = {}) => {
    if (!token) return;
    setLoading(true);
    try {
      // Logika pembersihan filter (tetap sama)
      const cleanFilters = Object.fromEntries(
        Object.entries(filterParams).filter(([_, v]) => v !== '')
      );
      
      const queryParams = new URLSearchParams(cleanFilters).toString();
      
      const response = await fetch(`http://localhost:3000/api/antrian?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setAntrian(data.data);
        setTotalPengunjung(data.data.length);
      } else {
        setMessage('✗ Gagal mengambil data antrian');
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [token]); // Dependency: Fungsi ini hanya dibuat ulang kalau token berubah

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
      } else {
        setMessage('✗ ' + (data.message || 'Gagal mengambil statistik'));
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
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
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ ' + (data.message || 'Gagal memperbarui status'));
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
      setTimeout(() => setMessage(''), 5000);
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

 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    if (name !== 'no_telp') {
      fetchAntrian({ ...filters, [name]: value });
    }
  };

  useEffect(() => {
    if (!token) return;

    const timeoutId = setTimeout(() => {
      fetchAntrian(filters);
    }, 500); 

    return () => clearTimeout(timeoutId);

    
  }, [filters, fetchAntrian, token]);


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
      {/* Sidebar */}
      <aside 
      className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
      onClick={() => !sidebarOpen && setSidebarOpen(true)}
    >
      
      {/* 2. onClick di Header: Menangani saat sidebar TERBUKA (klik logo untuk tutup).
         e.stopPropagation() penting agar klik ini tidak bentrok dengan event parent.
      */}
      <div 
        className="sidebar-header" 
        onClick={(e) => {
          if (sidebarOpen) {
            e.stopPropagation(); // Cegah event bubbling
            setSidebarOpen(false);
          }
        }}
        title={sidebarOpen ? "Klik untuk mengecilkan sidebar" : "Klik untuk memperlebar"}
      >
        <div className="sidebar-brand">
          <img src="/logobulat.png" alt="ICON PLUS Logo" className="logo-image" />
          
          <span className={`sidebar-title ${!sidebarOpen && 'hidden'}`}>
            ICON PLUS
          </span>
        </div>
        
        {/* Opsional: Tambahkan indikator visual kecil (hamburger/panah) di header */}
        {sidebarOpen && <span className="close-indicator">◀</span>}
      </div>

      {/* Navigasi - Kita perlu stopPropagation saat klik menu agar sidebar tidak 'berkedip' */}
      <nav className="sidebar-nav">
        <button
          className={`sidebar-item ${activeTab === 'antrian' ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActiveTab('antrian'); }}
        >
          <FiList size={20} className="sidebar-icon" />
          {sidebarOpen && <span>Data Antrian</span>}
        </button>

        <button
          className={`sidebar-item ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActiveTab('statistics'); }}
        >
          <FiBarChart2 size={20} className="sidebar-icon" />
          {sidebarOpen && <span>Statistik</span>}
        </button>
      </nav>

      <div className="sidebar-footer">
          <div className="sidebar-user" title={user.username}>
            <FiUser size={20} className="sidebar-icon" />
            {sidebarOpen && (
              <span className="sidebar-username">
                {user.username || "Admin"}
              </span>
            )}
          </div>
          </div>

      {/* Footer juga perlu diproteksi */}
      <div className="sidebar-footer" onClick={(e) => e.stopPropagation()}>
         {/* ... isi footer ... */}
         {/* Tombol Logout */}
         <button onClick={handleLogout} className="sidebar-logout">
            <FiLogOut size={20} className="sidebar-icon" />
            {sidebarOpen && <span>Logout</span>}
         </button>
      </div>
    </aside>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <div className="header-content">
            <h1 className="dashboard-title">
              <FiBarChart2 size={26} />
              <span>Admin Dashboard</span>
            </h1>

            <p>ICON PLUS Customer Service Management System</p>
          </div>
          <div className="header-actions">
            
            <span className="user-info">
              <FiUser size={20} />
              {user.username}
            </span>
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
              <option value="dilayani">Dilayani</option>
              <option value="selesai">Selesai</option>
            </select>

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="filter-select"
            />

            <input
              type="text"
              name="no_telp"
              placeholder="Cari No. Telepon"
              value={filters.no_telp}
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
                    <th>Detail Keluhan</th> {/* Kolom yang dimodifikasi */}
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
                        
                        {/* --- MODIFIKASI: Box Keluhan & Tombol Detail --- */}
                        <td className="detail-column">
                          <div className="keluhan-text-box">
                            {item.detail_keluhan || '-'}
                          </div>
                          <button 
                            className="view-detail-btn"
                            onClick={() => setSelectedKeluhan(item)}
                          >
                            Lihat Detail
                          </button>
                        </td>

                        <td>
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id_pengunjung, e.target.value)}
                            className={`status-select status-${item.status}`}
                          >
                            <option value="menunggu">Menunggu</option>
                            <option value="dilayani">Dilayani</option>
                            <option value="selesai">Selesai</option>
                          </select>
                        </td>
                        <td>{item.created_at ? new Date(item.created_at).toLocaleString('id-ID') : '-'}</td>
                        <td>
                          <button onClick={() => handleDelete(item.id_pengunjung)} className="delete-btn">🗑️</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="no-data">Tidak ada data antrian</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* --- MODAL POP-UP DETAIL --- */}
      {selectedKeluhan && (
        <div className="modal-overlay" onClick={() => setSelectedKeluhan(null)}>
          <div className="modal-content detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Keluhan Pelanggan</h2>
              <button className="close-btn" onClick={() => setSelectedKeluhan(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="info-row">
                <span className="info-label">Nama Pelanggan:</span>
                <span className="info-value">{selectedKeluhan.nama}</span>
              </div>
              <div className="info-row">
                <span className="info-label">ID Pelanggan:</span>
                <span className="info-value">{selectedKeluhan.id_pelanggan || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Kategori:</span>
                <span className="info-value">{selectedKeluhan.kategori_keluhan}</span>
              </div>
              <div className="full-keluhan">
                <strong>Isi Keluhan:</strong>
                <p>{selectedKeluhan.detail_keluhan || 'Tidak ada detail keluhan.'}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="admin-login-btn" onClick={() => setSelectedKeluhan(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'statistics' && (
        <div className="tab-content">
          {loading ? (
            <div className="loading">Memuat statistik...</div>
          ) : statistics ? (
            <div className="statistics-container">
              <div className="stat-card">
                <h3>Total Riwayat Pengunjung</h3>
                <p className="stat-value">{totalPengunjung || 0}</p>
              </div>
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
            </div>
          ) : (
            <div className="no-data">Tidak ada data statistik</div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminDashboard;