import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { ImagePlus, Plus, Save, UploadCloud, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultCategories = [
  'Academic Development',
  'Analytics',
  'Management',
  'Design',
  'Marketing',
];

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newOutcome, setNewOutcome] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic Development',
    type: 'PAID',
    price: '',
    level: 'Beginner',
    duration: '',
    description: '',
    longDescription: '',
    thumbnail: '',
    status: 'DRAFT',
    instructor: 'NEXT Academy',
  });

  const [outcomes, setOutcomes] = useState([
    'Understand core marketing channels',
    'Plan simple campaigns',
    'Read performance metrics',
  ]);

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:5000/api/courses/categories');
        const data = await response.json();

        if (response.ok && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories');
      }
    }

    fetchCategories();
  }, []);

  const saveCategories = (updatedCategories) => {
    setCategories(updatedCategories);
    localStorage.setItem('courseCategories', JSON.stringify(updatedCategories));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category' && value === 'ADD_NEW') {
      setShowCategoryInput(true);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && value === 'FREE' ? { price: '' } : {}),
    }));
  };

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) return;

    const updatedCategories = categories.includes(trimmedCategory)
      ? categories
      : [trimmedCategory, ...categories];

    saveCategories(updatedCategories);

    setFormData((prev) => ({
      ...prev,
      category: trimmedCategory,
    }));

    setNewCategory('');
    setShowCategoryInput(false);
  };

  const handleAddOutcome = () => {
    const trimmedOutcome = newOutcome.trim();

    if (!trimmedOutcome) return;

    setOutcomes((prev) => [...prev, trimmedOutcome]);
    setNewOutcome('');
  };

  const handleRemoveOutcome = (indexToRemove) => {
    setOutcomes((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleThumbnailFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        thumbnail: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleThumbnailFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleThumbnailFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveThumbnail = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: '',
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (publish = false) => {
    try {
      setSaving(true);
      setErrorMessage('');

      const token = localStorage.getItem('token');

      const payload = {
        title: formData.title,
        category: formData.category,
        type: formData.type,
        price: formData.type === 'FREE' ? 0 : Number(formData.price || 0),
        level: formData.level,
        duration: formData.duration,
        description: formData.description,
        longDescription: formData.longDescription,
        thumbnail: formData.thumbnail || null,
        instructor: formData.instructor || 'NEXT Academy',
        status: publish ? 'PUBLISHED' : formData.status,
        outcomes,
      };

      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create course');
      }

      navigate('/admin/courses');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const previewPrice =
    formData.type === 'FREE' ? 'Free' : formData.price ? `$${formData.price}` : '$0';

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
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Category">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  <option value="ADD_NEW">+ Add New Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {showCategoryInput ? (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter new category"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      Add
                    </button>
                  </div>
                ) : null}
              </Field>

              <Field label="Course Type">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  <option value="PAID">Paid</option>
                  <option value="FREE">Free</option>
                </select>
              </Field>

              <Field label="Price">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter course price"
                  disabled={formData.type === 'FREE'}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 disabled:bg-slate-100"
                />
              </Field>

              <Field label="Level">
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </Field>

              <Field label="Duration">
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 6 Weeks"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>
            </div>

            <div className="mt-5 grid gap-5">
              <Field label="Short Description">
                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short course description"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Detailed Description">
                <textarea
                  rows="5"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
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
                Upload a thumbnail from your device or drag and drop an image here.
              </p>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:bg-slate-100"
            >
              {formData.thumbnail ? (
                <div className="w-full">
                  <div className="relative mx-auto h-56 max-w-xl overflow-hidden rounded-3xl bg-slate-200">
                    <img
                      src={formData.thumbnail}
                      alt="Course thumbnail preview"
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-5 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                  >
                    Replace Image
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <UploadCloud className="h-6 w-6 text-slate-700" />
                  </div>
                  <div className="mt-4 text-lg font-medium text-slate-900">
                    Drag and drop thumbnail here
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Or choose an image from your device. Recommended format: JPG or PNG.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-5 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                  >
                    Choose File
                  </button>
                </>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Learning Outcomes</h2>
              <p className="mt-1 text-slate-600">
                List what learners will gain by completing this course.
              </p>
            </div>

            <div className="mb-5 grid gap-3 md:grid-cols-[1fr,auto]">
              <input
                type="text"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Enter a learning outcome"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />

              <button
                type="button"
                onClick={handleAddOutcome}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                Add Outcome
              </button>
            </div>

            <div className="grid gap-3">
              {outcomes.length > 0 ? (
                outcomes.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <span className="text-slate-700">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOutcome(index)}
                      className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                  No learning outcomes added yet.
                </div>
              )}
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
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="UNPUBLISHED">Unpublished</option>
                </select>
              </Field>

              <Field label="Instructor Name">
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>
            </div>

            {errorMessage ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            ) : null}

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Course'}
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={saving}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Publish Course
              </button>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">Preview summary</div>
              <div className="mt-3 grid gap-3 text-sm">
                <PreviewRow label="Category" value={formData.category || '-'} />
                <PreviewRow label="Type" value={formData.type === 'FREE' ? 'Free' : 'Paid'} />
                <PreviewRow label="Level" value={formData.level || '-'} />
                <PreviewRow label="Price" value={previewPrice} />
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