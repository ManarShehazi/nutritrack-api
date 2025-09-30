const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('Ingredient API Endpoints', () => {
    let ingredientId;

    // Test for creating an ingredient
    it('should create a new ingredient', (done) => {
        const newIngredient = {
            name: "Tomato",
            unit: "kg"
        };

        chai.request(app)
            .post('/ingredients')
            .auth('username', 'password') 
            .send(newIngredient)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal(newIngredient.name);
                    ingredientId = res.body.ingredientId; 
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for retrieving all ingredients
    it('should retrieve all ingredients', (done) => {
        chai.request(app)
            .get('/ingredients')
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

    // Test for retrieving an ingredient by ID
    it('should retrieve an ingredient by ID', (done) => {
        chai.request(app)
            .get(`/ingredients/${ingredientId}`)
            .auth('username', 'password')
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal("Tomato");
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for updating an ingredient
    it('should update an ingredient', (done) => {
        const updatedIngredient = {
            name: "Cherry Tomato",
            unit: "grams"
        };

        chai.request(app)
            .put(`/ingredients/${ingredientId}`)
            .auth('username', 'password')
            .send(updatedIngredient)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equal(updatedIngredient.name);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    // Test for deleting an ingredient
    it('should delete an ingredient', (done) => {
        chai.request(app)
            .delete(`/ingredients/${ingredientId}`)
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