const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"   // ✅ new incidents start as Pending
  },
  adminHidden: { 
    type: Boolean, 
    default: false       // ✅ ensures admins see new incidents
  },
  createdAt: { 
    type: Date, 
    default: Date.now    // ✅ timestamp for tracking
  }
});

module.exports = mongoose.model("Incident", incidentSchema);
