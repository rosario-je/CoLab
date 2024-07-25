// ProtectedRoute.jsx
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useUser();


  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
