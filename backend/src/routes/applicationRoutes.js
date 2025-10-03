// src/routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createApplication,
  submitApplication,
  getApplication,
} = require("../controllers/applicationController");

router.post("/", auth, createApplication);
router.post("/:id/submit", auth, submitApplication);
router.get("/:id", auth, getApplication);

module.exports = router;
