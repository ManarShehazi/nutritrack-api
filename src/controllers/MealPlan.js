'use strict';

var utils = require('../utils/writer.js');
var MealPlan = require('../service/MealPlanService');

module.exports.mealplansDelete = async function mealplansDelete (req, res, next, mealPlanId) {
  try {
    const result = await MealPlan.mealplansDelete(req.openapi.pathParams.mealPlanId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting meal plan' });
  }
};

module.exports.mealplansGetById = async function mealplansGetById (req, res, next, mealPlanId) {
  try {
    const mealPlans = await MealPlan.mealplansGetById(mealPlanId);
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error - Unable to retrieve meal plans' });
  }
};

module.exports.mealplansGetByUserId = async function mealplansGetByUserId (req, res, next, userId) {
    try {
      const mealPlans = await MealPlan.mealplansGetByUserId(userId);
      res.status(200).json(mealPlans);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error - Unable to retrieve meal plans' });
    }
};

module.exports.mealplansPost = async function mealplansPost (req, res, next, body) {
  try {
    const newMealPlan = await MealPlan.mealplansPost(req.body);
    res.status(201).json(newMealPlan);
  } catch (error) {
    console.error('Controller Error:', error.message); // Log detailed error
    res.status(500).json({ error: 'Error creating meal plan' });
  }
};

module.exports.mealplansPut = async function mealplansPut (req, res, next, body, mealPlanId) {
  try {
    const newMealPlan = await MealPlan.mealplansPut(req.body, mealPlanId);
    res.status(201).json(newMealPlan);
  } catch (error) {
    console.error('Controller Error:', error.message); // Log detailed error
    res.status(500).json({ error: 'Error updating meal plan' });
  }
};
