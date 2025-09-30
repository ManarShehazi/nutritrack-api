# NutriTrack API

NutriTrack is a RESTful API designed to manage user dietary needs — including meals, ingredients, food logging, and shopping list generation.

> Developed as part of the *Cloud Computing & DevOps* course  
> 📍 Université Grenoble Alpes – Master M2 MOSIG  
> 👩‍💻 Team Project: Haleema Khan, Manar Shehazi, Olesia Schukina

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [System Requirements](#system-requirements)
- [Project Setup](#project-setup)
- [Project Structure](#project-structure)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Meals](#meals)
  - [Ingredients](#ingredients)
  - [Food Logs](#food-logs)
  - [Shopping Lists](#shopping-lists)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)
- [Contact Information](#contact-information)

---

## Introduction

NutriTrack is a backend API that enables:

- Management of personal user profiles
- Logging of daily meals and ingredients
- Meal planning and grocery list generation
- Tracking of nutritional goals (BMI, calories, etc.)

Built with **Node.js**, **Express**, and **MySQL**, the API adheres to **OpenAPI 3.0** standards and includes unit testing, CI/CD automation, and code quality reports.

---

## System Requirements

- **Node.js** v16.0+
- **NPM** v7.0+
- **MySQL** v8.0+
- **Java JDK 21** (for SonarQube)
- **Docker** (optional, for containerization)

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://gricad-gitlab.univ-grenoble-alpes.fr/ngs/team_06/project.git
cd project/src
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the database

Import the SQL schema:
```bash
src/db.sql
```
Update your DB credentials in src/db/connection.js:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nutritrack
```

### 4. Start the application
```bash
npm start
```

To run in development mode with hot reload:
```bash
npm run dev
```

## Project Structure
src/
├── api/              # OpenAPI YAML specs
├── controllers/      # Route handlers
├── db/               # MySQL configuration
├── service/          # Business logic
├── tests/            # Unit & integration tests
├── utils/            # Helper functions
├── db.sql            # Database schema and seed data
├── index.js          # Main server entry point
└── package.json      # Project dependencies


## Database Configuration

NutriTrack uses a normalized MySQL schema with the following core tables:

- **Users**
userId, name, bmi, dietaryRestrictions, caloricGoal

- **Meals**

mealId, name, instructions

- **Ingredients**

ingredientId, name, unit

- **FoodLogs**

foodLogId, userId, date, mealsLogged

- **Meal_Ingredients**

mealId, ingredientId, quantity

 SQL schema and example seed data are located in:
 ```bash
src/db.sql
```

## API Endpoints

All endpoints follow standard REST conventions and return JSON.

 **Users**
| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/users`         | Create a new user |
| GET    | `/users`         | Get all users     |
| GET    | `/users/:userId` | Get user by ID    |
| PUT    | `/users/:userId` | Update a user     |
| DELETE | `/users/:userId` | Delete a user     |

**Meals**
| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | `/meals`         | Add a new meal   |
| GET    | `/meals`         | Get all meals    |
| GET    | `/meals/:mealId` | Get a meal by ID |
| PUT    | `/meals/:mealId` | Update a meal    |
| DELETE | `/meals/:mealId` | Delete a meal    |

**Ingredients**
| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/ingredients`     | Add a new ingredient |
| GET    | `/ingredients`     | Get all ingredients  |
| GET    | `/ingredients/:id` | Get ingredient by ID |
| PUT    | `/ingredients/:id` | Update ingredient    |
| DELETE | `/ingredients/:id` | Delete ingredient    |

**Food Logs**
| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| POST   | `/foodlogs`              | Create a new food log   |
| GET    | `/foodlogs/user/:userId` | Get all logs for a user |
| PUT    | `/foodlogs/:logId`       | Update a food log       |
| DELETE | `/foodlogs/:logId`       | Delete a food log       |

**Shopping Lists**
| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/shoppinglists/:mealPlanId`  | Generate a shopping list |
| GET    | `/shoppinglists/user/:userId` | Get all lists for a user |
| PUT    | `/shoppinglists/:listId`      | Update a shopping list   |
| DELETE | `/shoppinglists/:listId`      | Delete a shopping list   |

### Example Request

Create a new user

POST /users
```json
{
  "name": "John Doe",
  "bmi": 22.5,
  "dietaryRestrictions": ["VEGAN"],
  "caloricGoal": 2000
}

```
## Running the Application
Start with hot-reload (development)
```bash
npm run dev
```

Start in production mode
```bash
npm start
```

View Swagger (OpenAPI) docs

Once running, visit:
```bash
http://localhost:8080/docs
```

### Testing

Run unit and integration tests:
```bash
npm test
```
Generate coverage report:
```bash
npm run coverage
```
View the coverage report:
```bash
open coverage/index.html
```

## CI/CD Pipeline

This project includes a GitLab CI pipeline with the following stages:

- **Build**: Install dependencies

- **DB Setup**: Initialize MySQL schema

- **Test**: Run tests using Mocha

- **Coverage**: Generate code coverage reports via c8

## Contact Information

Authors:

**Haleema Khan**

**Manar Shehazi**

**Olesia Schukina**

