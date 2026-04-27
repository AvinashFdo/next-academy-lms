import express from 'express';
import {
  createCourseHandler,
  deleteCourseHandler,
  getCourseHandler,
  getCoursesHandler,
  getCourseCategoriesHandler,
  updateCourseHandler,
} from '../controllers/course.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

// Public
router.get('/categories', getCourseCategoriesHandler);
router.get('/', getCoursesHandler);
router.get('/:id', getCourseHandler);

// Admin only
router.post('/', authenticate, authorizeRoles('ADMIN'), createCourseHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateCourseHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteCourseHandler);

export default router;