const Team = require('../models/Team');
const Project = require('../models/Project'); // Critical: Required to fetch projects within getMyTeams

/**
 * @desc    Create a new team
 * @route   POST /api/teams
 * @access  Private
 */
const createTeam = async (req, res) => {
  try {
    // req.user.id is populated by your authMiddleware (protect)
    const team = await Team.create({
      name: req.body.name,
      owner: req.user.id,
      members: [req.user.id] // The owner is added as the first member automatically
    });

    res.status(201).json({ success: true, data: team });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/**
 * @desc    Get teams the logged-in user belongs to, including project counts/details
 * @route   GET /api/teams/my-teams
 * @access  Private
 */
const getMyTeams = async (req, res) => {
  try {
    // 1. Find all teams where the user is listed in the members array
    const teams = await Team.find({ members: req.user.id });
    
    // 2. Aggregate projects for each team to provide the dashboard with nested data
    const teamsWithProjects = await Promise.all(teams.map(async (team) => {
      const projects = await Project.find({ team: team._id });
      // Return the team document data spread with the associated projects
      return { ...team._doc, projects };
    }));

    res.status(200).json({ success: true, teams: teamsWithProjects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * @desc    Get all teams across the platform (Admin only)
 * @route   GET /api/teams/all
 * @access  Private/Admin
 */
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('owner', 'name email');
    res.status(200).json({ success: true, count: teams.length, data: teams });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// EXPLICIT EXPORT: This object allows teamRoutes.js to destructure the functions correctly.
// This prevents the 'argument handler must be a function' TypeError.
module.exports = {
  createTeam,
  getMyTeams,
  getAllTeams
};