const User = require('../models/User');

// @desc    Get all users (Admin only)
// @route   GET /api/users/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords for security
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User removed" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};