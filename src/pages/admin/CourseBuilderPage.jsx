import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { Plus, PencilLine, GripVertical, PlayCircle, FileText, CircleHelp } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Module 1: Introduction',
    lessons: [
      { id: 1, title: 'Welcome to the Course', type: 'Video', duration: '08:45' },
      { id: 2, title: 'Course Overview', type: 'PDF', duration: '5 pages' },
      { id: 3, title: 'Getting Started Quiz', type: 'Quiz', duration: '10 questions' },
    ],
  },
  {
    id: 2,
    title: 'Module 2: Core Concepts',
    lessons: [
      { id: 4, title: 'Understanding the Fundamentals', type: 'Video', duration: '12:10' },
      { id: 5, title: 'Key Frameworks', type: 'Video', duration: '15:30' },
      { id: 6, title: 'Module Notes', type: 'PDF', duration: '8 pages' },
    ],
  },
  {
    id: 3,
    title: 'Module 3: Practical Application',
    lessons: [
      { id: 7, title: 'Real-World Example', type: 'Video', duration: '14:20' },
      { id: 8, title: 'Practice Activity', type: 'Assignment', duration: 'Submitted task' },
    ],
  },
];

export default function CourseBuilderPage() {
  return (
    <section>
      <PageShell
        title="Course Builder"
        description="Structure course modules, lessons, and supporting resources before publishing."
        action={<ButtonLink to="/admin/dashboard" variant="outline">Back to Dashboard</ButtonLink>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.45fr,0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Digital Marketing Fundamentals</h2>
                <p className="mt-1 text-slate-600">
                  Organize modules, lessons, and course resources in one place.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                  Draft
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 font-medium text-white">
                  3 Modules
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                  8 Lessons
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {modules.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-900">
                        {module.title}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                      <PencilLine className="h-4 w-4" />
                      Edit Module
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                      <Plus className="h-4 w-4" />
                      Add Lesson
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-slate-400">
                          <GripVertical className="h-4 w-4" />
                        </div>

                        <div>
                          <div className="font-medium text-slate-900">
                            {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                            <LessonTypeBadge type={lesson.type} />
                            <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white">
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              <Plus className="h-4 w-4" />
              Add New Module
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Course Settings</h2>
            <div className="mt-5 grid gap-4">
              <InfoRow label="Category" value="Marketing" />
              <InfoRow label="Level" value="Beginner" />
              <InfoRow label="Price" value="$120" />
              <InfoRow label="Status" value="Draft" />
            </div>

            <div className="mt-6 grid gap-3">
              <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Save Changes
              </button>
              <button className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                Publish Course
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Content Summary</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <SummaryRow label="Total modules" value="3" />
              <SummaryRow label="Video lessons" value="4" />
              <SummaryRow label="Documents" value="2" />
              <SummaryRow label="Quizzes / Assignments" value="2" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Notes</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This page is meant to validate the admin course structuring flow before backend implementation.
              Later, module ordering, drag-and-drop, uploads, and publishing logic can be connected to APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LessonTypeBadge({ type }) {
  const config = {
    Video: {
      icon: <PlayCircle className="h-4 w-4" />,
      className: 'bg-blue-100 text-blue-700',
    },
    PDF: {
      icon: <FileText className="h-4 w-4" />,
      className: 'bg-amber-100 text-amber-700',
    },
    Quiz: {
      icon: <CircleHelp className="h-4 w-4" />,
      className: 'bg-emerald-100 text-emerald-700',
    },
    Assignment: {
      icon: <FileText className="h-4 w-4" />,
      className: 'bg-purple-100 text-purple-700',
    },
  };

  const item = config[type] || {
    icon: <FileText className="h-4 w-4" />,
    className: 'bg-slate-100 text-slate-700',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium ${item.className}`}>
      {item.icon}
      {type}
    </span>
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

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
      <span className="text-slate-700">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}