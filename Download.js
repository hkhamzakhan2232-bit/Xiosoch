// models/Download.js
const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  file:        { type: String, required: true, trim: true }, // could be a URL or filename
  isPremium:   { type: Boolean, default: false },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const Download = mongoose.model('Download', downloadSchema);

module.exports = Download;