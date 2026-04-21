import AdminSidebar from '@/components/admin/AdminSidebar';
import Navbar from '@/components/common/Navbar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="py-8">
        <div className="grid gap-4 lg:grid-cols-[auto,1fr]">
          <div className="pl-4">
            <AdminSidebar
              collapsed={collapsed}
              onToggle={() => setCollapsed((prev) => !prev)}
            />
          </div>

          <div className="min-w-0 pr-6">
            <div className="container-page !max-w-none">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}