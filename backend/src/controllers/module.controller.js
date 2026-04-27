import {
  createModule,
  deleteModule,
  getModulesByCourseId,
  updateModule,
} from '../services/module.service.js';

export async function getModules(req, res) {
  try {
    const { courseId } = req.params;

    const modules = await getModulesByCourseId(courseId);

    return res.status(200).json({
      message: 'Modules fetched successfully',
      modules,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to fetch modules',
    });
  }
}

export async function addModule(req, res) {
  try {
    const { courseId, title } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({
        message: 'Course ID and title are required',
      });
    }

    const createdModule = await createModule(courseId, title);

    return res.status(201).json({
      message: 'Module created successfully',
      module: createdModule,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to create module',
    });
  }
}

export async function editModule(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'Module title is required',
      });
    }

    const updatedModule = await updateModule(id, title);

    return res.status(200).json({
      message: 'Module updated successfully',
      module: updatedModule,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to update module',
    });
  }
}

export async function removeModule(req, res) {
  try {
    const { id } = req.params;

    await deleteModule(id);

    return res.status(200).json({
      message: 'Module deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to delete module',
    });
  }
}