const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  dueDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Nested Comments Array
  comments: [CommentSchema]
}, { timestamps: true });

taskSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const Comment = mongoose.model('Comment');
    // Delete all comments where the taskId matches this task's _id
    await Comment.deleteMany({ task: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Task', TaskSchema);