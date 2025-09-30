const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('MealPlan API Endpoints', () => {
    let mealPlanId;
    const userId = 1;

    // Test for creating meal plan
    it('should create a meal plan', (done) => {
        const newMealPlan = {
            date: "2024-11-26",
            userId,
            meals: [ 1, 2 ]
        }
        chai.request(app)
            .post('/mealplans')
            .auth('username', 'password')
            .send(newMealPlan)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('mealPlanId');
                    mealPlanId = res.body.mealPlanId;
                    expect(res.body.userId).to.equal(newMealPlan.userId);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    })

    // Test for getting meal plan by ID
    it('should retrieve a meal plan by ID', (done) => {
        chai.request(app)
            .get(`/mealplans/${mealPlanId}`)
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.be.empty;
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for getting list of all meal plans for a user
    it('should retrieve all meal plans for a specific user', (done) => {
        chai.request(app)
            .get(`/mealplans/user/${userId}`)
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.not.be.empty;
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for updating meal plan
    it('should update a meal plan', (done) => {
        const updatedMealPlan = {
            date: "2024-11-26",
            userId,
            meals: [ 3 ]
        }
        chai.request(app)
            .put(`/mealplans/${mealPlanId}`)
            .auth('username', 'password')
            .send(updatedMealPlan)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(201);
                    expect(res.body.mealPlanId).to.equal(mealPlanId);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    })


    // Test for deleting a meal plan
    it('should delete a meal plan', (done) => {
        chai.request(app)
            .delete(`/mealplans/${mealPlanId}`)
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });
});