const express = require('express');
const router = express.Router();
const { createTask, updateTaskStage } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTask);

router.route('/:id/status')
  .put(protect, updateTaskStage);

module.exports = router;