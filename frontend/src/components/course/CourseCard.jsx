import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="h-48 overflow-hidden bg-slate-200">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Course Thumbnail
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            {course.category}
          </span>
          <span className="rounded-full bg-slate-900 px-3 py-1 font-medium text-white">
            {course.type}
          </span>
        </div>

        <div>
          <h3 className="line-clamp-2 text-xl font-semibold leading-7 text-slate-900">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
            {course.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
          <span className="text-slate-500">{course.lessons} lessons</span>
          <span className="font-semibold text-slate-900">{course.formattedPrice}</span>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}