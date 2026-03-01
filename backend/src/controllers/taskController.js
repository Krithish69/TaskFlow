const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, project, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      priority: priority || 'Medium',
      status: 'To Do', // Default status for new tasks
      createdBy: req.user.id,
      dueDate
    });

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateTaskStage = async (req, res) => {
  const { status } = req.body; // Expecting 'To Do', 'In Progress', or 'Done'
  
  const task = await Task.findByIdAndUpdate(
    req.params.id, 
    { status }, 
    { new: true }
  );

  res.status(200).json({ success: true, data: task });
};

// @desc    Add a comment to a task
// @route   POST /api/tasks/:id/comments
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const newComment = {
      user: req.user.id, // From Auth Middleware
      text
    };

    task.comments.push(newComment);
    await task.save();

    res.status(201).json({ success: true, data: task.comments });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/project/:projectId
exports.getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email');
    
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};