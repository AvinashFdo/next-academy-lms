import express from 'express';
import {
  addLesson,
  editLesson,
  removeLesson,
} from '../controllers/lesson.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('ADMIN'), addLesson);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), editLesson);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), removeLesson);

export default router;