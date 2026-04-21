import { Navigate } from 'react-router-dom';

export default function RedirectIfAuth({ children }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (token && user) {
    if (user.role === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/learner/dashboard" replace />;
    }
  }

  return children;
}