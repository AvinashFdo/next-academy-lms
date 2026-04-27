import prisma from '../config/prisma.js';

export async function getModulesByCourseId(courseId) {
  return prisma.module.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
      },
    },
  });
}

export async function createModule(courseId, title) {
  const moduleCount = await prisma.module.count({
    where: { courseId },
  });

  return prisma.module.create({
    data: {
      title,
      courseId,
      order: moduleCount + 1,
    },
    include: {
      lessons: true,
    },
  });
}

export async function updateModule(moduleId, title) {
  return prisma.module.update({
    where: { id: moduleId },
    data: { title },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
      },
    },
  });
}

export async function deleteModule(moduleId) {
  return prisma.module.delete({
    where: { id: moduleId },
  });
}