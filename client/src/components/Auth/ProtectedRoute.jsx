import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const ProtectedRoute = ({ children}) => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/current-user', { withCredentials: true });
        if (response.status === 200) {
          setCurrentUser(response.data);
        } else {
          navigate('/signin');
        }
      } catch (error) {
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };

    if (!currentUser) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [navigate, currentUser, setCurrentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : null;
};

export default ProtectedRoute;
