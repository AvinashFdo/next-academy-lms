import { Link, NavLink, useNavigate } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import logo from '@/assets/logo1.png';

const navClass = ({ isActive }) =>
  `text-sm transition ${
    isActive ? 'text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900'
  }`;

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  const isLoggedIn = Boolean(token && user);
  const isAdmin = user?.role === 'ADMIN';
  const isLearner = user?.role === 'LEARNER';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="NEXT Academy Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {/* Always visible */}
          <NavLink to="/courses" className={navClass}>
            Courses
          </NavLink>

          {/* Role-based navigation */}
          {isLoggedIn && (
            <NavLink
              to={isAdmin ? '/admin/dashboard' : '/learner/dashboard'}
              className={navClass}
            >
              Dashboard
            </NavLink>
          )}

          {/* Auth actions */}
          {!isLoggedIn ? (
            <ButtonLink to="/login" variant="outline">
              Login
            </ButtonLink>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}