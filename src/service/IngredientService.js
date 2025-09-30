'use strict';
const db = require('../db/connection'); // Database connection

/** -1-
 * Delete an ingredient by ID
 * removes an ingredient based on its ID
 * returns a success message upon deletion
 * throws an error if the deletion fails
 */
exports.deleteIngredient = async (ingredientId) => {
    try {
        // Delete references to the ingredient in the meal_ingredients table
        await db.query('DELETE FROM meal_ingredients WHERE ingredientId = ?', [ingredientId]);
        
        // Now delete the ingredient itself
        await db.query('DELETE FROM ingredients WHERE ingredientId = ?', [ingredientId]);

        return { message: 'Ingredient deleted successfully' };
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        throw error;
    }
};

/** -2-
 * Retrieve all ingredients
 * fetches all the ingredients
 */
exports.getAllIngredients = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM ingredients');
        return rows;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        throw error;
    }
};

/** -3-
 * Retrieve an ingredient by ID
 * fetches a specific ingredient using its ID
 */
exports.getIngredientById = async (ingredientId) => {
    try {
        const [rows] = await db.query('SELECT * FROM ingredients WHERE ingredientId = ?', [ingredientId]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching ingredient by ID:', error);
        throw error;
    }
};

/** -4-
 * Create a new ingredient
 * adds a new ingredient
 */
exports.createIngredient = async (ingredientData) => {
    try {
        const { name, unit } = ingredientData;
        const result = await db.query(
            'INSERT INTO ingredients (name, unit) VALUES (?, ?)',
            [name, unit]
        );
        return { ingredientId: result[0].insertId, name, unit };
    } catch (error) {
        console.error('Error creating ingredient:', error);
        throw error;
    }
};

/** -5-
 * Update an ingredient by ID
 * updates an ingredient's details
 */
exports.updateIngredient = async (ingredientId, ingredientData) => {
    try {
        const { name, unit } = ingredientData;
        await db.query(
            `
            UPDATE ingredients 
            SET name = ?, 
                unit = ? 
            WHERE ingredientId = ?
            `,
            [name, unit, ingredientId]
        );
        return { ingredientId, name, unit };
    } catch (error) {
        console.error('Error updating ingredient:', error);
        throw error;
    }
};
