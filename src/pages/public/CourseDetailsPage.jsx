import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { courses, lessonPreview } from '@/data/courses';
import { Clock3, Layers3, PlayCircle, User2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function CourseDetailsPage() {
  const { courseId } = useParams();

  const course = courses.find((item) => String(item.id) === String(courseId));

  if (!course) {
    return (
      <section className="container-page py-10 md:py-12">
        <PageShell
          title="Course Not Found"
          description="The course you are looking for could not be found."
          action={
            <ButtonLink to="/courses" variant="outline">
              Back to Catalog
            </ButtonLink>
          }
        />

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Course not found</h2>
          <p className="mt-2 text-slate-600">
            Please return to the catalog and choose an available course.
          </p>
        </div>
      </section>
    );
  }

  const stats = [
    { label: 'Instructor', value: course.instructor ?? 'NEXT Academy', icon: User2 },
    { label: 'Modules', value: String(course.modules ?? 0), icon: Layers3 },
    { label: 'Lessons', value: String(course.lessons ?? 0), icon: PlayCircle },
    { label: 'Duration', value: course.duration ?? 'TBD', icon: Clock3 },
  ];

  const outcomes = Array.isArray(course.outcomes) ? course.outcomes : [];
  const previewLessons = Array.isArray(lessonPreview) ? lessonPreview : [];

  return (
    <section className="container-page py-10 md:py-12">
      <PageShell
        title={course.title ?? 'Course Details'}
        description={course.longDescription ?? course.description ?? ''}
        action={
          <ButtonLink to="/courses" variant="outline">
            Back to Catalog
          </ButtonLink>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr,0.9fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5 md:px-8">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  {course.category ?? 'General'}
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-white">
                  {course.type ?? 'Course'}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  {course.level ?? 'Beginner'}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      <div className="mt-3 text-lg font-semibold text-slate-900">
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 h-72 overflow-hidden rounded-3xl bg-slate-200">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-sm text-slate-500">
                    Course thumbnail / preview area
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold text-slate-900">What you will learn</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This course is designed to help learners build practical, job-relevant
              skills through guided lessons and structured content.
            </p>

            {outcomes.length > 0 ? (
              <ul className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                {outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                Learning outcomes will be added soon.
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Course Content Preview</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Preview selected lessons and explore the learning structure before enrolling.
                </p>
              </div>
              <div className="hidden whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 md:block">
                {previewLessons.length} items
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {previewLessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 transition hover:bg-slate-50"
                >
                  <div>
                    <div className="font-medium text-slate-900">
                      {index + 1}. {lesson.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">{lesson.duration}</div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {lesson.preview ? 'Preview' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Enrollment</div>
            <div className="mt-2 text-4xl font-semibold text-slate-900">
              {course.formattedPrice ?? 'TBD'}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Get one-time access to lessons, downloadable resources, quizzes, and
              certificate eligibility upon completion.
            </p>

            <div className="mt-6 grid gap-3">
              <ButtonLink to="/login">
                {course.type === 'Free' ? 'Enroll Now' : 'Buy Now'}
              </ButtonLink>
              <ButtonLink to="/courses" variant="outline">
                Continue Browsing
              </ButtonLink>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">Included with this course</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Structured video lessons</li>
                <li>• Downloadable learning resources</li>
                <li>• Quiz participation</li>
                <li>• Certificate eligibility</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}