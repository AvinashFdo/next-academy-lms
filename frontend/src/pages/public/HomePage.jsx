import ButtonLink from '@/components/common/ButtonLink';
import SectionHeader from '@/components/common/SectionHeader';
import StatCard from '@/components/common/StatCard';
import CourseCard from '@/components/course/CourseCard';
import { courses } from '@/data/courses';
import { motion } from 'framer-motion';
import { Award, PlayCircle, Search, BookOpen, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <section className="container-page py-8 md:py-12">
        <div
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900"
          style={{
            backgroundImage: "url('/images/hero/academy-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative grid gap-8 px-6 py-12 text-white md:px-10 md:py-16 lg:grid-cols-[1.2fr,0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                  Practical online learning for academic and professional growth
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
                  Discover structured courses, interactive learning experiences, downloadable resources,
                  and progress-based learning designed to support real learner outcomes.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink to="/courses">Browse Courses</ButtonLink>
                <ButtonLink to="/login" variant="outline">
                  Login
                </ButtonLink>
              </div>

              <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-200">
                {[
                  'Video-based learning',
                  'Interactive activities',
                  'Certificates',
                ].map((item) => (
                  <div key={item} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur md:p-8">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Courses" value="24+" dark />
                  <StatCard label="Learners" value="180+" dark />
                  <StatCard label="Engagement" value="82%" dark />
                  <StatCard label="Certificates" value="340+" dark />
                </div>

                <div className="mt-6 rounded-3xl bg-white/10 p-5">
                  <div className="mb-2 text-sm text-slate-200">Why it matters</div>
                  <div className="text-lg font-medium leading-8">
                    A scalable digital learning experience for course delivery, learner engagement,
                    and measurable progress.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-page py-4 md:py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Flexible learning', value: 'Recorded video lessons' },
            { label: 'Interactive delivery', value: 'H5P activities & quizzes' },
            { label: 'Resource support', value: 'PDFs and downloadable materials' },
            { label: 'Recognized outcomes', value: 'Progress tracking & certificates' },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">{item.label}</div>
              <div className="mt-2 text-xl font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-10 md:py-16">
        <SectionHeader
          eyebrow="Featured courses"
          title="Explore high-impact learning paths"
          description="Browse courses designed to support academic development, business capability building, and practical skill growth."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="container-page py-10 md:py-16">
        <SectionHeader
          eyebrow="Why NEXT Academy"
          title="A modern platform for structured digital learning"
          description="Designed to give learners and administrators a clear, engaging, and professional experience from course discovery to completion."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Search,
              title: 'Easy discovery',
              text: 'Browse, search, and explore courses through a clean, learner-friendly interface.',
            },
            {
              icon: PlayCircle,
              title: 'Blended learning content',
              text: 'Support learning with video lessons, downloadable files, quizzes, and interactive activities.',
            },
            {
              icon: Award,
              title: 'Completion outcomes',
              text: 'Track learner progress and support completion-based recognition and certificates.',
            },
            {
              icon: BookOpen,
              title: 'Scalable course delivery',
              text: 'Organize course structures, lesson content, and resources in a way that supports future platform growth.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}