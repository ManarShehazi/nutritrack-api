'use strict';
const db = require('../db/connection'); 

/** -1-
 * Delete a meal
 * mealId Integer
 * no response value expected for this operation
 **/
exports.deleteMeal = async (mealId) => {
    try {
        // Remove associated entries in the junction table
        await db.query('DELETE FROM foodlogs_meals WHERE mealId = ?', [mealId]);

        // Delete the meal itself
        await db.query('DELETE FROM meals WHERE mealId = ?', [mealId]);

        return { message: 'Meal deleted successfully' };
    } catch (error) {
        console.error('Error deleting meal:', error);
        throw error;
    }
};


/** -2-
 * Retrieve all meals
 * returns List
 **/
exports.getAllMeals = async () => {
  try {
      const [rows] = await db.query('SELECT * FROM meals');
      return rows;
  } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
  }
};

/** -3-
 * Get meal by ID
 * mealId Integer
 * returns Meal
 **/
exports.getMealById = async (mealId) => {
  try {
      const [rows] = await db.query('SELECT * FROM meals WHERE mealId = ?', [mealId]);
      return rows[0];
  } catch (error) {
      console.error('Error fetching meal by ID:', error);
      throw error;
  }
};

/** -4-
* Create a new meal
* body Meal
* returns Meal
**/
exports.createMeal = async (mealData) => {
    try {
        const { name, instructions, ingredients } = mealData;

        // Insert the meal into the meals table
        const [result] = await db.query(
            'INSERT INTO meals (name, instructions) VALUES (?, ?)',
            [name, instructions]
        );

        const mealId = result.insertId;

        // Insert the ingredients into the meal_ingredients table
        for (const ingredient of ingredients) {
            await db.query(
                `
                INSERT INTO meal_ingredients (mealId, ingredientId, quantity)
                VALUES (?, ?, ?)
                `,
                [mealId, ingredient.ingredientId, ingredient.quantity]
            );
        }

        return { mealId, name, instructions, ingredients };
    } catch (error) {
        console.error('Error creating meal:', error);
        throw error;
    }
};


/** -5-
* Update meal details
* body Meal
* mealId Integer
* no response value expected for this operation
**/
exports.updateMeal = async (mealId, mealData) => {
    const connection = await db.getConnection();
    try {
        const { name, instructions, ingredients } = mealData;

        // Start transaction
        await connection.beginTransaction();

        // Update the meal details (name and instructions)
        await connection.query(
            `
            UPDATE meals 
            SET name = ?, 
                instructions = ?
            WHERE mealId = ?
            `,
            [name, instructions, mealId]
        );

        // Delete existing ingredients for the meal
        await connection.query(
            `
            DELETE FROM meal_ingredients 
            WHERE mealId = ?
            `,
            [mealId]
        );

        // Insert updated ingredients into the junction table
        if (Array.isArray(ingredients)) {
            for (const ingredient of ingredients) {
                await connection.query(
                    `
                    INSERT INTO meal_ingredients (mealId, ingredientId, quantity) 
                    VALUES (?, ?, ?)
                    `,
                    [mealId, ingredient.ingredientId, ingredient.quantity]
                );
            }
        }

        // Commit transaction
        await connection.commit();
        return { mealId, name, instructions, ingredients };
    } catch (error) {
        // Rollback transaction on error
        await connection.rollback();
        console.error('Error updating meal:', error);
        throw error;
    } finally {
        // Release the connection
        connection.release();
    }
};