const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
  try {
    // req.user.id comes from your Auth Middleware
    const team = await Team.create({
      name: req.body.name,
      owner: req.user.id,
      members: [req.user.id] // Owner is automatically a member
    });

    res.status(201).json({ success: true, data: team });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Add this to your existing teamController.js
exports.getMyTeams = async (req, res) => {
  try {
    // Find teams where user is a member and populate their projects
    const teams = await Team.find({ members: req.user.id });
    
    // For each team, we manually fetch related projects 
    // (Or use Mongoose virtuals/populate)
    const teamsWithProjects = await Promise.all(teams.map(async (team) => {
      const projects = await Project.find({ team: team._id });
      return { ...team._doc, projects };
    }));

    res.status(200).json({ success: true, teams: teamsWithProjects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get all teams (Admin only)
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('owner', 'name email');
    res.status(200).json({ success: true, count: teams.length, data: teams });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};