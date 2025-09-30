'use strict';

var utils = require('../utils/writer.js');
var ShoppingList = require('../service/ShoppingListService');

module.exports.shoppinglistsDelete = async function shoppinglistsDelete (req, res, next, listId) {
    try {
      const result = await ShoppingList.shoppinglistsDelete(req.openapi.pathParams.listId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting ShoppingList' });
    }
};

module.exports.shoppinglistsGetByUserId = async function shoppinglistsGetByUserId (req, res, next, userId) {
    try {
      const shoppingLists = await ShoppingList.shoppinglistsGetByUserId(userId);
      res.status(200).json(shoppingLists);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error - Unable to retrieve ShoppingLists' });
    }
};

module.exports.shoppinglistsPost = async function shoppinglistsPost(req, res, nex, body, mealPlanId) {
  try {
      const newShoppingList = await ShoppingList.shoppinglistsPost(req.body, mealPlanId);
      res.status(201).json(newShoppingList);
  } catch (error) {
      console.error('Controller Error:', error.message); // Log detailed error
      res.status(500).json({ error: 'Error creating ShoppingList' });
  }
};

module.exports.shoppinglistsPut = async function shoppinglistsPut (req, res, next, body, listId) {
    try {
      const newShoppingLists = await ShoppingList.shoppinglistsPut(req.body, listId);
      res.status(201).json(newShoppingLists);
    } catch (error) {
      console.error('Controller Error:', error.message); // Log detailed error
      res.status(500).json({ error: 'Error updating ShoppingList' });
    }
};
