
# NutriTrack API User Manual: Using Postman

This tutorial will guide you through the steps to interact with the NutriTrack API using Postman. Postman is a popular tool for testing and interacting with APIs through a graphical user interface. By the end of this tutorial, you will be able to perform actions like creating users, managing meals, and logging food through the NutriTrack API using Postman.

## Prerequisites

Before proceeding, ensure you have:

1. Postman installed on your local machine. You can download it from [here](https://www.postman.com/downloads/).
2. NutriTrack API running locally. Follow the Project Setup section to get the API up and running on your machine.

## 1. Setting Up Postman

1. Open Postman after installing it.
2. Make sure your NutriTrack API server is running (use `npm start` in the project directory if it's not already running).
3. Set the base URL for your NutriTrack API (assuming it's running locally):
   ```bash
   http://localhost:3000
   ```
   All requests in this tutorial will use this base URL and append relevant endpoints.

## 2. Create a New User

### Endpoint: `POST /users`

To create a new user profile, follow these steps:

1. **Method**: POST
2. **URL**: `http://localhost:3000/users`
3. **Request Body**: In the **Body** tab of Postman, select **raw** and **JSON** format. Then enter the following JSON to create a user:

   ```json
   {
       "name": "John Doe",
       "bmi": 22.5,
       "dietaryRestrictions": ["VEGAN"],
       "caloricGoal": 2000
   }
   ```

4. Click **Send** to make the request.

### Expected Response:

```json
{
    "userId": 1,
    "name": "John Doe",
    "bmi": 22.5,
    "dietaryRestrictions": ["VEGAN"],
    "caloricGoal": 2000
}
```

## 3. Retrieve All Users

### Endpoint: `GET /users`

To retrieve all users, follow these steps:

1. **Method**: GET
2. **URL**: `http://localhost:3000/users`
3. Click **Send** to make the request.

### Expected Response:

```json
[
    {
        "userId": 1,
        "name": "John Doe",
        "bmi": 22.5,
        "dietaryRestrictions": ["VEGAN"],
        "caloricGoal": 2000
    }
]
```

## 4. Retrieve a User by ID

### Endpoint: `GET /users/{userId}`

To retrieve the user profile you created earlier:

1. **Method**: GET
2. **URL**: `http://localhost:3000/users/1` (replace `1` with the `userId` you want to retrieve)
3. Click **Send** to make the request.

### Expected Response:

```json
{
    "userId": 1,
    "name": "John Doe",
    "bmi": 22.5,
    "dietaryRestrictions": ["VEGAN"],
    "caloricGoal": 2000
}
```

## 5. Update a User's Profile

### Endpoint: `PUT /users/{userId}`

To update the details of the user:

1. **Method**: PUT
2. **URL**: `http://localhost:3000/users/1`
3. **Request Body**: In the **Body** tab of Postman, select **raw** and **JSON** format. Then enter the following JSON to update the user’s profile:

   ```json
   {
       "name": "Johnathan Doe",
       "bmi": 23.0,
       "dietaryRestrictions": ["VEGAN", "GLUTEN_FREE"],
       "caloricGoal": 2200
   }
   ```

4. Click **Send** to make the request.

### Expected Response:

```json
{
    "userId": 1,
    "name": "Johnathan Doe",
    "bmi": 23.0,
    "dietaryRestrictions": ["VEGAN", "GLUTEN_FREE"],
    "caloricGoal": 2200
}
```

## 6. Delete a User

### Endpoint: `DELETE /users/{userId}`

To delete the user you created:

1. **Method**: DELETE
2. **URL**: `http://localhost:3000/users/1` (replace `1` with the `userId` you want to delete)
3. Click **Send** to make the request.

### Expected Response:

```json
{
    "message": "User with ID 1 has been deleted."
}
```

## 7. Create a New Meal

### Endpoint: `POST /meals`

To create a new meal:

1. **Method**: POST
2. **URL**: `http://localhost:3000/meals`
3. **Request Body**: In the **Body** tab of Postman, select **raw** and **JSON** format. Then enter the following JSON to create a meal:

   ```json
   {
       "name": "Vegan Salad",
       "instructions": "Toss lettuce, tomatoes, cucumbers, and dressing together."
   }
   ```

4. Click **Send** to make the request.

### Expected Response:

```json
{
    "mealId": 1,
    "name": "Vegan Salad",
    "instructions": "Toss lettuce, tomatoes, cucumbers, and dressing together."
}
```

## 8. Retrieve All Meals

### Endpoint: `GET /meals`

To retrieve all meals:

1. **Method**: GET
2. **URL**: `http://localhost:3000/meals`
3. Click **Send** to make the request.

### Expected Response:

```json
[
    {
        "mealId": 1,
        "name": "Vegan Salad",
        "instructions": "Toss lettuce, tomatoes, cucumbers, and dressing together."
    }
]
```

## 9. Create a Food Log for a User

### Endpoint: `POST /foodlogs`

To log a food entry for a user:

1. **Method**: POST
2. **URL**: `http://localhost:3000/foodlogs`
3. **Request Body**: In the **Body** tab of Postman, select **raw** and **JSON** format. Then enter the following JSON to log food for a user:

   ```json
   {
       "userId": 1,
       "date": "2024-12-20",
       "mealsLogged": ["Vegan Salad"]
   }
   ```

4. Click **Send** to make the request.

### Expected Response:

```json
{
    "foodLogId": 1,
    "userId": 1,
    "date": "2024-12-20",
    "mealsLogged": ["Vegan Salad"]
}
```

## 10. Generate a Shopping List

### Endpoint: `POST /shoppinglists/{mealPlanId}`

To generate a shopping list for a meal plan (for the sake of this example, assume `mealPlanId = 1`):

1. **Method**: POST
2. **URL**: `http://localhost:3000/shoppinglists/1`
3. Click **Send** to make the request.

### Expected Response:

```json
{
    "listId": 1,
    "mealPlanId": 1,
    "items": [
        {
            "ingredient": "Lettuce",
            "quantity": "1 head"
        },
        {
            "ingredient": "Tomatoes",
            "quantity": "2"
        },
        {
            "ingredient": "Cucumbers",
            "quantity": "2"
        },
        {
            "ingredient": "Dressing",
            "quantity": "1 bottle"
        }
    ]
}
```

## Contact Information

- **Authors**: Haleema Khan, Manar Shehazi, Olesia Schukina
- **Email**: hsadia538@gmail.com

