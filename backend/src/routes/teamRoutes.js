const express = require('express');
const router = express.Router();
const { createTeam, getAllTeams, getMyTeams } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Protected routes
router.post('/', protect, createTeam);

// Protected + Admin only route
router.get('/all', protect, authorize('Admin'), getAllTeams);

// Protected route for users to get their own teams
router.get('/my-teams', protect, getMyTeams);

module.exports = router;