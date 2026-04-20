import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { ImagePlus, Plus, Save } from 'lucide-react';

export default function CreateCoursePage() {
  return (
    <section>
      <PageShell
        title="Create Course"
        description="Set up a new course by defining its details, pricing, learning outcomes, and publishing status."
        action={
          <ButtonLink to="/admin/dashboard" variant="outline">
            Back to Dashboard
          </ButtonLink>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr,0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Course Information</h2>
              <p className="mt-1 text-slate-600">
                Enter the basic information learners will see in the course catalog and details page.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Course Title">
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Category">
                <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500">
                  <option>Marketing</option>
                  <option>Analytics</option>
                  <option>Management</option>
                  <option>Design</option>
                </select>
              </Field>

              <Field label="Course Type">
                <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500">
                  <option>Paid</option>
                  <option>Free</option>
                </select>
              </Field>

              <Field label="Price">
                <input
                  type="text"
                  placeholder="Enter course price"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Level">
                <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </Field>

              <Field label="Duration">
                <input
                  type="text"
                  placeholder="e.g. 6 Weeks"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>
            </div>

            <div className="mt-5 grid gap-5">
              <Field label="Short Description">
                <textarea
                  rows="3"
                  placeholder="Write a short course description"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Detailed Description">
                <textarea
                  rows="5"
                  placeholder="Write a detailed description for the course details page"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Course Thumbnail</h2>
              <p className="mt-1 text-slate-600">
                Upload a visual thumbnail to represent the course in the catalog.
              </p>
            </div>

            <div className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                <ImagePlus className="h-6 w-6 text-slate-700" />
              </div>
              <div className="mt-4 text-lg font-medium text-slate-900">Upload course thumbnail</div>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Drag and drop an image here or choose a file from your device.
              </p>
              <button className="mt-5 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                Choose File
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Learning Outcomes</h2>
                <p className="mt-1 text-slate-600">
                  List what learners will gain by completing this course.
                </p>
              </div>

              <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                <Plus className="h-4 w-4" />
                Add Outcome
              </button>
            </div>

            <div className="grid gap-3">
              {[
                'Understand core marketing channels',
                'Plan simple campaigns',
                'Read performance metrics',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <span className="text-slate-700">{item}</span>
                  <button className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Publish Settings</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Control the visibility and readiness of this course before making it available to learners.
            </p>

            <div className="mt-5 grid gap-4">
              <Field label="Status">
                <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500">
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Unpublished</option>
                </select>
              </Field>

              <Field label="Instructor Name">
                <input
                  type="text"
                  defaultValue="NEXT Academy"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>
            </div>

            <div className="mt-6 grid gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                <Save className="h-4 w-4" />
                Save Course
              </button>

              <button className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                Publish Course
              </button>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">Preview summary</div>
              <div className="mt-3 grid gap-3 text-sm">
                <PreviewRow label="Category" value="Marketing" />
                <PreviewRow label="Type" value="Paid" />
                <PreviewRow label="Level" value="Beginner" />
                <PreviewRow label="Price" value="$120" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}