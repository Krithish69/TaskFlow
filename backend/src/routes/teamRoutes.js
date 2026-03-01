const express = require('express');
const router = express.Router();

// Controllers are destructured from the exported object in teamController.js
const { 
  createTeam, 
  getAllTeams, 
  getMyTeams 
} = require('../controllers/teamController');

// Middleware for authentication and role-based access
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

/**
 * @route   POST /api/teams
 * @desc    Create a new team (Logged-in users)
 * @access  Private
 */
router.post('/', protect, createTeam);

/**
 * @route   GET /api/teams/my-teams
 * @desc    Get all teams where the current user is a member
 * @access  Private
 */
router.get('/my-teams', protect, getMyTeams);

/**
 * @route   GET /api/teams/all
 * @desc    Get every team in the system (Admin only)
 * @access  Private/Admin
 */
// Single definition of the /all route to prevent middleware redundancy
router.get('/all', protect, authorize('Admin'), getAllTeams);

module.exports = router;