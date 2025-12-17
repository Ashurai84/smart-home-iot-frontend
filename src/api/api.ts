import axios from 'axios';

const API_BASE_URL = 'https://smart-home-iot-mern-api.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const getDevices = async () => {
  const response = await api.get('/devices');
  return response.data;
};

export const addDevice = async (device: { name: string; room: string; type: string }) => {
  const response = await api.post('/devices', device);
  return response.data;
};

export const toggleDevice = async (deviceId: string) => {
  const response = await api.patch(`/devices/${deviceId}/toggle`);
  return response.data;
};

export const updateACSettings = async (
  deviceId: string,
  settings: { temperature: number; mode: string }
) => {
  // Wrapping settings in acSettings object to match likely backend schema expectation
  const response = await api.patch(`/devices/${deviceId}/ac-settings`, { acSettings: settings });
  return response.data;
};

export const deleteDevice = async (deviceId: string) => {
  const response = await api.delete(`/devices/${deviceId}`);
  return response.data;
};

export const getLogs = async () => {
  const response = await api.get('/logs');
  return response.data;
};

export default api;
