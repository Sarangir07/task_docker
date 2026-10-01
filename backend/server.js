const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());            // allow the React frontend to call this API
app.use(express.json());    // parse JSON request bodies

// Connect to local MongoDB (database name: taskmanager)
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// Task API routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
