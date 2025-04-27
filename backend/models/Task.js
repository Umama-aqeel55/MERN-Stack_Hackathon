// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'To Do' },
    // You might want to associate tasks with a user later
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;