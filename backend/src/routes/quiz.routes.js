import express from 'express';
import {
  createQuiz,
  getQuiz,
  createQuestion,
  createOption,
  removeQuestion,
  removeOption,
} from '../controllers/quiz.controller.js';

const router = express.Router();

router.post('/', createQuiz);
router.get('/:lessonId', getQuiz);

router.post('/question', createQuestion);
router.post('/option', createOption);

router.delete('/question/:id', removeQuestion);
router.delete('/option/:id', removeOption);

export default router;