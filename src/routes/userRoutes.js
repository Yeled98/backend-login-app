// Import dependencies
const express = require("express");
const {
  register,
  login,
  getUserData,
  updateUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a router
const router = express.Router();

// Route for user registration
router.post("/", register);

// Route for user login
router.post("/login", login);

// Route to get user data (protected)
router.get("/me", authMiddleware, getUserData);

// Route to update user data (protected)
router.put("/", authMiddleware, updateUser);

module.exports = router;
