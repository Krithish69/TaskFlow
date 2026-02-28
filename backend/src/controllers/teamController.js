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