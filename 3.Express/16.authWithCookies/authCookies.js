// To implement environment variables for sensitive information, secure cookies, and the SameSite attribute, follow these steps:

// Environment Variables: Store sensitive information such as JWT secret keys in environment variables.

// Secure Cookies: Ensure cookies are only sent over HTTPS in production by setting the secure flag based on the environment.

// SameSite Attribute: Set the SameSite attribute for cookies to prevent CSRF attacks.

// Here is an updated version of your code with these implementations:

// .env File
// First, create a .env file in the root of your project to store environment variables:



// JWT_SECRET=your_secret_key
// NODE_ENV=development
// Ensure this file is added to your .gitignore to prevent it from being committed to version control:

// .gitignore


// .env
// Updated Code
// Make sure you install the dotenv package to load environment variables from the .env file:



// npm install dotenv
// Then, update your code to use environment variables and set secure cookies:



require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const verifyToken = require('../Middleware/verifyToken');

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register request
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error during user registration', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST request for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
        userName: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie with token
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict", // Prevent CSRF attacks
    });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check if user is logged in
router.get('/check-auth', verifyToken, async (req, res) => {
  try {
    res.json({ success: true, message: 'User is logged in', user: req.user });
  } catch (error) {
    console.error('Error checking auth status', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ success: true, message: "Logged out successfully" });
});

// module.exports = router;
// Explanation
// Environment Variables: Sensitive information like JWT_SECRET is stored in the .env file and accessed using process.env.JWT_SECRET.
// Secure Cookies: The secure flag for cookies is set based on the NODE_ENV environment variable. 
// Cookies are sent over HTTPS in production (NODE_ENV=production).
// SameSite Attribute: The sameSite attribute is set to "strict" to prevent CSRF attacks.
// This setup improves security by properly managing sensitive information and securing cookies.