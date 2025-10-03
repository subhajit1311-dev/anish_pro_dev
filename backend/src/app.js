// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve uploaded files
const path = require("path");
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "..", process.env.UPLOAD_DIR || "public/uploads")
  )
);

// load models (ensures they are registered)
require("./models/User");
require("./models/Startup");
require("./models/Application");
require("./models/Document");
require("./models/DocumentRequirement");
require("./models/Product");
require("./models/Investment");
require("./models/Investor");
require("./models/GovernmentOfficial");
require("./models/Session");
require("./models/YogaTutorial");
require("./models/YogaPoseFeedback");

// routes
const userRoutes = require("./routes/userRoutes");
const startupRoutes = require("./routes/startupRoutes");
const documentRoutes = require("./routes/documentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

app.use("/api/users", userRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server & DB connected, models loaded 🚀",
  });
});

module.exports = app;
