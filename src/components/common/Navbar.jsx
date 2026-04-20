import { Link, NavLink } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import logo from '@/assets/logo1.png';

const navClass = ({ isActive }) =>
  `text-sm transition ${isActive ? 'text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900'}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={logo} 
            alt="NEXT Academy Logo" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/courses" className={navClass}>Courses</NavLink>
          <NavLink to="/learner/dashboard" className={navClass}>Learner</NavLink>
          <NavLink to="/admin/dashboard" className={navClass}>Admin</NavLink>
          <ButtonLink to="/login" variant="outline">Login</ButtonLink>
        </nav>
      </div>
    </header>
  );
}