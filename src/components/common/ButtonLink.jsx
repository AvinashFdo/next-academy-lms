import { Link } from 'react-router-dom';

export default function ButtonLink({ to, children, variant = 'primary', className = '' }) {
  const styles =
    variant === 'outline'
      ? 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
      : 'bg-slate-900 text-white hover:bg-slate-800';

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}