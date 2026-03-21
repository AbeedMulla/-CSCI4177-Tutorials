const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

const router = express.Router();

// CREATE USER
router.post('/create', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
      return res.status(400).json({
        success: false,
        message: 'name, email, and age are required'
      });
    }

    const newUser = new User({
      name,
      email,
      age
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created',
      data: savedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating user'
    });
  }
});

// READ ALL USERS
router.get('/read', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

// READ USER BY ID
router.get('/read/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user'
    });
  }
});

// UPDATE USER
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating user'
    });
  }
});

// DELETE USER
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
});

module.exports = router;