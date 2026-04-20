import Navbar from '@/components/common/Navbar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="container-page py-10">
        <Outlet />
      </main>
    </div>
  );
}