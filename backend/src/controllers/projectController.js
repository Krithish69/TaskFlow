const Project = require('../models/Project');
const Team = require('../models/Team');

// @desc    Create a new project within a team
// @route   POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { name, description, teamId, deadline } = req.body;

    // Verify user is a member of the team before allowing project creation
    const team = await Team.findById(teamId);
    if (!team || !team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to add projects to this team" });
    }

    const project = await Project.create({
      name,
      description,
      team: teamId,
      deadline
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};