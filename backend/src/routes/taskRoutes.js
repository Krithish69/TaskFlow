const express = require('express');
const router = express.Router();
const { 
  createTask, 
  updateTaskStage, 
  addComment, 
  getProjectTasks,
  deleteTask
} = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTask);

router.route('/:id')
  .delete(protect, admin, deleteTask);

router.route('/:id/status')
  .put(protect, updateTaskStage);

router.post('/:id/comments', protect, addComment);

router.get('/project/:projectId', protect, getProjectTasks);

module.exports = router;