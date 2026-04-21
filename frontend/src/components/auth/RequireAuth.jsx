import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === 'LEARNER') {
      return <Navigate to="/learner/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}