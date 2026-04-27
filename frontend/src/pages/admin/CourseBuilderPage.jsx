import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import {
  Plus,
  PencilLine,
  GripVertical,
  PlayCircle,
  FileText,
  CircleHelp,
  Trash2,
  X,
} from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const lessonTypes = ['Video', 'PDF', 'H5P', 'Quiz', 'Assignment'];

const emptyLessonForm = {
  title: '',
  type: 'Video',
  description: '',
  contentUrl: '',
  embedCode: '',
  fileName: '',
};

export default function CourseBuilderPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [moduleModalMode, setModuleModalMode] = useState('create');
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleTitle, setModuleTitle] = useState('');

  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [lessonModalMode, setLessonModalMode] = useState('create');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonModuleId, setLessonModuleId] = useState('');
  const [lessonForm, setLessonForm] = useState(emptyLessonForm);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function loadBuilderData() {
      try {
        setLoading(true);
        setErrorMessage('');

        const courseResponse = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const courseData = await courseResponse.json();

        if (!courseResponse.ok) {
          throw new Error(courseData.message || 'Failed to fetch course');
        }

        const modulesResponse = await fetch(`http://localhost:5000/api/modules/course/${courseId}`);
        const modulesData = await modulesResponse.json();

        if (!modulesResponse.ok) {
          throw new Error(modulesData.message || 'Failed to fetch modules');
        }

        setCourse(courseData.course);
        setModules(modulesData.modules || []);
      } catch (error) {
        setErrorMessage(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    loadBuilderData();
  }, [courseId]);

  const totalLessons = useMemo(() => {
    return modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0);
  }, [modules]);

  const refreshModules = async () => {
    const response = await fetch(`http://localhost:5000/api/modules/course/${courseId}`);
    const data = await response.json();

    if (response.ok) {
      setModules(data.modules || []);
    }
  };

  const openCreateModuleModal = () => {
    setModuleModalMode('create');
    setSelectedModule(null);
    setModuleTitle('');
    setModuleModalOpen(true);
  };

  const openEditModuleModal = (module) => {
    setModuleModalMode('edit');
    setSelectedModule(module);
    setModuleTitle(module.title);
    setModuleModalOpen(true);
  };

  const closeModuleModal = () => {
    setModuleModalOpen(false);
    setSelectedModule(null);
    setModuleTitle('');
  };

  const handleSubmitModule = async (e) => {
    e.preventDefault();

    if (!moduleTitle.trim()) {
      setErrorMessage('Module title is required');
      return;
    }

    try {
      setActionLoading(true);
      setErrorMessage('');

      const url =
        moduleModalMode === 'create'
          ? 'http://localhost:5000/api/modules'
          : `http://localhost:5000/api/modules/${selectedModule.id}`;

      const method = moduleModalMode === 'create' ? 'POST' : 'PUT';

      const payload =
        moduleModalMode === 'create'
          ? { courseId, title: moduleTitle.trim() }
          : { title: moduleTitle.trim() };

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save module');
      }

      await refreshModules();
      closeModuleModal();
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    const confirmed = window.confirm('Delete this module and all its lessons?');

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setErrorMessage('');

      const response = await fetch(`http://localhost:5000/api/modules/${moduleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete module');
      }

      await refreshModules();
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setActionLoading(false);
    }
  };

  const openCreateLessonModal = (moduleId) => {
    setLessonModalMode('create');
    setSelectedLesson(null);
    setLessonModuleId(moduleId);
    setLessonForm(emptyLessonForm);
    setLessonModalOpen(true);
  };

  const openEditLessonModal = (lesson) => {
    setLessonModalMode('edit');
    setSelectedLesson(lesson);
    setLessonModuleId(lesson.moduleId);
    setLessonForm({
      title: lesson.title || '',
      type: lesson.type || 'Video',
      description: lesson.description || '',
      contentUrl: lesson.contentUrl || '',
      embedCode: lesson.embedCode || '',
      fileName: lesson.fileName || '',
    });
    setLessonModalOpen(true);
  };

  const closeLessonModal = () => {
    setLessonModalOpen(false);
    setSelectedLesson(null);
    setLessonModuleId('');
    setLessonForm(emptyLessonForm);
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;

    if (name === 'uploadedFile') {
      handleLessonFileChange(value);
      return;
    }

    setLessonForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'type'
        ? {
            contentUrl: '',
            embedCode: '',
            fileName: '',
          }
        : {}),
    }));
  };

  const handleLessonFileChange = (file) => {
    if (!file) return;

    const isPdf = lessonForm.type === 'PDF';
    const isH5p = lessonForm.type === 'H5P';

    if (isPdf && file.type !== 'application/pdf') {
      setErrorMessage('Please upload a valid PDF file.');
      return;
    }

    if (isH5p && !file.name.toLowerCase().endsWith('.h5p')) {
      setErrorMessage('Please upload a valid .h5p file.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setLessonForm((prev) => ({
        ...prev,
        contentUrl: reader.result,
        fileName: file.name,
      }));
    };

    reader.readAsDataURL(file);
  };  

  const handleSubmitLesson = async (e) => {
    e.preventDefault();

    if (!lessonForm.title.trim()) {
      setErrorMessage('Lesson title is required');
      return;
    }

    if (!lessonForm.type.trim()) {
      setErrorMessage('Lesson type is required');
      return;
    }

    try {
      setActionLoading(true);
      setErrorMessage('');

      const url =
        lessonModalMode === 'create'
          ? 'http://localhost:5000/api/lessons'
          : `http://localhost:5000/api/lessons/${selectedLesson.id}`;

      const method = lessonModalMode === 'create' ? 'POST' : 'PUT';

      const payload = {
        ...(lessonModalMode === 'create' && { moduleId: lessonModuleId }),
        title: lessonForm.title.trim(),
        type: lessonForm.type,
        duration: '',
        description: lessonForm.description.trim() || null,
        contentUrl: lessonForm.contentUrl || null,
        embedCode: lessonForm.embedCode.trim() || null,
        fileName: lessonForm.fileName || null,
      };

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save lesson');
      }

      await refreshModules();
      closeLessonModal();
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    const confirmed = window.confirm('Delete this lesson?');

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setErrorMessage('');

      const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete lesson');
      }

      await refreshModules();
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setActionLoading(false);
    }
  };

  if (!loading && !course && !errorMessage) {
    return <Navigate to="/admin/courses" replace />;
  }

  return (
    <section>
      <PageShell
        title="Course Builder"
        description="Structure modules, lessons, and learning content for the selected course."
        action={
          <ButtonLink to="/admin/courses" variant="outline">
            Back to Manage Courses
          </ButtonLink>
        }
      />

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading course builder...
        </div>
      ) : errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-600 shadow-sm">
          {errorMessage}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.45fr,0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{course.title}</h2>
                  <p className="mt-1 text-slate-600">
                    Organize modules, lessons, and course resources in one place.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span
                    className={`rounded-full px-3 py-1 font-medium ${
                      course.status === 'PUBLISHED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : course.status === 'DRAFT'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {course.status}
                  </span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 font-medium text-white">
                    {modules.length} Modules
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                    {totalLessons} Lessons
                  </span>
                </div>
              </div>
            </div>

            {modules.length > 0 ? (
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
                            {module.lessons?.length || 0} lesson
                            {(module.lessons?.length || 0) !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModuleModal(module)}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                          <PencilLine className="h-4 w-4" />
                          Edit Module
                        </button>

                        <button
                          type="button"
                          onClick={() => openCreateLessonModal(module.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
                        >
                          <Plus className="h-4 w-4" />
                          Add Lesson
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteModule(module.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center justify-center rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {module.lessons?.length > 0 ? (
                        module.lessons.map((lesson, lessonIndex) => (
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
                                  {lesson.description ? (
                                    <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                                      Description added
                                    </span>
                                  ) : null}
                                  {lesson.contentUrl ? (
                                    <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                                      Resource added
                                    </span>
                                  ) : null}
                                  {lesson.fileName ? (
                                    <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                                      {lesson.fileName}
                                    </span>
                                  ) : null}                                  
                                  {lesson.embedCode ? (
                                    <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                                      Embed added
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => openEditLessonModal(lesson)}
                                disabled={actionLoading}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white disabled:opacity-60"
                              >
                                <PencilLine className="h-4 w-4" />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteLesson(lesson.id)}
                                disabled={actionLoading}
                                className="inline-flex items-center justify-center rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                          No lessons added yet.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
                No modules added yet. Start by adding your first module.
              </div>
            )}

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
              <button
                type="button"
                onClick={openCreateModuleModal}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                Add New Module
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Course Settings</h2>
              <div className="mt-5 grid gap-4">
                <InfoRow label="Category" value={course.category} />
                <InfoRow label="Level" value={course.level} />
                <InfoRow label="Price" value={course.type === 'FREE' ? 'Free' : `$${course.price}`} />
                <InfoRow label="Status" value={course.status} />
              </div>

              <div className="mt-6 grid gap-3">
                <ButtonLink to={`/admin/courses/${course.id}/edit`} variant="outline">
                  Edit Course Details
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Content Summary</h2>
              <div className="mt-5 grid gap-3 text-sm">
                <SummaryRow label="Total modules" value={String(modules.length)} />
                <SummaryRow label="Total lessons" value={String(totalLessons)} />
                <SummaryRow label="Course type" value={course.type} />
                <SummaryRow label="Publishing status" value={course.status} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Notes</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This builder is connected to backend modules and lessons. Use the lesson modal
                to add videos, PDFs, H5P files, quizzes, and assignments.
              </p>
            </div>
          </div>
        </div>
      )}

      {moduleModalOpen ? (
        <ModuleModal
          mode={moduleModalMode}
          moduleTitle={moduleTitle}
          setModuleTitle={setModuleTitle}
          onClose={closeModuleModal}
          onSubmit={handleSubmitModule}
          loading={actionLoading}
        />
      ) : null}

      {lessonModalOpen ? (
        <LessonModal
          mode={lessonModalMode}
          lessonForm={lessonForm}
          onChange={handleLessonChange}
          onClose={closeLessonModal}
          onSubmit={handleSubmitLesson}
          loading={actionLoading}
        />
      ) : null}
    </section>
  );
}

function ModuleModal({ mode, moduleTitle, setModuleTitle, onClose, onSubmit, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {mode === 'create' ? 'Add Module' : 'Edit Module'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Organize course lessons into clear learning sections.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-5">
          <Field label="Module Title">
            <input
              type="text"
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              placeholder="e.g. Module 1: Introduction"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            />
          </Field>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Add Module' : 'Save Module'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LessonModal({ mode, lessonForm, onChange, onClose, onSubmit, loading }) {
  const type = lessonForm.type;

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    onChange({ target: { name: 'uploadedFile', value: file } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    onChange({ target: { name: 'uploadedFile', value: file } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {mode === 'create' ? 'Add Lesson' : 'Edit Lesson'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add lesson details and connect the correct learning material.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Lesson Title">
              <input
                type="text"
                name="title"
                value={lessonForm.title}
                onChange={onChange}
                placeholder="Enter lesson title"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <Field label="Lesson Type">
              <select
                name="type"
                value={lessonForm.type}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              >
                {lessonTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Lesson Description">
            <textarea
              rows="3"
              name="description"
              value={lessonForm.description}
              onChange={onChange}
              placeholder="Write a short description for this lesson"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            />
          </Field>

          {type === 'Video' ? (
            <div className="grid gap-5">
              <Field label="Video URL">
                <input
                  type="text"
                  name="contentUrl"
                  value={lessonForm.contentUrl}
                  onChange={onChange}
                  placeholder="YouTube, SharePoint, or hosted video URL"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>

              <Field label="Embed Code / Embed URL">
                <textarea
                  rows="4"
                  name="embedCode"
                  value={lessonForm.embedCode}
                  onChange={onChange}
                  placeholder="Paste iframe embed code or embed URL"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                />
              </Field>
            </div>
          ) : null}

          {type === 'PDF' || type === 'H5P' ? (
            <FileDropBox
              type={type}
              fileName={lessonForm.fileName}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onFileInput={handleFileInput}
            />
          ) : null}

          {type === 'Quiz' ? (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
              Create this quiz lesson first. After saving, use the future <strong>Build Quiz</strong>{' '}
              action to add questions, answers, pass marks, and attempts.
            </div>
          ) : null}

          {type === 'Assignment' ? (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
              Create this assignment lesson first. After saving, use the future{' '}
              <strong>Configure Assignment</strong> action to add submission instructions,
              file requirements, and grading settings.
            </div>
          ) : null}

          <div className="rounded-3xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {type === 'Video'
              ? 'Use a hosted video URL or embed code for YouTube, SharePoint, or similar platforms.'
              : type === 'PDF'
                ? 'Upload a PDF file for this lesson. Full backend file storage can be connected later.'
                : type === 'H5P'
                  ? 'Upload the .h5p activity file. H5P playback will be connected later with an H5P player.'
                  : 'Quiz and assignment builders will be handled in dedicated interfaces.'}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Add Lesson' : 'Save Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FileDropBox({ type, fileName, onDrop, onDragOver, onFileInput }) {
  const acceptType = type === 'PDF' ? '.pdf,application/pdf' : '.h5p';

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:bg-slate-100"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
        <FileText className="h-6 w-6 text-slate-700" />
      </div>

      <div className="mt-4 text-lg font-medium text-slate-900">
        {type === 'PDF' ? 'Upload PDF file' : 'Upload H5P file'}
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Drag and drop your {type === 'PDF' ? 'PDF' : '.h5p'} file here, or choose it from your device.
      </p>

      {fileName ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
          {fileName}
        </div>
      ) : null}

      <label className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
        Choose File
        <input
          type="file"
          accept={acceptType}
          onChange={onFileInput}
          className="hidden"
        />
      </label>
    </div>
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
    H5P: {
      icon: <CircleHelp className="h-4 w-4" />,
      className: 'bg-indigo-100 text-indigo-700',
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

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
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