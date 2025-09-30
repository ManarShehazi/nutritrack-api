'use strict';
const db = require('../db/connection'); // Database connection

/** -1-
 * Create a new food log
 * Adds a new entry to the foodlogs table and associates meals with it
 */
exports.createFoodLog = async (foodLogData) => {
  try {
    const { userId, date, mealsLogged } = foodLogData;

    // Insert the food log
    const [result] = await db.query('INSERT INTO foodlogs (userId, date) VALUES (?, ?)', [
      userId,
      date,
    ]);

    const logId = result.insertId;

    // Validate and process mealsLogged
    if (Array.isArray(mealsLogged) && mealsLogged.length > 0) {
      const mealLogEntries = mealsLogged.map((meal) => [logId, meal.mealId]);
      await db.query('INSERT INTO foodlogs_meals (logId, mealId) VALUES ?', [mealLogEntries]);
    }

    return { logId, userId, date, mealsLogged };
  } catch (error) {
    console.error('Error creating food log:', error.message);
    throw error;
  }
};

/** -2-
 * Retrieve food logs by user ID
 * Fetches all food logs for a specific user, including associated meals.
 */
exports.getFoodLogByUser = async (userId) => {
try {
   const [foodLogs] = await db.query(
      `SELECT fl.logId, fl.date, m.mealId, m.name, m.instructions
       FROM foodlogs fl
       LEFT JOIN foodlogs_meals flm ON fl.logId = flm.logId
       LEFT JOIN meals m ON flm.mealId = m.mealId
       WHERE fl.userId = ?`,
      [userId]
    );
    return foodLogs;

  } catch (error) { 
    console.error('Error fetching food logs:', error.message);
    throw error;  
  }  
};


/** -3-
 * Delete a food log by ID
 * Removes a food log and its associated meal relationships.
 */
exports.deleteFoodLog = async (logId) => {
  try {
    await db.query('DELETE FROM foodlogs WHERE logId = ?', [logId]);
     return { message: 'FoodLog deleted successfully' };
  } catch (error) {
    console.error('Error deleting food log:', error.message);
    throw error;  
  }
};


/** -4-
 * Update a food log by ID
 * Updates food log details and associated meals.
 */
exports.updateFoodLog = async (logId, foodLogData) => {
  try {
    const { userId, date, mealsLogged } = foodLogData;

    // Update the food log
    await db.query('UPDATE foodlogs SET userId = ?, date = ? WHERE logId = ?', [userId, date, logId]);

    // Clear existing meals for the food log
    await db.query('DELETE FROM foodlogs_meals WHERE logId = ?', [logId]);

    // Reinsert meals for the food log
    if (Array.isArray(mealsLogged) && mealsLogged.length > 0) {
      const mealLogEntries = mealsLogged.map((meal) => [logId, meal.mealId]); // Extract mealId
      await db.query('INSERT INTO foodlogs_meals (logId, mealId) VALUES ?', [mealLogEntries]);
    }

    const updatedLog = await exports.getFoodLogByUser(userId);
    return updatedLog.find((log) => log.logId === logId);
  } catch (error) {
    console.error('Error updating food log:', error.message);
    throw error;
  }
};
