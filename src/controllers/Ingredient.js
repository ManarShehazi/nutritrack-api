'use strict';

var utils = require('../utils/writer.js');
var Ingredient = require('../service/IngredientService');
const db = require('../db/connection'); // Import the DB connection


/** -1-
 * Create a new ingredient
 * creation of a new ingredient in the database
 * expects request body 
 */
module.exports.createIngredient = async (req, res) => {
  try {
      const newIngredient = await Ingredient.createIngredient(req.body);
      res.status(201).json(newIngredient);
  } catch (error) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: 'Error creating ingredient' });
  }
};

/** -2-
 * Retrieve all ingredients
 * returns a list of all ingredients 
 */
module.exports.getAllIngredients = async (req, res) => {
  try {
      const ingredients = await Ingredient.getAllIngredients();
      res.status(200).json(ingredients);
  } catch (error) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: 'Error fetching ingredients' });
  }
};

/** -3-
 * Retrieve an ingredient by ID
 * fetches a single ingredient using its ID
 */
module.exports.getIngredientById = async (req, res) => {
  try {
      const ingredientId = parseInt(req.openapi.pathParams.ingredientId, 10);
      if (isNaN(ingredientId)) {
          return res.status(400).json({ error: 'Invalid ingredientId' });
      }
      const ingredient = await Ingredient.getIngredientById(ingredientId);
      if (ingredient) {
          res.status(200).json(ingredient);
      } else {
          res.status(404).json({ error: 'Ingredient not found' });
      }
  } catch (error) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: 'Error fetching ingredient' });
  }
};

/** -4-
 * Update an ingredient by ID
 * updates an ingredient's details
 */
module.exports.updateIngredient = async (req, res) => {
  try {
      const ingredientId = parseInt(req.openapi.pathParams.ingredientId, 10);
      if (isNaN(ingredientId)) {
          return res.status(400).json({ error: 'Invalid ingredientId' });
      }
      const updatedIngredient = await Ingredient.updateIngredient(ingredientId, req.body);
      res.status(200).json(updatedIngredient);
  } catch (error) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: 'Error updating ingredient' });
  }
};


/**
 * Delete an ingredient by ID
 * deletes an ingredient using its ID
 */
module.exports.deleteIngredient = async (req, res) => {
  try {
      const ingredientId = parseInt(req.openapi.pathParams.ingredientId, 10);
      if (isNaN(ingredientId)) {
          return res.status(400).json({ error: 'Invalid ingredientId' });
      }
      await Ingredient.deleteIngredient(ingredientId);
      res.status(204).send();
  } catch (error) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: 'Error deleting ingredient' });
  }
};
