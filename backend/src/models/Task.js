const mongoose = require('mongoose');

// Define the schema first
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['To Do', 'In Progress', 'Done'], 
    default: 'To Do' 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium' 
  },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    required: true 
  },
  dueDate: Date,
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Attach the cascading delete hook to taskSchema
taskSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const Comment = mongoose.model('Comment');
    await Comment.deleteMany({ task: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Task', taskSchema);