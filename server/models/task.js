const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  summary: String,
  notes: String,

  target_date: Date,
  is_deadline: Boolean,
  is_start_date: Boolean,

  category: String,

  tags: [String],

  is_recurring: Boolean,
  frequency: String,
  recurring_days: String,
},
{timestamps: true});

var Task = mongoose.model('tasks', taskSchema);

module.exports = Task;
