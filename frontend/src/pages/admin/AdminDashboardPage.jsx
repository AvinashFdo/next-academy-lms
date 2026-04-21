import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import StatCard from '@/components/common/StatCard';
import { courses } from '@/data/courses';
import { adminStats } from '@/data/dashboard';
import { ArrowRight, BarChart3, FileText, Layers3 } from 'lucide-react';

export default function AdminDashboardPage() {
  const recentCourses = courses.slice(0, 3);

  return (
    <section>
      <PageShell
        title="Admin Dashboard"
        description="Monitor platform activity, review course health, and navigate core admin operations."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr,0.95fr]">
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Course Overview</h2>
                <p className="mt-1 text-slate-600">
                  Review recently managed courses and jump into course administration.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700">
                          {course.category}
                        </span>
                        <span className="rounded-full bg-slate-900 px-3 py-1 font-medium text-white">
                          {course.status ?? 'Published'}
                        </span>
                      </div>

                      <div className="mt-3 text-lg font-semibold text-slate-900">
                        {course.title}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Layers3 className="h-4 w-4" />
                          {course.modules} modules
                        </span>
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <ButtonLink
                        to={`/admin/courses/${course.id}/edit`}
                        variant="outline"
                      >
                        Edit
                      </ButtonLink>
                      <ButtonLink
                        to={`/admin/courses/${course.id}/builder`}
                      >
                        Builder
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Common admin tasks for day-to-day operations.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <ButtonLink to="/admin/create-course">Create New Course</ButtonLink>
              <ButtonLink to="/admin/courses" variant="outline">
                Review All Courses
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-slate-700" />
              <h2 className="text-xl font-semibold text-slate-900">Quick Reports</h2>
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              {[
                ['Course completion rate', '82%'],
                ['Average quiz score', '84%'],
                ['New enrollments this month', '67'],
                ['Pending payouts review', '04'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 transition hover:bg-slate-50"
                >
                  <span className="text-slate-700">{label}</span>
                  <span className="font-semibold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-700" />
              <h2 className="text-xl font-semibold text-slate-900">Admin Notes</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use the sidebar as the main admin navigation. Course-specific work should now start
              from Manage Courses, then continue into Edit Course or Course Builder for the selected course.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              This keeps the admin journey cleaner and avoids mixing dashboard summaries with content-editing flows.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}