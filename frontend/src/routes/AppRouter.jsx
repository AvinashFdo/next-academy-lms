import DashboardLayout from '@/layouts/DashboardLayout';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ManageCoursesPage from '@/pages/admin/ManageCoursesPage';
import EditCoursePage from '@/pages/admin/EditCoursePage';
import CourseBuilderPage from '@/pages/admin/CourseBuilderPage';
import CreateCoursePage from '@/pages/admin/CreateCoursePage';
import ManageUsersPage from '@/pages/admin/ManageUsersPage';
import EditUserPage from '@/pages/admin/EditUserPage';
import EnrollmentsPage from '@/pages/admin/EnrollmentsPage';

import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

import LearnerDashboardPage from '@/pages/learner/LearnerDashboardPage';
import LearningPage from '@/pages/learner/LearningPage';
import CertificatesPage from '@/pages/learner/CertificatesPage';
import QuizPage from '@/pages/learner/QuizPage';

import CourseDetailsPage from '@/pages/public/CourseDetailsPage';
import CatalogPage from '@/pages/public/CatalogPage';
import HomePage from '@/pages/public/HomePage';

// 🔐 NEW
import RequireAuth from '@/components/auth/RequireAuth';
import RedirectIfAuth from '@/components/auth/RedirectIfAuth';

import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Routes>
      {/* 🌐 PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CatalogPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

        {/* 🔐 Prevent logged-in users from accessing */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/register"
          element={
            <RedirectIfAuth>
              <RegisterPage />
            </RedirectIfAuth>
          }
        />
      </Route>

      {/* 🎓 LEARNER ROUTES */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/learner/dashboard"
          element={
            <RequireAuth allowedRoles={['LEARNER']}>
              <LearnerDashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/learner/learning"
          element={
            <RequireAuth allowedRoles={['LEARNER']}>
              <LearningPage />
            </RequireAuth>
          }
        />

        <Route
          path="/learner/certificates"
          element={
            <RequireAuth allowedRoles={['LEARNER']}>
              <CertificatesPage />
            </RequireAuth>
          }
        />

        <Route
          path="/learner/courses/:courseId/quiz/:quizId"
          element={
            <RequireAuth allowedRoles={['LEARNER']}>
              <QuizPage />
            </RequireAuth>
          }
        />
      </Route>

      {/* 🛠 ADMIN ROUTES */}
      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <AdminDashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <ManageCoursesPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/courses/:courseId/edit"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <EditCoursePage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/courses/:courseId/builder"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <CourseBuilderPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/create-course"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <CreateCoursePage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <ManageUsersPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/users/:userId/edit"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <EditUserPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/enrollments"
          element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <EnrollmentsPage />
            </RequireAuth>
          }
        />
      </Route>

      {/* 🔁 FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}