const express = require('express');
const router = express.Router();
const { createTeam, getAllTeams } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Protected routes
router.post('/', protect, createTeam);

// Protected + Admin only route
router.get('/all', protect, authorize('Admin'), getAllTeams);

module.exports = router;