'use strict';

var utils = require('../utils/writer.js');
var Meal = require('../service/MealService');
const db = require('../db/connection'); 

'use strict';

const MealService = require('../service/MealService');

// Get all meals
module.exports.getAllMeals = async (req, res) => {
  try {
    const meals = await MealService.getAllMeals();
    res.status(200).json(meals);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error fetching meals' });
  }
};

// Get a meal by ID
 module.exports.getMealById = async (req, res) => {
  try {
    const mealId = parseInt(req.openapi.pathParams.mealId, 10);
    if (isNaN(mealId)) {
      return res.status(400).json({ error: 'Invalid mealId' });
    }
    const meal = await MealService.getMealById(mealId);
    if (meal) {
      res.status(200).json(meal);
    } else {
      res.status(404).json({ error: 'Meal not found' });
    }
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error fetching meal' });
  }
};

// Create a new meal
module.exports.createMeal = async (req, res) => {
  try {
    const newMeal = await MealService.createMeal(req.body);
    res.status(201).json(newMeal);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error creating meal' });
  }
};

// Update a meal
module.exports.updateMeal = async (req, res) => {
  try {
    const mealId = parseInt(req.openapi.pathParams.mealId, 10);
    if (isNaN(mealId)) {
      return res.status(400).json({ error: 'Invalid mealId' });
    }
    const updatedMeal = await MealService.updateMeal(mealId, req.body);
    res.status(200).json(updatedMeal);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error updating meal' });
  }
};

//Delete a meal
module.exports.deleteMeal = async (req, res) => {
  try {
    const mealId = parseInt(req.openapi.pathParams.mealId, 10);
    if (isNaN(mealId)) {
      return res.status(400).json({ error: 'Invalid mealId' });
    }
    const result = await MealService.deleteMeal(mealId);
    res.status(204).json(result);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Error deleting meal' });
  }
};
