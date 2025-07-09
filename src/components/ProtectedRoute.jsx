import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
  const {auth, userData}=useContext(UserContext);
    const user = auth.currentUser;
    if(!user||userData?.eid?.length===0){
        return (
            <Navigate to="/" replace={true} />
        )
    }
  return children;
}

export default ProtectedRoute