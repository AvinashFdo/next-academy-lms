import { useMemo, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import CourseCard from '@/components/course/CourseCard';
import { courses } from '@/data/courses';

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = [...new Set(courses.map((course) => course.category))];
    return ['All', ...unique];
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <section className="container-page py-12 md:py-16">
      <SectionHeader
        eyebrow="Course Catalog"
        title="Explore all courses"
        description="Browse professional courses, search by keyword, and filter by category."
      />

      <div className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr,220px]">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Search courses
          </label>
          <input
            type="text"
            placeholder="Search by title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-500">
        Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No courses found for your search.
        </div>
      )}
    </section>
  );
}