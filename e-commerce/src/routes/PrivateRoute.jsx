import React, { use, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Pages/Authantication/AuthContext';


function PrivateRoute({children}) {
    const {user, loading} =  useContext(AuthContext);

    if(loading) return null;
  return user? children : <Navigate to ="/login" replace />
}

export default PrivateRoute
