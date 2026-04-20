import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { courses } from '@/data/courses';
import { PencilLine, Trash2, Search } from 'lucide-react';
import { useState } from 'react';

export default function ManageCoursesPage() {
  const [search, setSearch] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <PageShell
        title="Manage Courses"
        description="View, edit, and manage all courses available on the platform."
        action={
          <ButtonLink to="/admin/create-course">
            Create Course
          </ButtonLink>
        }
      />

      {/* Search */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-slate-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-6 py-4 font-medium">Course</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.map((course) => (
              <tr
                key={course.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {course.title}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {course.category}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {course.type}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {course.formattedPrice}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    Published
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <ButtonLink
                      to="/admin/course-builder"
                      variant="outline"
                    >
                      <PencilLine className="h-4 w-4" />
                    </ButtonLink>

                    <button className="rounded-2xl border border-red-200 px-3 py-2 text-red-600 transition hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCourses.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No courses found.
          </div>
        )}
      </div>
    </section>
  );
}