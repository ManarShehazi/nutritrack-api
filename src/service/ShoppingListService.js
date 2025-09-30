'use strict';
const db = require('../db/connection'); // Database connection

/**
 * Delete a shopping list
 *
 * listId Integer 
 * no response value expected for this operation
 **/
exports.shoppinglistsDelete = async function(listId) {
  try {
    // Correct the table name
    await db.query('DELETE FROM shopping_list_ingredients WHERE listId = ?', [listId]);
    await db.query('DELETE FROM shopping_lists WHERE listId = ?', [listId]);
    return { message: 'Shopping list deleted successfully' };
  } catch (error) {
    console.error('Error deleting shopping list:', error);
    throw error;
  }
};


/**
 * Get a the ShoppingLists of a user
 *
 * userId Integer 
 * returns ShoppingList
 **/
exports.shoppinglistsGetByUserId = async function(userId) {
  try {
      const [rows] = await db.query(
          `SELECT sl.listId, sl.type, mp.mealPlanId, mp.date
           FROM shopping_lists sl
           JOIN meal_plan_shopping_lists mpsl ON sl.listId = mpsl.listId
           JOIN meal_plans mp ON mpsl.mealPlanId = mp.mealPlanId
           JOIN user_meal_plans ump ON mp.mealPlanId = ump.mealPlanId
           WHERE ump.userId = ?`,
          [userId]
      );
      return rows;
  } catch (error) {
      console.error('Error fetching shopping lists:', error);
      throw error;
  }
};


/**
 * Generate a shopping list based on a meal plan
 *
 * mealPlanId Integer 
 * no response value expected for this operation
 **/
exports.shoppinglistsPost = async function(body, mealPlanId) {
  try {
      const { type } = body;

      const [result] = await db.query(
          'INSERT INTO shopping_lists (type) VALUES (?)',
          [type]
      );

      const listId = result.insertId;

      // Associate the shopping list with the meal plan
      await db.query(
          'INSERT INTO meal_plan_shopping_lists (mealPlanId, listId) VALUES (?, ?)',
          [mealPlanId, listId]
      );

      return { listId, type, mealPlanId };
  } catch (error) {
      console.error('Error creating shopping list:', error);
      throw error;
  }
};

/**
 * Update a shopping list
 *
 * body ShoppingList 
 * slistId Integer 
 * no response value expected for this operation
 **/
exports.shoppinglistsPut = async function(body, listId) {
  try {
    const query = `
      UPDATE shopping_lists 
      SET type = ?
      WHERE listId = ?
    `;
    
    const values = [
      body.type,
      listId
    ];

    await db.query(query, values);
    return { listId, type: body.type };
  } catch (error) {
    throw new Error(`Error updating shoppinglist: ${error.message}`);
  }
}

