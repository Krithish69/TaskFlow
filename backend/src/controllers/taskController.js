const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, project, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      priority: priority || 'Medium',
      status: 'To Do',
      createdBy: req.user.id,
      dueDate
    });

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update task status/stage
// @route   PUT /api/tasks/:id/status
const updateTaskStage = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Add a comment to a task
// @route   POST /api/tasks/:id/comments
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const newComment = {
      user: req.user.id,
      text
    };

    task.comments.push(newComment);
    await task.save();

    res.status(201).json({ success: true, data: task.comments });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/project/:projectId
const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await task.deleteOne(); // Triggers pre-hook in Task model

    res.status(200).json({
      success: true,
      message: 'Task removed successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unified Export Object
module.exports = {
  createTask,
  updateTaskStage,
  addComment,
  getProjectTasks,
  deleteTask
};