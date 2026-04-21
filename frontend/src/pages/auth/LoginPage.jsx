import { BookOpen, CheckCircle2, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/learner/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page py-6 md:py-8">
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[1fr,0.95fr]">
        <div className="flex min-h-[640px] flex-col justify-center rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm md:p-10">
          <div className="mx-auto max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
              <BookOpen className="h-4 w-4" />
              Welcome Back
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Continue your learning journey
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-200 md:text-lg">
              Sign in to access your courses, continue lessons, attempt quizzes,
              and view your certificates.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                'Access enrolled courses',
                'Continue lesson progress',
                'Attempt quizzes and activities',
                'View certificates and results',
              ].map((item) => (
                <div key={item} className="inline-flex items-center gap-3 text-sm text-slate-100">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="self-center rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Login</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to access your courses and continue learning.
            </p>
          </div>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <Field label="Email Address" icon={Mail}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <Field label="Password" icon={LockKeyhole}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-5 text-sm text-slate-600">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        {Icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
        <div className="[&>input]:pl-11">{children}</div>
      </div>
    </div>
  );
}