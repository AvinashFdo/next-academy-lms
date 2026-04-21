import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { Save } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';

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

export default function EditUserPage() {
  const { userId } = useParams();

  const user = users.find((item) => item.id === userId);

  if (!user) {
    return <Navigate to="/admin/users" replace />;
  }

  return (
    <section>
      <PageShell
        title="Edit User"
        description="Update user information, role assignment, and account status."
        action={
          <ButtonLink to="/admin/users" variant="outline">
            Back to Manage Users
          </ButtonLink>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.45fr,0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">User Information</h2>
              <p className="mt-1 text-slate-600">
                Update the core account details for this user.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name">
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Email Address">
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Role">
                <select
                  defaultValue={user.role}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  <option>Admin</option>
                  <option>Learner</option>
                  <option>Finance</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  defaultValue={user.status}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </Field>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Account Summary</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the current role and status of this account before saving changes.
            </p>

            <div className="mt-5 grid gap-4">
              <InfoRow label="Current Role" value={user.role} />
              <InfoRow label="Current Status" value={user.status} />
              <InfoRow label="User ID" value={user.id} />
            </div>

            <div className="mt-6 grid gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                <Save className="h-4 w-4" />
                Save Changes
              </button>

              <button className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}