import prisma from '../config/prisma.js';

export async function createCourse(data) {
  return prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      category: data.category,
      type: data.type,
      price: Number(data.price) || 0,
      level: data.level,
      duration: data.duration,
      instructor: data.instructor || 'NEXT Academy',
      thumbnail: data.thumbnail || null,
      status: data.status || 'DRAFT',
      outcomes: Array.isArray(data.outcomes) ? data.outcomes : [],
    },
  });
}

export async function getAllCourses() {
  return prisma.course.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getCourseById(courseId) {
  return prisma.course.findUnique({
    where: { id: courseId },
  });
}

export async function updateCourse(courseId, data) {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!existingCourse) {
    throw new Error('Course not found');
  }

    return prisma.course.update({
    where: { id: courseId },
    data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.longDescription !== undefined && { longDescription: data.longDescription }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.price !== undefined && { price: Number(data.price) || 0 }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.instructor !== undefined && { instructor: data.instructor || 'NEXT Academy' }),
        ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail || null }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.outcomes !== undefined && {
        outcomes: Array.isArray(data.outcomes) ? data.outcomes : [],
        }),
    },
    });
}

export async function deleteCourse(courseId) {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!existingCourse) {
    throw new Error('Course not found');
  }

  return prisma.course.delete({
    where: { id: courseId },
  });
}

export async function getCourseCategories() {
  const courses = await prisma.course.findMany({
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });

  return courses.map((course) => course.category).filter(Boolean);
}