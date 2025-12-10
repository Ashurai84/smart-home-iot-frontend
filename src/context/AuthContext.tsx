/**
 * Authentication Context for SmartHome Hub
 * Provides global auth state management across the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our auth context
interface AuthContextType {
  user: string | null;     // Stores user email or name
  token: string | null;    // JWT token for API calls
  isLoggedIn: boolean;     // Quick check if user is authenticated
  login: (token: string, user: string) => void;   // Login function
  logout: () => void;      // Logout function
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Custom hook to use auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component - wraps the entire app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize state from localStorage (for persistence)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('user');
  });

  // Derived state - check if user is logged in
  const isLoggedIn = !!token;

  // Login function - saves token and user to state and localStorage
  const login = (newToken: string, newUser: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', newUser);
    setToken(newToken);
    setUser(newUser);
  };

  // Logout function - clears everything and redirects to login
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Check for token validity on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  // Value object to provide to consumers
  const value = {
    user,
    token,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
