import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; 

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const token = useAuthStore((state) => state.token) || localStorage.getItem('token');

  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;