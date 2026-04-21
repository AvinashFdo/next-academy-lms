import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { Save } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'LEARNER',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setErrorMessage('');

        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user');
        }

        setUser(data.user);
        setFormData({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          status: data.user.status,
        });
      } catch (error) {
        setErrorMessage(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setErrorMessage('');

      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user');
      }

      navigate('/admin/users');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (!loading && !user && !errorMessage) {
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

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading user...
        </div>
      ) : errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-600 shadow-sm">
          {errorMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.45fr,0.9fr]">
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                  />
                </Field>

                <Field label="Email Address">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                  />
                </Field>

                <Field label="Role">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="LEARNER">Learner</option>
                    <option value="FINANCE">Finance</option>
                  </select>
                </Field>

                <Field label="Status">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
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
                <InfoRow label="Current Role" value={formData.role} />
                <InfoRow label="Current Status" value={formData.status} />
                <InfoRow label="User ID" value={user.id} />
              </div>

              <div className="mt-6 grid gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
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