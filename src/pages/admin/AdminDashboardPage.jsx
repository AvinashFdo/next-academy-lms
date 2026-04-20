import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import StatCard from '@/components/common/StatCard';
import { courses } from '@/data/courses';
import { adminStats } from '@/data/dashboard';
import { BarChart3, FileText, Layers3 } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <section>
      <PageShell
        title="Admin Dashboard"
        description="Manage courses, monitor platform activity, and review key operational insights."
        
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr,1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Course Management</h2>
              <p className="mt-1 text-slate-600">
                Review published courses and manage core learning content.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <div className="whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                {courses.length} total courses
              </div>

              <ButtonLink to="/admin/create-course" className="whitespace-nowrap">
                Create Course
              </ButtonLink>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700">
                        {course.category}
                      </span>
                      <span className="rounded-full bg-slate-900 px-3 py-1 font-medium text-white">
                        Published
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

                  <ButtonLink to="/admin/course-builder" variant="outline">
                    Edit
                  </ButtonLink>
                </div>
              </div>
            ))}
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
              <h2 className="text-xl font-semibold text-slate-900">Next Pages</h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Suggested admin modules to build next for a more complete operations flow.
            </p>

            <div className="mt-5 grid gap-3 text-sm text-slate-700">
              {[
                'User management',
                'Finance dashboard',
                'Quiz and certificate screens',
                'CMS management pages',
                'Database & Backend Development',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}