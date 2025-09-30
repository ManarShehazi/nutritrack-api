'use strict';
const db = require('../db/connection'); // Database connection


/**
 * Delete a user profile
 *
 * userId Integer 
 * no response value expected for this operation
 **/
exports.usersDelete = async (userId) => {
    try {
        await db.query('DELETE FROM users WHERE userId = ?', [userId]);
        return { message: 'User deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
/**
 * Retrieve all users
 *
 * returns List
 **/
exports.usersGet = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM users'); // Fetch all users
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

/**
 * Get user profile by ID
 *
 * userId Integer 
 * returns User
 **/
exports.usersGetById = async (userId) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

/**
 * Create a user profile
 *
 * body User 
 * no response value expected for this operation
 **/
exports.createUser = async (userData) => {
    try {
        const { name, bmi, dietaryRestrictions, caloricGoal } = userData;

        // Validate dietaryRestrictions values
        if (dietaryRestrictions && !validateDietaryRestrictions(dietaryRestrictions)) {
            throw new Error('Invalid dietary restrictions');
        }

        const result = await db.query(
            'INSERT INTO users (name, bmi, dietaryRestrictions, caloricGoal) VALUES (?, ?, ?, ?)',
            [name, bmi, JSON.stringify(dietaryRestrictions), caloricGoal]
        );
        return { userId: result[0].insertId, name, bmi, dietaryRestrictions, caloricGoal };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

/**
 * Update user profile
 *
 * body User 
 * userId Integer 
 * no response value expected for this operation
 **/
exports.usersPut = async (userId, userData) => {
    try {
        const { name, bmi, dietaryRestrictions, caloricGoal } = userData;

        // Validate dietaryRestrictions values
        if (dietaryRestrictions && !validateDietaryRestrictions(dietaryRestrictions)) {
            throw new Error('Invalid dietary restrictions');
        }

        const query = `
          UPDATE users 
          SET name = ?, 
              bmi = ?, 
              dietaryRestrictions = ?, 
              caloricGoal = ? 
          WHERE userId = ?
        `;

        const values = [
            name,
            bmi,
            JSON.stringify(dietaryRestrictions),
            caloricGoal,
            userId
        ];

        await db.query(query, values);
        return { message: 'User updated successfully' };
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};


/**
 * Validate dietary restrictions
 */
function validateDietaryRestrictions(dietaryRestrictions) {
    const validRestrictions = ['NO_GLUTEN', 'NO_LACTOSE', 'VEGETARIAN', 'VEGAN', 'INTERMITTENT_FASTING'];
    return dietaryRestrictions.every((restriction) => validRestrictions.includes(restriction));
}
