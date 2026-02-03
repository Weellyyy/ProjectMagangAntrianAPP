import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [queueData, setQueueData] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    id_pelanggan: '',
    nama: '',
    no_telp: '',
    kategori_keluhan: '',
    detail_keluhan: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Hanya angka untuk ID Pelanggan
    if (name === 'id_pelanggan') {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/antrian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        console.log('Queue Data:', data.data);
        setQueueData(data.data);
        setShowForm(false);
        setShowSuccess(true);
        setFormData({
          id_pelanggan: '',
          nama: '',
          no_telp: '',
          kategori_keluhan: '',
          detail_keluhan: ''
        });
      } else {
        setMessage('✗ ' + data.message);
      }
    } catch (error) {
      setMessage('✗ Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <img src="/iconnet.png" alt="ICON PLUS Logo" className="logo-image" />
            <span className="logo-text">ICON PLUS JOGJA</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="nav-menu">
            <a href="#features">Fitur</a>
            <a href="#service">Layanan</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
          </nav>
          
          <Link to="/admin/login" className="admin-login-btn">
            Admin Login
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              color: '#333',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              width: '50px',
              height: '50px'
            }}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div
            style={{
              backgroundColor: '#f8f9fa',
              padding: '12px 20px',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <a 
              href="#features" 
              style={{ 
                color: '#333', 
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => setShowMobileMenu(false)}
            >
              Fitur
            </a>
            <a 
              href="#service" 
              style={{ 
                color: '#333', 
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => setShowMobileMenu(false)}
            >
              Layanan
            </a>
            <a 
              href="#about" 
              style={{ 
                color: '#333', 
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => setShowMobileMenu(false)}
            >
              Tentang
            </a>
            <a 
              href="#contact" 
              style={{ 
                color: '#333', 
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => setShowMobileMenu(false)}
            >
              Kontak
            </a>
            <Link 
              to="/admin/login" 
              style={{ 
                color: '#fff',
                textDecoration: 'none',
                backgroundColor: '#17a2b8',
                padding: '10px 16px',
                borderRadius: '8px',
                textAlign: 'center',
                marginTop: '5px'
              }}
              onClick={() => setShowMobileMenu(false)}
            >
              Admin Login
            </Link>
          </div>
        )}
      </header>

      <section 
        className="hero" 
        style={{
          backgroundImage: "url('/FotoLP1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          minHeight: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
          flexDirection: 'column'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0))',
            pointerEvents: 'none'
          }}
        />
        <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(true)}
            style={{ padding: '14px 32px', fontSize: '1rem' }}
          >
            Ambil Nomor Antrian
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <h1>Selamat Datang di<br /><span className="highlight">ICON PLUS JOGJA</span></h1>
            <p>Sistem antrian customer service yang modern, cepat, dan terpercaya untuk layanan terbaik Anda.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Ambil Nomor Antrian
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="screen-header">
                  <span>ICON PLUS JOGJA</span>
                </div>
                <div className="screen-content">
                  <div className="queue-card">
                    <div className="queue-number">001</div>
                    <div className="queue-status">Menunggu</div>
                  </div>
                  <div className="feature-item">
                    <span>✓</span> Antrian Cepat
                  </div>
                  <div className="feature-item">
                    <span>✓</span> Mudah Digunakan
                  </div>
                  <div className="feature-item">
                    <span>✓</span> Akses 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="service">
        <div className="container">
          <h2>Layanan Kami</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Keluhan Jaringan</h3>
              <p>Lapor dan selesaikan masalah koneksi jaringan dengan cepat</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚫</div>
              <h3>Deaktivasi</h3>
              <p>Proses deaktivasi layanan dengan mudah melalui sistem kami</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💳</div>
              <h3>Billing</h3>
              <p>Konsultasi dan pertanyaan seputar tagihan dan pembayaran</p>
            </div>
            <div className="service-card">
              <div className="service-icon">❓</div>
              <h3>Lainnya</h3>
              <p>Berbagai keluhan dan pertanyaan lainnya dapat kami tangani</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2>Mengapa Memilih ICON PLUS?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>⚡ Cepat & Efisien</h3>
              <p>Antrian online yang menghemat waktu Anda hingga 80%</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>📱 Mudah Diakses</h3>
              <p>Dapat diakses dari smartphone, tablet, atau komputer</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>👥 Tim Profesional</h3>
              <p>Tim customer service berpengalaman siap melayani Anda</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>🔒 Aman & Terpercaya</h3>
              <p>Data pribadi Anda dilindungi dengan standar keamanan tinggi</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">05</div>
              <h3>📊 Real-time Update</h3>
              <p>Pantau posisi antrian Anda secara real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">06</div>
              <h3>🕐 Tersedia 24/7</h3>
              <p>Layanan tersedia sepanjang jam kerja setiap harinya</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Tentang ICON PLUS</h2>
              <p>ICON PLUS adalah solusi sistem antrian customer service terdepan yang dirancang untuk meningkatkan pengalaman pelanggan. Dengan teknologi terkini dan antarmuka yang user-friendly, kami memastikan setiap pelanggan mendapatkan layanan terbaik.</p>
              <ul className="about-list">
                <li>✓ Teknologi Cloud-based Modern</li>
                <li>✓ Terintegrasi dengan Sistem CRM</li>
                <li>✓ Laporan Analitik Lengkap</li>
                <li>✓ Support Tim Professional</li>
              </ul>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>10K+</h3>
                <p>Pengguna Aktif</p>
              </div>
              <div className="stat">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
              <div className="stat">
                <h3>50K+</h3>
                <p>Antrian Proses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Hubungi Kami</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <p>0815-1550-0045</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <p>support@iconplus.com</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>Yogyakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Success - Tampilan Nomor Antrian */}
      {showSuccess && queueData && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-animation">
              <div className="checkmark">✓</div>
            </div>

            <h2>Nomor Antrian Anda</h2>
            <p className="success-subtitle">Antrian berhasil dibuat!</p>

            <div className="queue-display">
              <div className="queue-number-box">
                <span className="queue-label">Nomor Antrian</span>
                <span className="queue-number-large">
                  {queueData?.no_antrian ? String(queueData.no_antrian).padStart(3, '0') : '---'}
                </span>
              </div>
            </div>

            <div className="queue-info-display">
              <div className="info-row">
                <span className="info-label">ID Pelanggan</span>
                <span className="info-value">{queueData?.id_pelanggan || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Nama</span>
                <span className="info-value">{queueData?.nama || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Kategori</span>
                <span className="info-value">{queueData?.kategori_keluhan || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status</span>
                <span className="info-value status-badge">{queueData?.status || 'Menunggu'}</span>
              </div>
            </div>

            <div className="queue-instructions">
              <h4>📋 Petunjuk Penting:</h4>
              <ul>
                <li>Catat nomor antrian Anda dengan baik</li>
                <li>Tunggu panggilan sesuai nomor antrian</li>
                <li>Pastikan telepon Anda aktif untuk menerima notifikasi</li>
                <li>Jika nomor antrian hilang, hubungi customer service kami</li>
              </ul>
            </div>

            <div className="success-actions">
              <button 
                className="btn btn-primary" 
                onClick={() => setShowSuccess(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            <h2>Ambil Nomor Antrian</h2>
            
            {message && (
              <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="id_pelanggan">ID Pelanggan *</label>
                <input
                  type="number"
                  id="id_pelanggan"
                  name="id_pelanggan"
                  value={formData.id_pelanggan}
                  onChange={handleChange}
                  placeholder="Masukkan ID pelanggan"
                  required
                  autoFocus
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nama">Nama Lengkap *</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="no_telp">Nomor Telepon *</label>
                <input
                  type="tel"
                  id="no_telp"
                  name="no_telp"
                  value={formData.no_telp}
                  onChange={handleChange}
                  placeholder="Masukkan nomor telepon"
                  pattern="[0-9]+"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="kategori_keluhan">Kategori Keluhan *</label>
                <select
                  id="kategori_keluhan"
                  name="kategori_keluhan"
                  value={formData.kategori_keluhan}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="Keluhan Jaringan">Keluhan Jaringan</option>
                  <option value="Deaktivasi">Deaktivasi</option>
                  <option value="Billing">Billing</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="detail_keluhan">Detail Keluhan</label>
                <textarea
                  id="detail_keluhan"
                  name="detail_keluhan"
                  value={formData.detail_keluhan}
                  onChange={handleChange}
                  placeholder="Jelaskan masalah Anda (opsional)"
                  rows="4"
                />
              </div>

              <button type="submit" disabled={loading} className="form-submit-btn">
                {loading ? 'Memproses...' : 'Ambil Nomor Antrian'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 ICON PLUS. All rights reserved. | <button className="footer-link">Privacy Policy</button> | <button className="footer-link">Terms & Conditions</button></p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
