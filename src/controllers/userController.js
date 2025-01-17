// Import dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate the request
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    // Validate length of the password field (minimum 6 characters)
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });

    // Validate the email format
    const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email is already registered" });

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Return the user data without the password
    delete user.password;

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the request
    if (!email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    // Validate length of the password field (minimum 6 characters)
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });

    // Validate the email format
    const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", jwt: token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get user data (protected)
exports.getUserData = async (req, res) => {
  try {
    // Return only public user information
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};

// Update user information (protected)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Prepare updated data
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Update user information in the database
    await User.update(updatedData, { where: { id: req.user.id } });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user information", error });
  }
};
