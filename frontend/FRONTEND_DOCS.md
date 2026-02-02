# 📋 Sistem Antrian CS ICON PLUS - Frontend Documentation

## 🎯 Overview

Frontend aplikasi antrian customer service ICON PLUS yang dibangun dengan React. Sistem ini memiliki dua halaman utama:
1. **Landing Page** - untuk pelanggan membuat antrian
2. **Admin Dashboard** - untuk admin mengelola antrian

## 📁 Struktur Komponen

```
src/
├── component/
│   ├── LandingPage.js          # Halaman utama untuk pelanggan
│   ├── LandingPage.css         # Styling landing page
│   ├── AdminDashboard.js       # Dashboard admin
│   ├── AdminDashboard.css      # Styling dashboard
│   ├── QueueStatus.js          # Komponen status antrian (bonus)
│   └── QueueStatus.css         # Styling status antrian
├── config/
│   └── api.js                  # Konfigurasi API endpoints
├── App.js                      # Main app dengan routing
└── App.css                     # Global styling
```

## 🚀 Setup

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Backend API running di `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm start
```

## 🔧 Konfigurasi

Edit file `.env` untuk mengubah API URL:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

## 📄 Fitur Landing Page

### Form Antrian
- **Nama Lengkap** (required)
- **Nomor Telepon** (required, hanya angka)
- **Kategori Keluhan** (required)
  - Keluhan Jaringan
  - Deaktivasi
  - Billing
  - Lainnya
- **Detail Keluhan** (optional)

### Fitur Tambahan
- Form validation
- Success/error messages
- Loading state
- Info box dengan panduan
- Feature showcase

## 📊 Fitur Admin Dashboard

### Login
- Username dan password authentication
- Token-based JWT
- Session persistence di localStorage

### Data Antrian (Tab: Data Antrian)
- **List View** - tabel semua antrian dengan informasi:
  - No urut
  - ID Pelanggan
  - Nama
  - No. Telepon
  - Kategori Keluhan
  - Status
  - Waktu Masuk
  
- **Filter Options**:
  - Filter by Status (Menunggu, Sedang Dilayani, Selesai, Batal)
  - Filter by Date

- **Actions**:
  - Update status antrian (dropdown)
  - Delete antrian

### Statistik (Tab: Statistik)
- Total antrian
- Jumlah menunggu
- Jumlah sedang dilayani
- Jumlah selesai
- Jumlah batal

## 🎨 Styling & Design

### Color Scheme
- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Dark Purple)
- **Success**: `#4caf50` (Green)
- **Warning**: `#ff9800` (Orange)
- **Error**: `#f44336` (Red)
- **Info**: `#2196f3` (Blue)

### Typography
- Font: Segoe UI, Roboto
- Responsive design dengan mobile support

## 🔌 API Integration

### Auth Endpoints
```javascript
POST /api/auth/login
POST /api/auth/register
GET /api/auth/me
```

### Antrian Endpoints
```javascript
POST /api/antrian                    // Create antrian
GET /api/antrian                     // Get all antrian (admin only)
GET /api/antrian/statistics          // Get statistics (admin only)
GET /api/antrian/:id                 // Get antrian by ID (admin only)
PUT /api/antrian/:id/status          // Update status (admin only)
DELETE /api/antrian/:id              // Delete antrian (admin only)
```

### Request Headers
```javascript
// For protected endpoints
Authorization: Bearer <token>
Content-Type: application/json
```

## 🔐 Authentication

- JWT token disimpan di `localStorage` dengan key `token`
- Token otomatis ditambahkan ke header setiap request ke protected endpoints
- Token tidak bisa diakses tanpa login

## 📱 Responsive Design

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

## 🐛 Troubleshooting

### Error "Cannot reach API"
- Pastikan backend running di `http://localhost:3000`
- Check REACT_APP_API_URL di .env file
- Pastikan backend memiliki CORS enabled

### Login Gagal
- Verify username dan password di backend
- Check token validity di console (F12)
- Clear localStorage jika ada masalah token

### Data Tidak Load
- Check network tab di developer tools
- Verify token validity
- Ensure user memiliki role admin

## 📚 Built With

- React 19.2.4
- React Router DOM 6.x
- Fetch API untuk HTTP requests
- CSS3 untuk styling

## 👤 User Types

### Customer (Landing Page)
- Dapat membuat antrian baru
- Melihat informasi tentang layanan
- Tidak memerlukan login

### Admin (Admin Dashboard)
- Login dengan credentials
- Melihat semua antrian
- Update status antrian
- Delete antrian
- Melihat statistik

## 🔐 Security Notes

- Jangan commit `.env` file dengan credentials
- Pastikan HTTPS di production
- Validate semua input di backend
- Use strong JWT secret di backend
- Implement CORS properly

## 📞 Support

Untuk pertanyaan atau issues, hubungi tim development atau lihat dokumentasi backend.

---

**Last Updated**: February 2024
**Version**: 1.0.0
