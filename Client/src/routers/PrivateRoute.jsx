import React from 'react';
import { Navigate } from 'react-router-dom';
import { authInstance } from '/src/firebase.js';

const PrivateRoute = ({ children }) => {
  const user = authInstance.currentUser;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
