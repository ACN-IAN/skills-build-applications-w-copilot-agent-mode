// API service for frontend with Codespaces support
const getApiBaseUrl = (): string => {
  // Check for Vite environment variable first
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Check for Codespaces environment
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  // Default to localhost
  return 'http://localhost:8000/api';
};

const API_BASE_URL = getApiBaseUrl();

export const apiService = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
};

// User API calls
export const userAPI = {
  getAll: () => apiService.get('/users'),
  getById: (id: string) => apiService.get(`/users/${id}`),
  create: (data: any) => apiService.post('/users', data),
  update: (id: string, data: any) => apiService.put(`/users/${id}`, data),
  delete: (id: string) => apiService.delete(`/users/${id}`),
};

// Team API calls
export const teamAPI = {
  getAll: () => apiService.get('/teams'),
  getById: (id: string) => apiService.get(`/teams/${id}`),
  create: (data: any) => apiService.post('/teams', data),
  update: (id: string, data: any) => apiService.put(`/teams/${id}`, data),
  delete: (id: string) => apiService.delete(`/teams/${id}`),
};

// Activity API calls
export const activityAPI = {
  getAll: () => apiService.get('/activities'),
  getByUser: (userId: string) => apiService.get(`/activities/user/${userId}`),
  create: (data: any) => apiService.post('/activities', data),
  update: (id: string, data: any) => apiService.put(`/activities/${id}`, data),
  delete: (id: string) => apiService.delete(`/activities/${id}`),
};

// Leaderboard API calls
export const leaderboardAPI = {
  getAll: () => apiService.get('/leaderboard'),
  getByTeam: (teamId: string) => apiService.get(`/leaderboard/team/${teamId}`),
  getUserRanking: (userId: string) => apiService.get(`/leaderboard/user/${userId}`),
};

// Workout API calls
export const workoutAPI = {
  getAll: () => apiService.get('/workouts'),
  getByUser: (userId: string) => apiService.get(`/workouts/user/${userId}`),
  create: (data: any) => apiService.post('/workouts', data),
  update: (id: string, data: any) => apiService.put(`/workouts/${id}`, data),
  delete: (id: string) => apiService.delete(`/workouts/${id}`),
};
