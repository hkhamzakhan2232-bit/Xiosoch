// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title:           { type: String, required: true, trim: true },
  description:     { type: String, required: true, trim: true },
  difficultyLevel: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  durationHours:   { type: Number, required: true, min: 0 },
  price:           { type: Number, required: true, min: 0 },
  isPremium:       { type: Boolean, default: false },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;