// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// API 클라이언트
export const apiClient = {
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  },
  
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
};

// API 엔드포인트
export const API_ENDPOINTS = {
  participants: '/api/participants/',
  trials: '/api/trials/',
  preferences: '/api/preferences/',
};