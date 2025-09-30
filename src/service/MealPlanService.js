'use strict';
const db = require('../db/connection'); // Database connection

/**
 * Delete a meal plan
 *
 * mealPlanId Integer
 * no response value expected for this operation
 **/
exports.mealplansDelete = async function (mealPlanId) {
  try {
    await db.query('DELETE FROM meal_plan_meal WHERE mealPlanId = ?', [mealPlanId]);
    await db.query('DELETE FROM meal_plan_shopping_lists WHERE mealPlanId = ?', [mealPlanId]);
    await db.query('DELETE FROM user_meal_plans WHERE mealPlanId = ?', [mealPlanId]);
    await db.query('DELETE FROM meal_plans WHERE mealPlanId = ?', [mealPlanId]);
    return { message: 'Meal plan deleted successfully' };
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    throw error;
  }
};

/**
 * Get meal plan by ID
 *
 * mealPlanId Integer
 * returns MealPlan
 **/
exports.mealplansGetById = async function (mealPlanId) {
  try {
    // Fetch the meal plan
    const [mealPlan] = await db.query('SELECT * FROM meal_plans WHERE mealPlanId = ?', [mealPlanId]);

    if (!mealPlan.length) throw new Error('Meal plan not found');

    // Fetch associated meals
    const [meals] = await db.query(
      `SELECT m.mealId, m.name, m.instructions
       FROM meal_plan_meal mp
       JOIN meals m ON mp.mealId = m.mealId
       WHERE mp.mealPlanId = ?`,
      [mealPlanId]
    );

    return { ...mealPlan[0], meals };
  } catch (error) {
    console.error('Error fetching meal plan by ID:', error);
    throw error;
  }
};

/**
 * Get meal plans by user ID
 *
 * userId Integer
 * returns MealPlans
 **/
exports.mealplansGetByUserId = async function (userId) {
  try {
    // Fetch meal plans for the user
    const [mealPlans] = await db.query(
      `SELECT mp.mealPlanId, mp.date
       FROM user_meal_plans ump
       JOIN meal_plans mp ON ump.mealPlanId = mp.mealPlanId
       WHERE ump.userId = ?`,
      [userId]
    );

    // Fetch associated meals for each meal plan
    for (const plan of mealPlans) {
      const [meals] = await db.query(
        `SELECT m.mealId, m.name, m.instructions
         FROM meal_plan_meal mp
         JOIN meals m ON mp.mealId = m.mealId
         WHERE mp.mealPlanId = ?`,
        [plan.mealPlanId]
      );
      plan.meals = meals;
    }

    return mealPlans;
  } catch (error) {
    console.error('Error fetching meal plans by user ID:', error);
    throw error;
  }
};

/**
 * Generate a meal plan for user ID
 *
 * body MealPlan
 * no response value expected for this operation
 **/
exports.mealplansPost = async function (body) {
  try {
    const { date, userId, meals } = body;

    // Insert the meal plan
    const [result] = await db.query('INSERT INTO meal_plans (date) VALUES (?)', [date]);
    const mealPlanId = result.insertId;

    // Link the meal plan to the user
    await db.query('INSERT INTO user_meal_plans (userId, mealPlanId) VALUES (?, ?)', [userId, mealPlanId]);

    // Associate meals with the meal plan
    if (meals && meals.length) {
      const mealEntries = meals.map((mealId) => [mealPlanId, mealId]);
      await db.query('INSERT INTO meal_plan_meal (mealPlanId, mealId) VALUES ?', [mealEntries]);
    }

    return { mealPlanId, date, userId, meals };
  } catch (error) {
    console.error('Error creating meal plan:', error);
    throw error;
  }
};

/**
 * Customize or regenerate a meal plan
 *
 * body MealPlan
 * mealPlanId Integer
 * no response value expected for this operation
 **/
exports.mealplansPut = async function (body, mealPlanId) {
  try {
    const { date, userId, meals } = body;

    // Update the meal plan date
    await db.query('UPDATE meal_plans SET date = ? WHERE mealPlanId = ?', [date, mealPlanId]);

    // Update user association
    await db.query('UPDATE user_meal_plans SET userId = ? WHERE mealPlanId = ?', [userId, mealPlanId]);

    // Clear existing meals and add new ones
    await db.query('DELETE FROM meal_plan_meal WHERE mealPlanId = ?', [mealPlanId]);
    if (meals && meals.length) {
      const mealEntries = meals.map((mealId) => [mealPlanId, mealId]);
      await db.query('INSERT INTO meal_plan_meal (mealPlanId, mealId) VALUES ?', [mealEntries]);
    }

    return { mealPlanId, date, userId, meals };
  } catch (error) {
    console.error('Error updating meal plan:', error);
    throw error;
  }
};
