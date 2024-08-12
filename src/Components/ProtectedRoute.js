import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const isValidToken=(token)=>{
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
      } catch (error) {
        return false;
      }
}

const ProtectedRouter = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token && isValidToken(token);
    return isAuthenticated ? <Component {...rest}/> : < Navigate to='/login'/>
}

export default ProtectedRouter;