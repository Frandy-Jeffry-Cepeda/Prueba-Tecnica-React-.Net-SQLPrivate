import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(atob(token.split('.')[1]));
  const userRole = user.role;  

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/user/Home" replace />;
};

