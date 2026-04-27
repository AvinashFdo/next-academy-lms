import prisma from '../config/prisma.js';

export async function createLesson(moduleId, data) {
  const lessonCount = await prisma.lesson.count({
    where: { moduleId },
  });

  return prisma.lesson.create({
    data: {
      moduleId,
      title: data.title,
      type: data.type,
      duration: data.duration || '',
      contentUrl: data.contentUrl || null,
      embedCode: data.embedCode || null,
      fileName: data.fileName || null,
      description: data.description || null,
      order: lessonCount + 1,
    },
  });
}

export async function updateLesson(lessonId, data) {
  return prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title: data.title,
      type: data.type,
      duration: data.duration || '',
      contentUrl: data.contentUrl || null,
      embedCode: data.embedCode || null,
      fileName: data.fileName || null,
      description: data.description || null,
    },
  });
}

export async function deleteLesson(lessonId) {
  return prisma.lesson.delete({
    where: { id: lessonId },
  });
}