import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const GuestGuard = ({ children }: { children: React.ReactElement }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
};

export default GuestGuard;
