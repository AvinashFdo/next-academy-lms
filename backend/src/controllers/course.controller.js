import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCourseCategories,
  updateCourse,
} from '../services/course.service.js';

export async function createCourseHandler(req, res) {
  try {
    const {
      title,
      description,
      longDescription,
      category,
      type,
      price,
      level,
      duration,
      instructor,
      thumbnail,
      status,
      outcomes,
    } = req.body;

    if (!title || !description || !category || !type || !level || !duration) {
      return res.status(400).json({
        message: 'Title, description, category, type, level, and duration are required',
      });
    }

    const course = await createCourse({
      title,
      description,
      longDescription,
      category,
      type,
      price,
      level,
      duration,
      instructor,
      thumbnail,
      status,
      outcomes,
    });

    return res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to create course',
    });
  }
}

export async function getCoursesHandler(req, res) {
  try {
    const courses = await getAllCourses();

    return res.status(200).json({
      message: 'Courses fetched successfully',
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to fetch courses',
    });
  }
}

export async function getCourseHandler(req, res) {
  try {
    const { id } = req.params;

    const course = await getCourseById(id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      message: 'Course fetched successfully',
      course,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to fetch course',
    });
  }
}

export async function updateCourseHandler(req, res) {
  try {
    const { id } = req.params;

    const updatedCourse = await updateCourse(id, req.body);

    return res.status(200).json({
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to update course',
    });
  }
}

export async function deleteCourseHandler(req, res) {
  try {
    const { id } = req.params;

    await deleteCourse(id);

    return res.status(200).json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to delete course',
    });
  }
}

export async function getCourseCategoriesHandler(req, res) {
  try {
    const categories = await getCourseCategories();

    return res.status(200).json({
      message: 'Course categories fetched successfully',
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to fetch categories',
    });
  }
}