'use strict';

var utils = require('../utils/writer.js');
var FoodLog = require('../service/FoodLogService');
const db = require('../db/connection'); // Import the DB connection

// Create a new food log
module.exports.createFoodLog = async (req, res) => {
  try {
    const newFoodLog = await FoodLog.createFoodLog(req.body);
    res.status(201).json(newFoodLog);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error creating food log' });
  }
};

// Retrieve food logs by user ID
module.exports.foodlogsGetByUserId = async (req, res) => {
console.log('getFoodLogByUser');
  try {
    const userId = parseInt(req.openapi.pathParams.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    const foodLogs = await FoodLog.getFoodLogByUser(userId);
    res.status(200).json(foodLogs);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error fetching food logs' });
  }
};

// Delete a food log by log ID
module.exports.deleteFoodLog = async (req, res) => {
  try {
    const result = await FoodLog.deleteFoodLog(req.openapi.pathParams.foodlogId);
    res.status(204).json(result);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error deleting food log' });
  }
};

// Update a food log
module.exports.updateFoodLog = async (req, res) => {
  try {
    const logId = parseInt(req.openapi.pathParams.foodlogId, 10);
    if (isNaN(logId)) {
      return res.status(400).json({ error: 'Invalid logId' });
    }
    const updatedFoodLog = await FoodLog.updateFoodLog(logId, req.body);
    res.status(200).json(updatedFoodLog);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error updating food log' });
  }
};