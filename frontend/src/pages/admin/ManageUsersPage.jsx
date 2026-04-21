import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { Search, PencilLine } from 'lucide-react';
import { useMemo, useState } from 'react';

const users = [
  {
    id: 'u-001',
    name: 'Ayesha Rahman',
    email: 'ayesha.rahman@example.com',
    role: 'Learner',
    status: 'Active',
  },
  {
    id: 'u-002',
    name: 'Omar Khalid',
    email: 'omar.khalid@example.com',
    role: 'Learner',
    status: 'Active',
  },
  {
    id: 'u-003',
    name: 'Sara Nadeem',
    email: 'sara.nadeem@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 'u-004',
    name: 'Ibrahim Hassan',
    email: 'ibrahim.hassan@example.com',
    role: 'Finance',
    status: 'Inactive',
  },
  {
    id: 'u-005',
    name: 'Maya Perera',
    email: 'maya.perera@example.com',
    role: 'Learner',
    status: 'Active',
  },
];

export default function ManageUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === 'All' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);

  return (
    <section>
      <PageShell
        title="Manage Users"
        description="Search, review, and manage platform users, roles, and account status."
        action={
          <ButtonLink to="/admin/dashboard" variant="outline">
            Back to Dashboard
          </ButtonLink>
        }
      />

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr,220px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-slate-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Learner">Learner</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div className="mt-4 text-sm text-slate-500">
        Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
      </div>

      {filteredUsers.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.3fr,1.5fr,0.8fr,0.8fr,0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-600 md:grid">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          <div className="divide-y divide-slate-200">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid gap-4 px-6 py-4 md:grid-cols-[1.3fr,1.5fr,0.8fr,0.8fr,0.8fr] md:items-center"
              >
                <div className="text-base font-semibold text-slate-900">{user.name}</div>

                <div className="text-sm text-slate-700">{user.email}</div>

                <div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {user.role}
                  </span>
                </div>

                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="flex items-center justify-start md:justify-end">
                  <ButtonLink
                    to={`/admin/users/${user.id}/edit`}
                    variant="outline"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm whitespace-nowrap"
                  >
                    <PencilLine className="h-4 w-4" />
                    Edit
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No users found for your search.
        </div>
      )}
    </section>
  );
}