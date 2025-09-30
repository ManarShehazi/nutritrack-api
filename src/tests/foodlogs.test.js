const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('FoodLog API Endpoints', () => {
    let foodLogId;

    // Test for creating a food log
    it('should create a new food log', (done) => {
        const newFoodLog = {
            userId: 1,
            date: "2024-11-25",
            mealsLogged: [
                {
                    mealId: 1,
                    instructions: "Prepare meal 1.",
                    name: "Meal 1",
                    ingredients: [
                        { ingredientId: 1, unit: "g", name: "Ingredient 1" },
                        { ingredientId: 2, unit: "g", name: "Ingredient 2" }
                    ]
                },
                {
                    mealId: 2,
                    instructions: "Prepare meal 2.",
                    name: "Meal 2",
                    ingredients: [
                        { ingredientId: 3, unit: "g", name: "Ingredient 3" },
                        { ingredientId: 4, unit: "g", name: "Ingredient 4" }
                    ]
                }
            ]
        };

        chai.request(app)
            .post('/foodlogs')
            .auth('username', 'password') // Replace with valid credentials
            .send(newFoodLog)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('logId');
                    foodLogId = res.body.logId;
                    expect(res.body.userId).to.equal(newFoodLog.userId);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

      it('should retrieve all food logs for a specific user', (done) => {
        chai.request(app)
            .get('/foodlogs/user/1') // Replace `1` with the userId you're testing
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.not.be.empty;
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for updating a food log
    it('should update a food log', (done) => {
        const updatedFoodLog = {
            userId: 1,
            date: "2024-11-26",
            mealsLogged: [
                {
                    mealId: 3,
                    instructions: "Prepare updated meal 1.",
                    name: "Updated Meal 1",
                    ingredients: [
                        { ingredientId: 5, unit: "g", name: "Updated Ingredient 1" }
                    ]
                }
            ]
        };

        chai.request(app)
            .put(`/foodlogs/${foodLogId}`)
            .auth('username', 'password')
            .send(updatedFoodLog)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(200);
                    expect(res.body.logId).to.equal(foodLogId);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for deleting a food log
    it('should delete a food log', (done) => {
        chai.request(app)
            .delete(`/foodlogs/${foodLogId}`)
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(204); // No Content
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });
});