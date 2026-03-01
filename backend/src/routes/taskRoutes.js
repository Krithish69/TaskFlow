const express = require('express');
const router = express.Router();
const { 
  createTask, 
  updateTaskStage, 
  getProjectTasks,
  deleteTask
} = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createTask);
router.delete('/:id', protect, admin, deleteTask);
router.put('/:id/status', protect, updateTaskStage);
router.get('/project/:projectId', protect, getProjectTasks);

module.exports = router;