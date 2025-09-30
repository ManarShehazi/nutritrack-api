-- Create database if not exists
CREATE DATABASE IF NOT EXISTS nutritrack;

-- Use the database
USE nutritrack;

-- TABLES CREATIONS 
-- Create users table
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing user ID
    name VARCHAR(100) NOT NULL,           -- User's name
    caloricGoal INT DEFAULT NULL,         -- Caloric goal (nullable)
    bmi DECIMAL(5, 2) DEFAULT NULL,       -- BMI (nullable)
    dietaryRestrictions JSON DEFAULT NULL, -- JSON for dietary restrictions
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record update timestamp
);

-- Create foodlogs table
CREATE TABLE foodlogs (
    logId INT AUTO_INCREMENT PRIMARY KEY,        -- Auto-incrementing log ID
    userId INT NOT NULL,                         -- Foreign key to users table
    date DATE NOT NULL,                          -- Date of the food log
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record update timestamp
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE -- Foreign key constraint
);

-- Create meals table
CREATE TABLE meals (
    mealId INT AUTO_INCREMENT PRIMARY KEY,        -- Auto-incrementing meal ID
    name VARCHAR(255) NOT NULL,                   -- Meal name
    instructions TEXT DEFAULT NULL,               -- Preparation instructions
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record update timestamp
);

-- Create the ingredients table
CREATE TABLE ingredients (
    ingredientId INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incrementing ingredient ID
    name VARCHAR(100) NOT NULL,                   -- Ingredient name
    unit VARCHAR(50) DEFAULT NULL,                -- Unit of measurement
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record update timestamp
);
-- Create meal plans table
CREATE TABLE meal_plans (
    mealPlanId INT AUTO_INCREMENT PRIMARY KEY,    -- Auto-incrementing meal plan ID
    date DATE NOT NULL                            -- Meal plan date
);

-- Create shopping lists table
CREATE TABLE shopping_lists (
    listId INT AUTO_INCREMENT PRIMARY KEY,        -- Auto-incrementing shopping list ID
    type TEXT NOT NULL                            -- Type of shopping list
);


-- JUNCTION TABLES 
-- Junction table for foodlogs and meals
CREATE TABLE foodlogs_meals (
    logId INT NOT NULL,                          -- Foreign key to foodlogs table
    mealId INT NOT NULL,                         -- Foreign key to meals table
    PRIMARY KEY (logId, mealId),                 -- Composite primary key
    FOREIGN KEY (logId) REFERENCES foodlogs(logId) ON DELETE CASCADE, -- Cascade delete
    FOREIGN KEY (mealId) REFERENCES meals(mealId) ON DELETE CASCADE -- Foreign key constraint
);

-- Create the junction table for meals and ingredients
CREATE TABLE meal_ingredients (
    mealId INT NOT NULL,                          -- Foreign key to meals table
    ingredientId INT NOT NULL,                    -- Foreign key to ingredients table
    quantity DECIMAL(10, 2) DEFAULT NULL,         -- Quantity of the ingredient
    PRIMARY KEY (mealId, ingredientId),           -- Composite primary key
    FOREIGN KEY (mealId) REFERENCES meals(mealId) ON DELETE CASCADE, -- Foreign key constraint
    FOREIGN KEY (ingredientId) REFERENCES ingredients(ingredientId) ON DELETE CASCADE -- Foreign key constraint
);

-- Junction table for meal plans and meals
CREATE TABLE meal_plan_meal (
    mealPlanId INT NOT NULL,
    mealId INT NOT NULL,
    FOREIGN KEY (mealPlanId) REFERENCES meal_plans(mealPlanId) ON DELETE CASCADE,
    FOREIGN KEY (mealId) REFERENCES meals(mealId) ON DELETE CASCADE,
    PRIMARY KEY (mealPlanId, mealId)
);

-- Create meal_plan_shopping_lists junction table
CREATE TABLE meal_plan_shopping_lists (
    mealPlanId INT NOT NULL,
    listId INT NOT NULL,
    PRIMARY KEY (mealPlanId, listId),
    FOREIGN KEY (mealPlanId) REFERENCES meal_plans(mealPlanId) ON DELETE CASCADE,
    FOREIGN KEY (listId) REFERENCES shopping_lists(listId) ON DELETE CASCADE
);

-- Create user and meal_plans junction table
CREATE TABLE user_meal_plans (
    userId INT NOT NULL,
    mealPlanId INT NOT NULL,
    PRIMARY KEY (userId, mealPlanId),
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (mealPlanId) REFERENCES meal_plans(mealPlanId) ON DELETE CASCADE
);

-- Junction table for shopping list and ingredients
-- shopping_list_item
CREATE TABLE shopping_list_ingredients (
    listId INT NOT NULL,
    ingredientId INT NOT NULL,
    FOREIGN KEY (listId) REFERENCES shopping_lists(listId) ON DELETE CASCADE,
    FOREIGN KEY (ingredientId) REFERENCES ingredients(ingredientId) ON DELETE CASCADE,
    PRIMARY KEY (listId, ingredientId)
);

