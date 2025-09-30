const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('Meal API Endpoints', () => {
    let mealId;

    // Test for creating a meal
    it('should create a new meal', (done) => {
        const newMeal = {
            name: "Spaghetti Bolognese",
            instructions: "Cook pasta and sauce, then mix together.",
            ingredients: [
                { ingredientId: 1,name: "Spaghetti" ,quantity: 20 , unit : "g"},
                { ingredientId: 2, name: "Beef",quantity: 30 , unit : "g"}
            ]
        };

        chai.request(app)
            .post('/meals')
            .auth('username', 'password')
            .send(newMeal)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    mealId = res.body.mealId;
                    expect(res.body.name).to.equal(newMeal.name);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for retrieving all meals
    it('should retrieve all meals', (done) => {
        chai.request(app)
            .get('/meals')
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

    // Test for retrieving a meal by ID
    it('should retrieve a meal by ID', (done) => {
        chai.request(app)
            .get(`/meals/${mealId}`)
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal("Spaghetti Bolognese");
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for updating a meal
    it('should update a meal', (done) => {
        const updatedMeal = {
            name: "Vegetarian Spaghetti",
            instructions: "Use vegetarian ingredients and mix.",
            ingredients: [
                { ingredientId: 3, quantity: 50 }
            ]
        };

        chai.request(app)
            .put(`/meals/${mealId}`)
            .auth('username', 'password')
            .send(updatedMeal)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equal(updatedMeal.name);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for deleting a meal
    it('should delete a meal', (done) => {
        chai.request(app)
            .delete(`/meals/${mealId}`)
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(204); 
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });
});