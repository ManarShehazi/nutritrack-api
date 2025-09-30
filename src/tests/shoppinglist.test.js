const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('ShoppingList API Endpoints', () => {
    let listId
    const userId = 1
    const mealPlanId = 2

    // Test for creating a shopping list
    it('should create a shopping list', (done) => {
      const newShoppingList = {
        type: "Everyday",
      }
      chai.request(app)
            .post(`/shoppinglists/new/${mealPlanId}`)
            .auth('username', 'password')
            .send(newShoppingList)
            .end((err, res) => {
                if (err) return done(err);
                try {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('listId');
                    listId = res.body.listId;
                    expect(res.body.mealPlanId).to.equal(mealPlanId);
                    done();
                } catch (error) {
                    done(error);
                }
            });
    })

    // Test for getting list of all shopping lists for a user
    it('should retrieve all shopping lists for a specific user', (done) => {
      chai.request(app)
            .get(`/shoppinglists/user/${userId}`)
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

    // Test for updating shopping list
    it('should update a shopping list', (done) => {
      const updatedShoppingList = {
        type: "Holiday"
      }
      chai.request(app)
          .put(`/shoppinglists/${listId}`)
          .auth('username', 'password')
          .send(updatedShoppingList)
          .end((err, res) => {
              if (err) return done(err);
              try {
                  expect(res).to.have.status(201);
                  expect(res.body.listId).to.equal(listId);
                  done();
              } catch (error) {
                  done(error);
              }
          });
    })


    // Test for deleting a shopping list
    it('should delete a shopping list', (done) => {
      chai.request(app)
            .delete(`/shoppinglists/delete/${listId}`)
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