-- TABLES INSERTIONS 
-- Insert sample data into users table
-- Adding users with valid dietary restrictions
INSERT INTO users (name, caloricGoal, bmi, dietaryRestrictions)
VALUES
    ('Alice Johnson', 1800, 21.8, JSON_ARRAY('VEGAN')),              -- Alice follows a vegan diet
    ('Bob Smith', 2000, 25.3, JSON_ARRAY('NO_GLUTEN', 'VEGETARIAN')), -- Bob avoids gluten and is vegetarian
    ('Charlie Brown', 1500, 22.1, NULL);                             -- Charlie has no specific dietary restrictions

-- Insert sample data into foodlogs table
-- Logging food intake for users
INSERT INTO foodlogs (userId, date)
VALUES
    (1, '2024-11-14'), -- Food log for Alice on November 14, 2024
    (2, '2024-11-15'); -- Food log for Bob on November 15, 2024

-- Insert sample data into meals table
-- Adding some meals
INSERT INTO meals (name, instructions)
VALUES
    ('Vegan Salad', 'Mix all ingredients and serve chilled.'),       -- A simple vegan salad
    ('Gluten-Free Pasta', 'Boil pasta and add sauce.'),              -- Gluten-free pasta meal
    ('Vegetarian Pizza', 'Bake dough with toppings in oven.');       -- Vegetarian pizza

-- Insert sample data into ingredients table
-- Adding ingredients
INSERT INTO ingredients (name, unit)
VALUES
    ('Tomato', 'kg'),     -- Tomato measured in kilograms
    ('Chicken', 'kg'),    -- Chicken measured in kilograms
    ('Olive Oil', 'ml'),  -- Olive oil measured in milliliters
    ('Salt', 'g');        -- Salt measured in grams

-- Insert sample data into meal_plans table
-- Creating meal plans for users
INSERT INTO meal_plans (mealPlanId, date)
VALUES
    (1, '2024-11-16'), -- Meal plan for November 16, 2024
    (2, '2024-11-17'), -- Meal plan for November 17, 2024
    (3, '2024-11-18'); -- Meal plan for November 18, 2024

-- Insert sample data into shopping_lists table
-- Creating shopping lists for meal plans
INSERT INTO shopping_lists (listId, type)
VALUES
    (1, 'Weekly Groceries'),           -- A weekly groceries shopping list
    (2, 'Birthday Party Supplies'),    -- Supplies for a birthday party
    (3, 'Holiday Prep');               -- Items for holiday preparation

-- Insert sample data into shopping_list_ingredients table
-- Associating shopping lists with ingredients
INSERT INTO shopping_list_ingredients (listId, ingredientId)
VALUES
    (1, 1), -- Weekly Groceries include Tomato
    (1, 3), -- Weekly Groceries include Olive Oil
    (2, 4), -- Party Supplies include Salt
    (3, 2), -- Holiday Prep includes Chicken
    (3, 3); -- Holiday Prep includes Olive Oil

-- Insert sample data into foodlogs_meals table
-- Associating food logs with meals
INSERT INTO foodlogs_meals (logId, mealId)
VALUES
    (1, 1), -- Alice's food log includes Vegan Salad
    (1, 2), -- Alice's food log includes Gluten-Free Pasta
    (2, 3); -- Bob's food log includes Vegetarian Pizza

-- Insert sample data into meal_ingredients table
-- Associating meals with their ingredients
INSERT INTO meal_ingredients (mealId, ingredientId, quantity)
VALUES
    (1, 1, 0.5), -- Vegan Salad with 0.5 kg Tomato
    (1, 3, 10),  -- Vegan Salad with 10 ml Olive Oil
    (2, 4, 200), -- Gluten-Free Pasta with 200 g Salt
    (3, 1, 1),   -- Vegetarian Pizza with 1 kg Tomato
    (3, 4, 5);   -- Vegetarian Pizza with 5 g Salt

-- Insert sample data into meal_plan_meal table
-- Associating meal plans with meals
INSERT INTO meal_plan_meal (mealPlanId, mealId)
VALUES
    (1, 1), -- Meal plan 1 includes Vegan Salad
    (1, 2), -- Meal plan 1 includes Gluten-Free Pasta
    (2, 3), -- Meal plan 2 includes Vegetarian Pizza
    (3, 1), -- Meal plan 3 includes Vegan Salad
    (3, 3); -- Meal plan 3 includes Vegetarian Pizza

-- Insert sample data into meal_plan_shopping_lists table
-- Associating meal plans with shopping lists
INSERT INTO meal_plan_shopping_lists (mealPlanId, listId)
VALUES
    (1, 1), -- Meal plan 1 associated with shopping list 1
    (2, 2), -- Meal plan 2 associated with shopping list 2
    (3, 3); -- Meal plan 3 associated with shopping list 3

-- Insert sample data into user_meal_plans table
-- Associating users with meal plans
INSERT INTO user_meal_plans (userId, mealPlanId)
VALUES
    (1, 1), -- Alice assigned to meal plan 1
    (2, 2), -- Bob assigned to meal plan 2
    (3, 3); -- Charlie assigned to meal plan 3


-- VERIFICATION 
-- Verify the data
SELECT * FROM users;
SELECT * FROM foodlogs;
SELECT * FROM ingredients;
SELECT * FROM meal_plans;
SELECT * FROM shopping_lists;