import {
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  LayoutDashboard,
  Layers3,
  ReceiptText,
  Users,
  BarChart3,
  ClipboardList,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Manage Courses',
    to: '/admin/courses',
    icon: Layers3,
  },
  {
    label: 'Create Course',
    to: '/admin/create-course',
    icon: FilePenLine,
  },
  {
    label: 'Course Builder',
    to: '/admin/courses',
    icon: ReceiptText,
    disabled: true,
  },
  {
    label: 'Manage Users',
    to: '/admin/users',
    icon: Users,
  },
  {
    label: 'Enrollments',
    to: '/admin/enrollments',
    icon: ClipboardList,
  },
  {
    label: 'Reports',
    to: '/admin/reports',
    icon: BarChart3,
    disabled: true,
  },
];

export default function AdminSidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`sticky top-24 h-[calc(100vh-7rem)] shrink-0 rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-4 flex items-center justify-between gap-2 px-2">
          {!collapsed ? (
            <div>
              <div className="text-sm font-medium text-slate-500">Admin Panel</div>
              <div className="text-lg font-semibold text-slate-900">NEXT Academy</div>
            </div>
          ) : (
            <div className="mx-auto h-10 w-10 rounded-2xl bg-slate-100" />
          )}

          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="grid gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <div
                  key={item.label}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-400 ${
                    collapsed ? 'justify-center' : ''
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed ? (
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <span>{item.label}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        Soon
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed ? <span>{item.label}</span> : null}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}