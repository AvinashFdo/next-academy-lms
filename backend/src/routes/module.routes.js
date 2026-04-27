import express from 'express';
import {
  addModule,
  editModule,
  getModules,
  removeModule,
} from '../controllers/module.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/course/:courseId', getModules);

router.post('/', authenticate, authorizeRoles('ADMIN'), addModule);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), editModule);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), removeModule);

export default router;