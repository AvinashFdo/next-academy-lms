import {
  createLesson,
  deleteLesson,
  updateLesson,
} from '../services/lesson.service.js';

export async function addLesson(req, res) {
  try {
    const {
      moduleId,
      title,
      type,
      duration,
      contentUrl,
      embedCode,
      fileName,
      description,
    } = req.body;

    if (!moduleId || !title || !type) {
      return res.status(400).json({
        message: 'Module ID, title, and type are required',
      });
    }

    const lesson = await createLesson(moduleId, {
      title,
      type,
      duration,
      contentUrl,
      embedCode,
      fileName,
      description,
    });

    return res.status(201).json({
      message: 'Lesson created successfully',
      lesson,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to create lesson',
    });
  }
}

export async function editLesson(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      duration,
      contentUrl,
      embedCode,
      fileName,
      description,
    } = req.body;

    if (!title || !type) {
      return res.status(400).json({
        message: 'Title and type are required',
      });
    }

    const lesson = await updateLesson(id, {
      title,
      type,
      duration,
      contentUrl,
      embedCode,
      fileName,
      description,
    });

    return res.status(200).json({
      message: 'Lesson updated successfully',
      lesson,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to update lesson',
    });
  }
}

export async function removeLesson(req, res) {
  try {
    const { id } = req.params;

    await deleteLesson(id);

    return res.status(200).json({
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to delete lesson',
    });
  }
}