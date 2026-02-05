import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/globals.css';
import { 
  FiGlobe, 
  FiSlash, 
  FiCreditCard, 
  FiHelpCircle,
  FiZap,
  FiSmartphone,
  FiUsers,
  FiLock,
  FiPhone, 
  FiMail, 
  FiMapPin
} from "react-icons/fi";

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

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Nomor Antrian - ICON PLUS Yogyakarta</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              padding: 40px;
              background: white;
            }
            .print-container {
              max-width: 400px;
              margin: 0 auto;
              border: 3px solid #02B6D1;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
            }
            .logo-section {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 2px solid #eee;
            }
            .logo-section h1 {
              color: #1A599E;
              font-size: 24px;
              margin-bottom: 5px;
            }
            .logo-section p {
              color: #666;
              font-size: 14px;
            }
            .queue-section {
              margin: 30px 0;
            }
            .queue-label {
              font-size: 16px;
              color: #666;
              margin-bottom: 10px;
            }
            .queue-number {
              font-size: 72px;
              font-weight: bold;
              color: #02B6D1;
              letter-spacing: 10px;
              margin: 20px 0;
            }
            .info-section {
              text-align: left;
              margin: 20px 0;
              padding: 20px;
              background: #f9f9f9;
              border-radius: 8px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              font-weight: 600;
              color: #333;
            }
            .info-value {
              color: #666;
            }
            .instructions {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #eee;
              text-align: left;
            }
            .instructions h4 {
              color: #1A599E;
              margin-bottom: 10px;
              font-size: 16px;
            }
            .instructions ul {
              list-style: none;
              padding: 0;
            }
            .instructions li {
              padding: 8px 0;
              color: #666;
              font-size: 14px;
            }
            .instructions li:before {
              content: "✓ ";
              color: #02B6D1;
              font-weight: bold;
              margin-right: 8px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #eee;
              font-size: 12px;
              color: #999;
            }
            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="logo-section">
              <h1>ICON PLUS Yogyakarta</h1>
              <p>Sistem Antrian Customer Service</p>
            </div>
            
            <div class="queue-section">
              <div class="queue-label">Nomor Antrian Anda</div>
              <div class="queue-number">${queueData?.no_antrian ? String(queueData.no_antrian).padStart(3, '0') : '---'}</div>
            </div>
            
            <div class="info-section">
              <div class="info-row">
                <span class="info-label">ID Pelanggan:</span>
                <span class="info-value">${queueData?.id_pelanggan || '-'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Nama:</span>
                <span class="info-value">${queueData?.nama || '-'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">No. Telepon:</span>
                <span class="info-value">${queueData?.no_telp || '-'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Kategori:</span>
                <span class="info-value">${queueData?.kategori_keluhan || '-'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Status:</span>
                <span class="info-value">${queueData?.status || 'Menunggu'}</span>
              </div>
            </div>
            
            <div class="instructions">
              <h4>Petunjuk Penting:</h4>
              <ul>
                <li>Catat nomor antrian Anda dengan baik</li>
                <li>Tunggu panggilan sesuai nomor antrian</li>
                <li>Pastikan telepon Anda aktif untuk menerima notifikasi</li>
                <li>Jika nomor antrian hilang, hubungi customer service kami</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>Tanggal: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p>Waktu: ${new Date().toLocaleTimeString('id-ID')}</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#02B6D1';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Header
    ctx.fillStyle = '#1A599E';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ICON PLUS Yogyakarta', canvas.width / 2, 80);
    
    ctx.fillStyle = '#666666';
    ctx.font = '18px Arial';
    ctx.fillText('Sistem Antrian Customer Service', canvas.width / 2, 110);
    
    // Line
    ctx.strokeStyle = '#eeeeee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 130);
    ctx.lineTo(canvas.width - 60, 130);
    ctx.stroke();
    
    // Queue Number Label
    ctx.fillStyle = '#666666';
    ctx.font = '20px Arial';
    ctx.fillText('Nomor Antrian Anda', canvas.width / 2, 180);
    
    // Queue Number
    ctx.fillStyle = '#02B6D1';
    ctx.font = 'bold 80px Arial';
    const queueNum = queueData?.no_antrian ? String(queueData.no_antrian).padStart(3, '0') : '---';
    ctx.fillText(queueNum, canvas.width / 2, 260);
    
    // Info Box Background
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(60, 300, canvas.width - 120, 240);
    
    // Info Details
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    
    const infoY = 340;
    const lineHeight = 40;
    
    ctx.fillText('ID Pelanggan:', 80, infoY);
    ctx.fillStyle = '#666666';
    ctx.font = '18px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(queueData?.id_pelanggan || '-', canvas.width - 80, infoY);
    
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Nama:', 80, infoY + lineHeight);
    ctx.fillStyle = '#666666';
    ctx.font = '18px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(queueData?.nama || '-', canvas.width - 80, infoY + lineHeight);
    
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('No. Telepon:', 80, infoY + lineHeight * 2);
    ctx.fillStyle = '#666666';
    ctx.font = '18px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(queueData?.no_telp || '-', canvas.width - 80, infoY + lineHeight * 2);
    
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Kategori:', 80, infoY + lineHeight * 3);
    ctx.fillStyle = '#666666';
    ctx.font = '18px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(queueData?.kategori_keluhan || '-', canvas.width - 80, infoY + lineHeight * 3);
    
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Status:', 80, infoY + lineHeight * 4);
    ctx.fillStyle = '#666666';
    ctx.font = '18px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(queueData?.status || 'Menunggu', canvas.width - 80, infoY + lineHeight * 4);
    
    // Line
    ctx.strokeStyle = '#eeeeee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 570);
    ctx.lineTo(canvas.width - 60, 570);
    ctx.stroke();
    
    // Instructions
    ctx.fillStyle = '#1A599E';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Petunjuk Penting', canvas.width / 2, 610);
    
    ctx.fillStyle = '#666666';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    const instructions = [
      '✓ Catat nomor antrian Anda dengan baik',
      '✓ Tunggu panggilan sesuai nomor antrian',
      '✓ Pastikan telepon Anda aktif',
      '✓ Hubungi CS jika nomor hilang'
    ];
    
    instructions.forEach((text, index) => {
      ctx.fillText(text, 80, 640 + (index * 25));
    });
    
    // Footer
    ctx.strokeStyle = '#eeeeee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 740);
    ctx.lineTo(canvas.width - 60, 740);
    ctx.stroke();
    
    ctx.fillStyle = '#999999';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    const date = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = new Date().toLocaleTimeString('id-ID');
    ctx.fillText(`${date} - ${time}`, canvas.width / 2, 765);
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Nomor-Antrian-${queueNum}-ICONPLUS.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

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
          <Link to="/admin/login" className="logo" style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <img src="/iconnet.png" alt="ICON PLUS Logo" className="logo-image" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="nav-menu">
            <a href="#features">Fitur</a>
            <a href="#service">Layanan</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
          </nav>

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
            style={{ 
              padding: '14px 32px', 
              fontSize: '1rem',
              // --- MODIFIKASI DI SINI ---
              opacity: 0,            // Membuat tombol 100% transparan (tidak terlihat)
              cursor: 'default',     // Mengubah kursor agar tidak berubah jadi gambar tangan (opsional)
              pointerEvents: 'none'  // Tambahkan ini jika Anda ingin tombolnya TIDAK BISA diklik juga
            }}
          >
            Ambil Nomor Antrian
          </button>
        </div>
        <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(true)}
            style={{ 
              padding: '14px 32px', 
              fontSize: '1rem',
              // --- MODIFIKASI DI SINI ---
              opacity: 0,            // Membuat tombol 100% transparan (tidak terlihat)
              cursor: 'default',     // Mengubah kursor agar tidak berubah jadi gambar tangan (opsional)
              pointerEvents: 'none'  // Tambahkan ini jika Anda ingin tombolnya TIDAK BISA diklik juga
            }}
          >
            Ambil Nomor Antrian
          </button>
        </div>
        
        
      </section>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <h1>Selamat Datang di<br /><span className="highlight">ICON PLUS Yogyakarta</span></h1>
            <p>Sistem antrian customer service yang modern, cepat, dan terpercaya untuk layanan terbaik Anda.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Ambil Nomor Antrian
              </button>
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
              <div className="service-icon">
                <FiGlobe size={32} />
              </div>
              <h3>Keluhan Jaringan</h3>
              <p>Lapor dan selesaikan masalah koneksi jaringan dengan cepat</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FiSlash size={32} />
              </div>
              <h3>Deaktivasi</h3>
              <p>Proses deaktivasi layanan dengan mudah melalui sistem kami</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FiCreditCard size={32} />
              </div>
              <h3>Billing</h3>
              <p>Konsultasi dan pertanyaan seputar tagihan dan pembayaran</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FiHelpCircle size={32} />
              </div>
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
              <h3><FiZap size={32} /> Cepat & Efisien</h3>
              <p>Antrian online yang menghemat waktu Anda hingga 80%</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3><FiSmartphone size={32} /> Mudah Diakses</h3>
              <p>Dapat diakses dari smartphone, tablet, atau komputer</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3><FiUsers size={32} /> Tim Profesional</h3>
              <p>Tim customer service berpengalaman siap melayani Anda</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3><FiLock size={32} /> Aman & Terpercaya</h3>
              <p>Data pribadi Anda dilindungi dengan standar keamanan tinggi</p>
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
                className="btn btn-secondary" 
                onClick={handlePrint}
                style={{ marginRight: '10px' }}
              >
                🖨️ Print
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleDownload}
                style={{ marginRight: '10px' }}
              >
                📥 Download
              </button>
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
                <label htmlFor="id_pelanggan">ID Pelanggan </label>
                <input
                  type="number"
                  id="id_pelanggan"
                  name="id_pelanggan"
                  value={formData.id_pelanggan}
                  onChange={handleChange}
                  placeholder="Masukkan ID pelanggan"
                  autoFocus
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nama">Nama Lengkap </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
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
          <div className="footer-content">
            {/* Footer Section 1: Logo & Description */}
            <div className="footer-section footer-about">
              <div className="footer-logo">
                <img src="/iconnet.png" alt="ICON PLUS Logo" style={{ height: '50px', marginBottom: '10px' }} />
                <h3>ICON PLUS Yogyakarta</h3>
              </div>
              <p>Sistem antrian customer service terpercaya untuk memberikan pengalaman terbaik kepada pelanggan setia kami.</p>
              
              {/* Social Media */}
              <div className="social-media" style={{ marginTop: '15px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Ikuti Kami</h4>
                <div style={{ display: 'flex', gap: '18px' }}>
                  <a href="https://www.facebook.com/iconnet.by.plnicon.plus/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', fontSize: '20px', transition: 'opacity 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}><i className="fab fa-facebook"></i></a>
                  <a href="https://www.instagram.com/iconnet_yogyakarta/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', fontSize: '20px', transition: 'opacity 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}><i className="fab fa-instagram"></i></a>
                  <a href="https://www.youtube.com/@iconnet.official" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', fontSize: '20px', transition: 'opacity 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}><i className="fa-brands fa-youtube"></i></a>
                  <a href="https://www.tiktok.com/@iconnet.plniconplus" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', fontSize: '20px', transition: 'opacity 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}><i className="fab fa-tiktok"></i></a>
                </div>
              </div>
            </div>

            {/* Footer Section 2: Quick Links */}
            <div className="footer-section footer-links">
              <h4>Menu Cepat</h4>
              <ul>
                <li><a href="#features">Fitur</a></li>
                <li><a href="#service">Layanan</a></li>
                <li><a href="#about">Tentang Kami</a></li>
                <li><a href="#contact">Kontak</a></li>
                <li><button className="footer-link">FAQ</button></li>
              </ul>
            </div>

            

            {/* Footer Section 4: Contact Info */}
            <div className="footer-section footer-contact">
              <h4>Hubungi Kami</h4>
              <div className="contact-info" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                <p>
                  <strong><FiPhone size={20} /> Telepon:</strong><br/>
                  <a href="tel:08151550045" style={{ color: '#ffffff', textDecoration: 'none' }}>0815-1550-0045</a>
                </p>
                <p>
                  <strong><FiMail size={20} /> Email:</strong><br/>
                  <a href="mailto:cc.iconnet@iconpln.co.id" style={{ color: '#ffffff', textDecoration: 'none' }}>cc.iconnet@iconpln.co.id</a>
                </p>
                <p>
                  <strong><FiMapPin size={20} /> Lokasi:</strong><br/>
                  Yogyakarta, Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; © 2026 All rights reserved. ICONNET powered by PT Indonesia Comnets Plus</p>
              <div className="footer-bottom-links">
                <button className="footer-link">Privacy Policy</button>
                <span> | </span>
                <button className="footer-link">Terms & Conditions</button>
                <span> | </span>
                <button className="footer-link">Sitemap</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
