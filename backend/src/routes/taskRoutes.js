const express = require('express');
const router = express.Router();
const { createTask, updateTaskStage } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { addComment } = require('../controllers/taskController');

router.route('/')
  .post(protect, createTask);

router.route('/:id/status')
  .put(protect, updateTaskStage);

router.post('/:id/comments', protect, addComment);

module.exports = router;