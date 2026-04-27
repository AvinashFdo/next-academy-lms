import {
  createQuizForLesson,
  getQuizByLesson,
  addQuestion,
  addOption,
  deleteQuestion,
  deleteOption,
} from '../services/quiz.service.js';

export async function createQuiz(req, res) {
  try {
    const { lessonId, title } = req.body;

    if (!lessonId) {
      return res.status(400).json({ message: 'Lesson ID is required' });
    }

    const quiz = await createQuizForLesson(lessonId, title);

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Failed to create quiz',
    });
  }
}

export async function getQuiz(req, res) {
  try {
    const { lessonId } = req.params;

    const quiz = await getQuizByLesson(lessonId);

    res.status(200).json({
      message: 'Quiz fetched successfully',
      quiz,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Failed to fetch quiz',
    });
  }
}

export async function createQuestion(req, res) {
  try {
    const { quizId, text } = req.body;

    if (!quizId || !text) {
      return res.status(400).json({
        message: 'Quiz ID and question text are required',
      });
    }

    const question = await addQuestion(quizId, text);

    res.status(201).json({
      message: 'Question added',
      question,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function createOption(req, res) {
  try {
    const { questionId, text, isCorrect } = req.body;

    if (!questionId || !text) {
      return res.status(400).json({
        message: 'Question ID and option text are required',
      });
    }

    const option = await addOption(questionId, text, isCorrect);

    res.status(201).json({
      message: 'Option added',
      option,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function removeQuestion(req, res) {
  try {
    const { id } = req.params;

    await deleteQuestion(id);

    res.status(200).json({ message: 'Question deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function removeOption(req, res) {
  try {
    const { id } = req.params;

    await deleteOption(id);

    res.status(200).json({ message: 'Option deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}