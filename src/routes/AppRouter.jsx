import DashboardLayout from '@/layouts/DashboardLayout';
import PublicLayout from '@/layouts/PublicLayout';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import LoginPage from '@/pages/auth/LoginPage';
import LearnerDashboardPage from '@/pages/learner/LearnerDashboardPage';
import LearningPage from '@/pages/learner/LearningPage';
import CourseDetailsPage from '@/pages/public/CourseDetailsPage';
import CatalogPage from '@/pages/public/CatalogPage';
import HomePage from '@/pages/public/HomePage';
import CourseBuilderPage from '@/pages/admin/CourseBuilderPage';
import CreateCoursePage from '@/pages/admin/CreateCoursePage';
//import MyCoursesPage from '@/pages/learner/MyCoursesPage';
import CertificatesPage from '@/pages/learner/CertificatesPage';
import QuizPage from '@/pages/learner/QuizPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ManageCoursesPage from '@/pages/admin/ManageCoursesPage';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CatalogPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/learner/dashboard" element={<LearnerDashboardPage />} />
        {/*<Route path="/learner/my-courses" element={<MyCoursesPage />} />*/}
        <Route path="/learner/certificates" element={<CertificatesPage />} />
        <Route path="/learner/courses/:courseId/quiz/:quizId" element={<QuizPage />} />
        <Route path="/learner/learning" element={<LearningPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/courses" element={<ManageCoursesPage />} />
        <Route path="/admin/course-builder" element={<CourseBuilderPage />} />
        <Route path="/admin/create-course" element={<CreateCoursePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}