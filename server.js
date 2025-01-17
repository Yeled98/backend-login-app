// Import dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./src/models/userModel");

// Configure environment variables
require("dotenv").config({ path: ".env" });

// Import routes
const userRoutes = require("./src/routes/userRoutes");

// Initialize Express application
const app = express();

// Security middleware
app.use(helmet());

// Middleware to enable CORS
app.use(
  cors({
    origin: process.env.ORIGINS_ALLOWED.split(","),
    credentials: true,
  })
);

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

// Function to start the server
const startServer = async () => {
  try {
    // Authenticate and sync the database
    await sequelize.authenticate();
    console.log("Connected to SQLite database.");

    // Sync models with the database
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");

    // Define port
    const port = process.env.PORT || 1337;

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    // Handle any startup errors
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
