// controllers/authController.js
const User = require('../models/userModel'); // Update this line to match your file name
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, retypePassword, role} = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if passwords match
    if (password !== retypePassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Create a new user
    const userFields = { name, email, password };

    // Only allow role assignment if the requester is an admin
    if (req.user && req.user.role === 'admin') {
      userFields.role = role || 'customer';
    } else {
      userFields.role = 'customer';
    }

    // Create a new user
    user = new User(userFields);
    await user.save();

    // Create and return a token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and return a token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
