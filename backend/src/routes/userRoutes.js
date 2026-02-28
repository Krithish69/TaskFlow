const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/userController');

// Import both middlewares
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// 1. A route that any logged-in user can access
router.get('/profile', protect, (req, res) => res.send("Your Profile"));

// 2. A route ONLY an Admin can access (e.g., seeing all registered users)
// Notice the order: protect runs FIRST, then authorize runs SECOND.
router.get('/admin/users', protect, authorize('Admin'), getAllUsers);

// 3. A route that either an Admin or a Manager could access
router.delete('/:id', protect, authorize('Admin', 'Manager'), deleteUser);

module.exports = router;