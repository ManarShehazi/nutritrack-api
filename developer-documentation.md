# NutriTrack API - Developer Documentation

## Table of Contents

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
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Coverage Badge Generation](#coverage-badge-generation)
- [Troubleshooting](#troubleshooting)
- [Contact Information](#contact-information)

---

## Introduction

NutriTrack is a **RESTful API** designed to manage user dietary needs. It allows users to:

- Manage personal profiles.
- Log daily meals and ingredients.
- Generate meal plans.
- Create shopping lists.
- Track nutritional goals.

The backend is built with **Node.js**, using **Express** and adheres to the OpenAPI 3.0 standard. Database operations are managed using **MySQL**, and the application supports detailed testing using **Mocha**, **Chai**, and **Chai HTTP**.

---

## System Requirements

To run NutriTrack API, you need:

- **Node.js**: v16.0 or later.
- **NPM**: v7.0 or later.
- **MySQL**: v8.0 or later.
- **Java**: JDK 21 (for SonarQube analysis).
- **Docker** (optional for containerized setups).

---

## Project Setup

Follow these steps to set up the project locally:

### Clone the Repository

```bash
git clone https://gricad-gitlab.univ-grenoble-alpes.fr/ngs/team_06/project.git
cd project/src
```

### **Install Dependencies**

```bash
npm install
```

### **Set Up the Database**

Import the SQL script located at **src/db.sql** to initialize the database.

### **Run the Application**

```bash
npm start
```

---

## Project Structure

Below is the project directory structure:
src/
├── api/                   # OpenAPI specs
├── controllers/           # Route controllers
├── db/                    # Database configurations
├── service/               # Business logic
├── tests/                 # Unit and integration tests
├── utils/                 # Utility functions
├── db.sql                 # SQL schema and scripts
├── index.js               # Entry point
├── package.json           # Dependencies
└── README.md              # Documentation

---

## Database Configuration

The database schema includes the following tables:

### 1. **Users Table**

- **Fields**:
  - `userId` (Primary Key)
  - `name`
  - `bmi`
  - `dietaryRestrictions`
  - `caloricGoal`

### 2. **Meals Table**

- **Fields**:
  - `mealId` (Primary Key)
  - `name`
  - `instructions`

### 3. **Ingredients Table**

- **Fields**:
  - `ingredientId` (Primary Key)
  - `name`
  - `unit`

### 4. **FoodLogs Table**

- **Fields**:
  - `foodLogId` (Primary Key)
  - `userId` (Foreign Key)
  - `date`
  - `mealsLogged`

### 5. **Meal_Ingredients Table**

- **Fields**:
  - `mealId` (Foreign Key)
  - `ingredientId` (Foreign Key)
  - `quantity`

**SQL Schema File**:

- Located at `src/db.sql`
- Contains full schema and seed data to initialize the database.

To set up the database:

1. Import the SQL schema file into your MySQL instance.
2. Update the `src/db/connection.js` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=nutritrack
   ```

---

## RESTful API Endpoints

The API provides the following RESTful endpoints:

---

### **Users**

| **Method** | **Endpoint**  | **Description**              |
| ---------------- | ------------------- | ---------------------------------- |
| `POST`         | `/users`          | Create a new user.                 |
| `GET`          | `/users`          | Retrieve all users.                |
| `GET`          | `/users/{userId}` | Retrieve a user profile by ID.     |
| `PUT`          | `/users/{userId}` | Update an existing user's profile. |
| `DELETE`       | `/users/{userId}` | Delete a user profile by ID.       |

---

### **Meals**

| **Method** | **Endpoint**  | **Description**    |
| ---------------- | ------------------- | ------------------------ |
| `POST`         | `/meals`          | Create a new meal.       |
| `GET`          | `/meals`          | Retrieve all meals.      |
| `GET`          | `/meals/{mealId}` | Retrieve a meal by ID.   |
| `PUT`          | `/meals/{mealId}` | Update an existing meal. |
| `DELETE`       | `/meals/{mealId}` | Delete a meal by ID.     |

---

### **Ingredients**

| **Method** | **Endpoint**              | **Description**          |
| ---------------- | ------------------------------- | ------------------------------ |
| `POST`         | `/ingredients`                | Create a new ingredient.       |
| `GET`          | `/ingredients`                | Retrieve all ingredients.      |
| `GET`          | `/ingredients/{ingredientId}` | Retrieve an ingredient by ID.  |
| `PUT`          | `/ingredients/{ingredientId}` | Update an existing ingredient. |
| `DELETE`       | `/ingredients/{ingredientId}` | Delete an ingredient by ID.    |

---

### **Food Logs**

| **Method** | **Endpoint**          | **Description**                    |
| ---------------- | --------------------------- | ---------------------------------------- |
| `POST`         | `/foodlogs`               | Create a new food log.                   |
| `GET`          | `/foodlogs/user/{userId}` | Retrieve all food logs for a user by ID. |
| `PUT`          | `/foodlogs/{logId}`       | Update an existing food log.             |
| `DELETE`       | `/foodlogs/{logId}`       | Delete a food log by ID.                 |

---

### **Shopping Lists**

| **Method** | **Endpoint**               | **Description**                     |
| ---------------- | -------------------------------- | ----------------------------------------- |
| `POST`         | `/shoppinglists/{mealPlanId}`  | Generate a shopping list for a meal plan. |
| `GET`          | `/shoppinglists/user/{userId}` | Retrieve all shopping lists for a user.   |
| `PUT`          | `/shoppinglists/{listId}`      | Update a shopping list.                   |
| `DELETE`       | `/shoppinglists/{listId}`      | Delete a shopping list by ID.             |

---

### Example Request and Response

#### **Create a New User**

- **Endpoint**: `POST /users`
- **Request Body**:
  ```json
  {
      "name": "John Doe",
      "bmi": 22.5,
      "dietaryRestrictions": ["VEGAN"],
      "caloricGoal": 2000
  }
  ```

---

## **Running the Application**

### **Development**

```bash
npm run dev
```

### **Swagger Documentation**

Access Swagger documentation at:

```bash
http://localhost:8080/docs
```

---

## **Testing**

### **Run Unit Tests**

```bash
npm test
```

### **Generate Coverage Report**

```bash
npm run coverage
```

### **View Coverage Report**

Open coverage/index.html in a browser.

---

## CI/CD Pipeline

The project includes a GitLab CI/CD pipeline with the following stages:

### Stages:

1. **Build**:

   - Installs project dependencies.
   - Ensures the application is ready for subsequent stages.
2. **Setup Database**:

   - Sets up the MySQL database using the provided SQL schema.
   - Verifies database connectivity and initializes the schema.
3. **Test**:

   - Runs unit tests to validate the functionality of the application.
   - Outputs test results as artifacts.
4. **Coverage**:

   - Generates code coverage reports using `c8`.
   - Outputs coverage reports as artifacts for further review.

---

## Troubleshooting

### Database Connection Issues:

- Ensure that DB is connected to a local instance of MySQL with the correct credentials.
- Check if MySQL is running on the specified host and port.

### Application Errors:

- Check logs in the terminal.
- Use tools like Postman or curl to test endpoints.

### SonarQube Analysis:

- Verify Java is installed and `JAVA_HOME` is correctly configured.
- It also needs a local/server instance of SonarQube with CNRES plugin for report generation

---

## Contact Information

- **Author**: Haleema Khan, Manar Shehazi, Olesia Schukina
- **Email**: hsadia538@gmail.com

---
