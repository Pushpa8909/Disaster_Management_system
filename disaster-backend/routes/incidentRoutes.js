const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");

// GET all incidents
router.get("/", async (req, res) => {
  try {
    const { role } = req.query;
    let incidents;
    if (role === "admin") {
      // Admins see incidents not hidden (false or missing)
      incidents = await Incident.find({
        $or: [{ adminHidden: false }, { adminHidden: { $exists: false } }]
      });
    } else {
      // Users see all incidents
      incidents = await Incident.find();
    }
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD new incident
router.post("/", async (req, res) => {
  try {
    const newIncident = new Incident(req.body);
    await newIncident.save();
    res.json(newIncident);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Incident not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE incident (hide for admin, mark resolved for users)
router.delete("/:id", async (req, res) => {
  try {
    const hidden = await Incident.findByIdAndUpdate(
      req.params.id,
      { adminHidden: true, status: "Resolved" },
      { new: true }
    );
    if (!hidden) return res.status(404).json({ error: "Incident not found" });
    res.json({
      message: "Incident hidden from admin dashboard and marked resolved for users",
      incident: hidden
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
