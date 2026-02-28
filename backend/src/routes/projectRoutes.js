const express = require('express');
const router = express.Router();
const { createProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/projects
// @desc    Create a new project within a team
// @access  Private
router.post('/', protect, createProject);

// You can add more routes here later, such as:
// router.get('/:teamId', protect, getTeamProjects);

module.exports = router;