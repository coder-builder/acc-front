// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://223.130.131.18';

// API 클라이언트
export const apiClient = {
  post: async (endpoint, data) => {
    console.log(`🔵 POST ${API_BASE_URL}${endpoint}`, data);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error ${response.status}:`, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },
  
  get: async (endpoint) => {
    console.log(`🔵 GET ${API_BASE_URL}${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error ${response.status}:`, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  }
};

// API 엔드포인트
export const API_ENDPOINTS = {
  // 참가자 관련
  participants: '/api/participants/',
  participantsList: '/api/participants/list/',
  getParticipant: (id) => `/api/participants/${id}/`,
  
  // 시행 관련
  trials: '/api/trials/',
  getTrials: (participantId) => `/api/trials/${participantId}/`,
  
  // 선호도 관련
  preferences: '/api/preference/',
  getPreference: (participantId) => `/api/preference/${participantId}/`,
  
  // 🆕 새로 추가
  completeExperiment: '/api/complete-experiment/',
  submitSymbolPreferences: '/api/submit-symbol-preferences/',
  getSymbolPreferences: (participantId) => `/api/symbol-preferences/${participantId}/`,
  preferenceSummary: '/api/preference-summary/',
};