import express from 'express';
import {
  changeUserStatus,
  editUser,
  getUser,
  getUsers,
} from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles('ADMIN'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', editUser);
router.patch('/:id/status', changeUserStatus);

export default router;