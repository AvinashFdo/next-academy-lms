import { BookOpen, CheckCircle2, LockKeyhole, Mail, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <section className="container-page py-6 md:py-8">
      <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-[1fr,0.95fr]">
        <div className="flex min-h-[640px] flex-col justify-center rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm md:p-10">
          <div className="mx-auto max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
              <BookOpen className="h-4 w-4" />
              Join NEXT Academy
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Start learning with structured online courses
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-200 md:text-lg">
              Create your learner account to access courses, track progress, attempt quizzes,
              and earn certificates as you complete your learning journey.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                'Browse and enroll in courses',
                'Track lesson progress',
                'Access quizzes and activities',
                'Receive completion certificates',
              ].map((item) => (
                <div key={item} className="inline-flex items-center gap-3 text-sm text-slate-100">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Create Account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your details below to register as a learner.
            </p>
          </div>

          <form className="mt-8 grid gap-5">
            <Field label="Full Name" icon={User2}>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <Field label="Email Address" icon={Mail}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <Field label="Password" icon={LockKeyhole}>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <Field label="Confirm Password" icon={LockKeyhole}>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Create Account
            </button>
          </form>

          <div className="mt-5 text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Login
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