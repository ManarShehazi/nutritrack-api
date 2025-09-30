'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
const db = require('../db/connection'); // Import the DB connection


module.exports.usersDelete = async (req, res) => {
  try {
    const result = await User.usersDelete(req.openapi.pathParams.userId);
    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports.usersGet = async (req, res) => {
  try {
    const users = await User.usersGet();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

module.exports.usersGetById = async (req, res) => {
  try {
    const userId = parseInt(req.openapi.pathParams.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    const user = await User.usersGetById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Controller Error:', error.message); // Log detailed error
    res.status(500).json({ error: 'Error creating user' });
  }
};

module.exports.usersPut = async (req, res) => {
  try {
    const updatedUser = await User.usersPut(req.openapi.pathParams.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};
