import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import StatCard from '@/components/common/StatCard';
import { courses } from '@/data/courses';
import { learnerStats } from '@/data/dashboard';
import { ArrowRight, Award, Clock3, PlayCircle } from 'lucide-react';

export default function LearnerDashboardPage() {
  return (
    <section>
      <PageShell
        title="Learner Dashboard"
        description="Track your enrolled courses, continue learning, review quiz performance, and access your certificates."
        action={<ButtonLink to="/learner/learning">Continue Learning</ButtonLink>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {learnerStats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr,1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">My Courses</h2>
              <p className="mt-1 text-slate-600">
                Pick up where you left off and keep your progress moving.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              {courses.slice(0, 3).length} active course{courses.slice(0, 3).length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {courses.slice(0, 3).map((course) => (
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
                        {course.type}
                      </span>
                    </div>

                    <div className="mt-3 text-lg font-semibold text-slate-900">
                      {course.title}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <PlayCircle className="h-4 w-4" />
                        {course.lessons} lessons
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-4 w-4" />
                        In progress
                      </span>
                    </div>
                  </div>

                  <ButtonLink to="/learner/learning" variant="outline">
                    Open Course
                  </ButtonLink>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                    <span>Progress</span>
                    <span className="font-medium text-slate-700">{course.progress}% completed</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Recent Quiz Results</h2>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                Last attempts
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              {[
                ['Academic Skills - Quiz 1', '86%'],
                ['Business Analytics - Quiz 2', '81%'],
                ['Project Management - Quiz 1', '85%'],
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
              <Award className="h-5 w-5 text-slate-700" />
              <h2 className="text-xl font-semibold text-slate-900">Certificates</h2>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="font-semibold text-slate-900">Academic Skills</div>
              <div className="mt-1 text-sm text-slate-500">Completed on March 20, 2026</div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
                <span className="text-slate-600">Certificate status</span>
                <span className="font-medium text-slate-900">Available</span>
              </div>

              <ButtonLink
                to="/learner/certificates"
                variant="outline"
                className="mt-4 inline-flex w-full items-center justify-center gap-2"
              >
                View Certificates
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}