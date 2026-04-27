import prisma from '../config/prisma.js';

export async function createQuizForLesson(lessonId, title) {
  const existing = await prisma.quiz.findUnique({
    where: { lessonId },
  });

  if (existing) {
    throw new Error('Quiz already exists for this lesson');
  }

  return prisma.quiz.create({
    data: {
      lessonId,
      title: title || 'New Quiz',
    },
  });
}

export async function getQuizByLesson(lessonId) {
  return prisma.quiz.findUnique({
    where: { lessonId },
    include: {
      questions: {
        include: {
          options: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });
}

export async function addQuestion(quizId, text) {
  const count = await prisma.question.count({
    where: { quizId },
  });

  return prisma.question.create({
    data: {
      quizId,
      text,
      order: count + 1,
    },
  });
}

export async function addOption(questionId, text, isCorrect = false) {
  return prisma.option.create({
    data: {
      questionId,
      text,
      isCorrect,
    },
  });
}

export async function deleteQuestion(questionId) {
  return prisma.question.delete({
    where: { id: questionId },
  });
}

export async function deleteOption(optionId) {
  return prisma.option.delete({
    where: { id: optionId },
  });
}