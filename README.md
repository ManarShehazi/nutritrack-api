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

-** Users**
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

