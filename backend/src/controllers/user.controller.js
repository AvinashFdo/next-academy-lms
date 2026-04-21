import {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
} from '../services/user.service.js';

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to fetch users',
    });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to fetch user',
    });
  }
}

export async function editUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    if (!name || !email || !role || !status) {
      return res.status(400).json({
        message: 'Name, email, role, and status are required',
      });
    }

    const updatedUser = await updateUser(id, {
      name,
      email,
      role,
      status,
    });

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to update user',
    });
  }
}

export async function changeUserStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: 'Status is required',
      });
    }

    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status value',
      });
    }

    const updatedUser = await updateUserStatus(id, status);

    return res.status(200).json({
      message: 'User status updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Failed to update user status',
    });
  }
}