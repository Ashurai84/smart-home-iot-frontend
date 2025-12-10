/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not logged in
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to login page
  // Save the current location so we can redirect back after login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
