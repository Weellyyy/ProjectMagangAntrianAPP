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

// API object with methods
const api = {
  get: async (url) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Request failed');
    }
    
    return response.json();
  },
  
  post: async (url, data) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`http://localhost:3000${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Request failed');
    }
    
    return response.json();
  },
  
  put: async (url, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Request failed');
    }
    
    return response.json();
  },
  
  delete: async (url) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Request failed');
    }
    
    return response.json();
  }
};

export default api;