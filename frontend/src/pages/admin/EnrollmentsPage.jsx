import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const enrollments = [
  {
    id: 'enr-001',
    learnerName: 'Ayesha Rahman',
    learnerEmail: 'ayesha.rahman@example.com',
    courseTitle: 'Academic Skills',
    enrolledDate: '2026-03-20',
    paymentStatus: 'Paid',
    progress: 25,
  },
  {
    id: 'enr-002',
    learnerName: 'Omar Khalid',
    learnerEmail: 'omar.khalid@example.com',
    courseTitle: 'Business Analytics Essentials',
    enrolledDate: '2026-03-24',
    paymentStatus: 'Free',
    progress: 50,
  },
  {
    id: 'enr-003',
    learnerName: 'Maya Perera',
    learnerEmail: 'maya.perera@example.com',
    courseTitle: 'Project Management Basics',
    enrolledDate: '2026-03-28',
    paymentStatus: 'Paid',
    progress: 15,
  },
  {
    id: 'enr-004',
    learnerName: 'Ibrahim Hassan',
    learnerEmail: 'ibrahim.hassan@example.com',
    courseTitle: 'UI/UX for Business Teams',
    enrolledDate: '2026-04-01',
    paymentStatus: 'Paid',
    progress: 0,
  },
];

export default function EnrollmentsPage() {
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((item) => {
      const matchesSearch =
        item.learnerName.toLowerCase().includes(search.toLowerCase()) ||
        item.learnerEmail.toLowerCase().includes(search.toLowerCase()) ||
        item.courseTitle.toLowerCase().includes(search.toLowerCase());

      const matchesPayment =
        paymentFilter === 'All' || item.paymentStatus === paymentFilter;

      return matchesSearch && matchesPayment;
    });
  }, [search, paymentFilter]);

  return (
    <section>
      <PageShell
        title="Enrollments"
        description="Review learner enrollments, payment type, and progress across all courses."
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
            placeholder="Search by learner, email, or course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-slate-500"
          />
        </div>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
        >
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Free">Free</option>
        </select>
      </div>

      <div className="mt-4 text-sm text-slate-500">
        Showing {filteredEnrollments.length} enrollment{filteredEnrollments.length !== 1 ? 's' : ''}
      </div>

      {filteredEnrollments.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.2fr,1.6fr,1fr,0.8fr,0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-600 md:grid">
            <div>Learner</div>
            <div>Course</div>
            <div>Enrolled Date</div>
            <div>Payment</div>
            <div>Progress</div>
          </div>

          <div className="divide-y divide-slate-200">
            {filteredEnrollments.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 px-6 py-4 md:grid-cols-[1.2fr,1.6fr,1fr,0.8fr,0.8fr] md:items-center"
              >
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    {item.learnerName}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {item.learnerEmail}
                  </div>
                </div>

                <div className="text-sm font-medium text-slate-800">
                  {item.courseTitle}
                </div>

                <div className="text-sm text-slate-700">
                  {item.enrolledDate}
                </div>

                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.paymentStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </div>

                <div>
                  <div className="mb-1 text-sm font-medium text-slate-700">
                    {item.progress}%
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No enrollments found for your search.
        </div>
      )}
    </section>
  );
}