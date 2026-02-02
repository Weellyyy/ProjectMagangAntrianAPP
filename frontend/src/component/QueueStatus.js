import React, { useState, useEffect } from 'react';

const QueueStatus = ({ queueId }) => {
  const [queueData, setQueueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (queueId) {
      fetchQueueStatus();
      // Polling setiap 5 detik untuk update status
      const interval = setInterval(fetchQueueStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [queueId]);

  const fetchQueueStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/antrian/${queueId}`);
      const data = await response.json();

      if (data.success) {
        setQueueData(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Gagal mengambil data antrian');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'menunggu':
        return '#ff9800';
      case 'sedang_dilayani':
        return '#2196f3';
      case 'selesai':
        return '#4caf50';
      case 'batal':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'menunggu':
        return 'Menunggu';
      case 'sedang_dilayani':
        return 'Sedang Dilayani';
      case 'selesai':
        return 'Selesai';
      case 'batal':
        return 'Batal';
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="queue-status loading">Memuat data...</div>;
  }

  if (error) {
    return <div className="queue-status error">Error: {error}</div>;
  }

  if (!queueData) {
    return <div className="queue-status error">Data antrian tidak ditemukan</div>;
  }

  return (
    <div className="queue-status">
      <div className="queue-card">
        <div className="queue-header">
          <h3>Status Antrian Anda</h3>
        </div>

        <div className="queue-content">
          <div className="queue-number">
            <span className="label">Nomor Antrian</span>
            <span className="number">{queueData.id}</span>
          </div>

          <div className="queue-info">
            <div className="info-row">
              <span className="label">Nama:</span>
              <span className="value">{queueData.nama}</span>
            </div>
            <div className="info-row">
              <span className="label">Kategori:</span>
              <span className="value">{queueData.kategori_keluhan}</span>
            </div>
            <div className="info-row">
              <span className="label">Waktu Masuk:</span>
              <span className="value">{new Date(queueData.waktu_masuk).toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="queue-status-display" style={{ borderColor: getStatusColor(queueData.status) }}>
            <span className="status-label">Status:</span>
            <span className="status-badge" style={{ backgroundColor: getStatusColor(queueData.status) }}>
              {getStatusText(queueData.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;
