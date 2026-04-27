import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { Search, PencilLine, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      setErrorMessage('');

      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch courses');
      }

      setCourses(data.courses || []);
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(courseId) {
    const confirmed = window.confirm('Are you sure you want to delete this course?');

    if (!confirmed) return;

    try {
      setDeletingCourseId(courseId);
      setErrorMessage('');

      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete course');
      }

      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setDeletingCourseId(null);
    }
  }

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const courseStatus = course.status ?? 'PUBLISHED';
      const matchesStatus = statusFilter === 'All' || courseStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courses, search, statusFilter]);

  return (
    <section>
      <PageShell
        title="Manage Courses"
        description="View, search, and manage all courses available on the platform."
        action={<ButtonLink to="/admin/create-course">Create Course</ButtonLink>}
      />

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr,220px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by course title or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-slate-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
        >
          <option value="All">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="UNPUBLISHED">Unpublished</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          Loading courses...
        </div>
      ) : errorMessage ? (
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-600">
          {errorMessage}
        </div>
      ) : (
        <>
          <div className="mt-4 text-sm text-slate-500">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </div>

          {filteredCourses.length > 0 ? (
            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[1.7fr,1fr,0.6fr,0.6fr,1.25fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-600 md:grid">
                <div>Course</div>
                <div>Category</div>
                <div>Type</div>
                <div>Price</div>
                <div className="text-right">Actions</div>
              </div>

              <div className="divide-y divide-slate-200">
                {filteredCourses.map((course) => {
                  const courseStatus = course.status ?? 'PUBLISHED';

                  return (
                    <div
                      key={course.id}
                      className="grid gap-4 px-6 py-4 md:grid-cols-[1.7fr,1fr,0.6fr,0.6fr,1.25fr] md:items-center"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-base font-semibold text-slate-900">
                            {course.title}
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              courseStatus === 'PUBLISHED'
                                ? 'bg-emerald-100 text-emerald-700'
                                : courseStatus === 'DRAFT'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {courseStatus}
                          </span>
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                          {course.level} • {course.duration}
                        </div>
                      </div>

                      <div className="text-sm text-slate-700">{course.category}</div>

                      <div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {course.type}
                        </span>
                      </div>

                      <div className="text-sm font-medium text-slate-900">
                        {course.type === 'FREE' ? 'Free' : `$${course.price}`}
                      </div>

                      <div className="flex items-center justify-start gap-2 md:justify-end">
                        <ButtonLink
                          to={`/admin/courses/${course.id}/edit`}
                          variant="outline"
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm whitespace-nowrap"
                        >
                          <PencilLine className="h-4 w-4" />
                          Edit
                        </ButtonLink>

                        <ButtonLink
                          to={`/admin/courses/${course.id}/builder`}
                          variant="outline"
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm whitespace-nowrap"
                        >
                          Builder
                        </ButtonLink>

                        <button
                          type="button"
                          onClick={() => handleDelete(course.id)}
                          disabled={deletingCourseId === course.id}
                          className="inline-flex items-center justify-center rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No courses found for your search.
            </div>
          )}
        </>
      )}
    </section>
  );
}