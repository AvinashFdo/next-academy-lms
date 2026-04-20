import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { courses, lessonPreview } from '@/data/courses';
import { Clock3, Download, ExternalLink, FileText, PlayCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function LearningPage() {
  const course = Array.isArray(courses) && courses.length > 0 ? courses[0] : null;

  useEffect(() => {
    if (!course?.h5pEmbedUrl) return;

    const existing = document.querySelector('script[data-h5p-resizer="true"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://app.lumi.education/api/v1/h5p/core/js/h5p-resizer.js';
    script.charset = 'UTF-8';
    script.setAttribute('data-h5p-resizer', 'true');
    document.body.appendChild(script);
  }, [course?.h5pEmbedUrl]);

  if (!course) {
    return (
      <section className="p-10">
        <h2>No course data available</h2>
      </section>
    );
  }

  const progress = typeof course.progress === 'number' ? course.progress : 45;
  const previewLessons = Array.isArray(lessonPreview) ? lessonPreview : [];
  const resources = Array.isArray(course.resources) ? course.resources : [];
  const hasVideo = Boolean(course.videoEmbedUrl);
  const hasH5P = Boolean(course.h5pEmbedUrl);
  const quizLink = '/learner/courses/academic-skills/quiz/quiz-1';

  return (
    <section>
      <PageShell
        title={course.title || 'Learning Page'}
        description="Resume from your last watched point and continue your learning journey."
        action={
          <ButtonLink to="/learner/dashboard" variant="outline">
            Back to Dashboard
          </ButtonLink>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr,0.95fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5 md:px-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Current Lesson</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Lesson 2 of {course.lessons || 0}
                  </p>
                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {progress}% complete
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {hasVideo ? (
                <div className="overflow-hidden rounded-3xl bg-slate-900">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src={course.videoEmbedUrl}
                      title={`${course.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-72 items-center justify-center rounded-3xl bg-slate-900 text-white md:h-[28rem]">
                  <div className="text-center">
                    <PlayCircle className="mx-auto mb-4 h-14 w-14" />
                    <div className="text-xl font-semibold">Video Player Placeholder</div>
                  </div>
                </div>
              )}

              {course.videoUrl ? (
                <div className="mt-4">
                  <a
                    href={course.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open video in YouTube
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Lesson Resources</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Access notes, worksheets, and supporting materials for this lesson.
                </p>
              </div>
              <div className="hidden whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 md:block">
                {resources.length} resource{resources.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              {resources.length > 0 ? (
                resources.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 px-4 py-4 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium text-slate-800">{item.name}</div>
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                            <FileText className="h-3.5 w-3.5" />
                            PDF
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={item.openUrl || item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open
                      </a>

                      <a
                        href={item.downloadUrl || item.url}
                        download
                        className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-slate-500">
                  No resources available.
                </div>
              )}
            </div>
          </div>

          {hasH5P ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Activity</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Practice the lesson with interactive content.
                  </p>
                </div>
                <div className="hidden whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 md:block">
                  H5P
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white pt-4">
                <div className="w-full overflow-hidden">
                  <iframe
                    src={course.h5pEmbedUrl}
                    title={`${course.title} interactive activity`}
                    className="block w-[102%] border-0"
                    style={{
                      height: '560px',
                      marginLeft: '1%',
                    }}
                    allowFullScreen
                    allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Course Progress</h2>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>Overall progress</span>
                <span className="font-medium text-slate-700">{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-slate-900"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Mark Lesson Complete
              </button>
              <ButtonLink to={quizLink} variant="outline">
                Attempt Quiz
              </ButtonLink>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <Clock3 className="h-4 w-4" />
                Next up
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Complete this lesson to continue through the rest of the course.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Lesson List</h2>

            <div className="mt-5 grid gap-3">
              {previewLessons.length > 0 ? (
                previewLessons.map((lesson, index) => (
                  <div key={lesson.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex justify-between gap-3">
                      <div className="text-slate-900">
                        {index + 1}. {lesson.title}
                      </div>
                      <div className="text-sm">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            lesson.preview
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lesson.preview ? 'Done' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-slate-500">{lesson.duration}</div>
                  </div>
                ))
              ) : (
                <div>No lessons available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}