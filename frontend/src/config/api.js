// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth Endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    GET_CURRENT_USER: `${API_BASE_URL}/auth/me`
  },
  // Antrian Endpoints
  ANTRIAN: {
    CREATE: `${API_BASE_URL}/antrian`,
    GET_ALL: `${API_BASE_URL}/antrian`,
    GET_BY_ID: (id) => `${API_BASE_URL}/antrian/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/antrian/${id}/status`,
    DELETE: (id) => `${API_BASE_URL}/antrian/${id}`,
    STATISTICS: `${API_BASE_URL}/antrian/statistics`
  }
};

// Helper function untuk fetch dengan authorization
export const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  return response.json();
};
