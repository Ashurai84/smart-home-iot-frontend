/**
 * API Configuration for SmartHome Hub
 * This file sets up Axios with the backend base URL and token handling
 */

import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'https://smart-home-iot-mern-api.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Send raw token (no "Bearer" prefix as per requirements)
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login on authentication failure
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH API FUNCTIONS ============

// Register a new user
export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

// Login user and get token
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// ============ DEVICE API FUNCTIONS ============

// Get all devices for the logged-in user
export const getDevices = async () => {
  const response = await api.get('/devices');
  return response.data;
};

// Add a new device
export const addDevice = async (device: { name: string; room: string; type: string }) => {
  const response = await api.post('/devices', device);
  return response.data;
};

// Toggle device on/off
export const toggleDevice = async (deviceId: string) => {
  const response = await api.patch(`/devices/${deviceId}/toggle`);
  return response.data;
};

// Update AC settings (temperature and mode)
export const updateACSettings = async (
  deviceId: string,
  settings: { temperature: number; mode: string }
) => {
  const response = await api.patch(`/devices/${deviceId}/ac-settings`, settings);
  return response.data;
};

// Delete a device
export const deleteDevice = async (deviceId: string) => {
  const response = await api.delete(`/devices/${deviceId}`);
  return response.data;
};

// ============ LOGS API FUNCTIONS ============

// Get all activity logs
export const getLogs = async () => {
  const response = await api.get('/logs');
  return response.data;
};

export default api;
