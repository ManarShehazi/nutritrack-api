const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
const { expect } = chai;

describe('User API Endpoints', () => {
    let userId;

    it('should create a new user', (done) => {
        const newUser = {
            name: 'John Doe',
            bmi: 22.5,
            dietaryRestrictions: ['VEGAN'],
            caloricGoal: 2000,
        };

        chai.request(app)
            .post('/users')
            .auth('username', 'password') // Add Basic Authentication header
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                try {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal('John Doe');
                    userId = res.body.userId;
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    it('should retrieve the user by ID', async () => {
        const res = await chai.request(app).get(`/users/${userId}`).auth('username', 'password') 
            ;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('name', 'John Doe');
        expect(res.body).to.have.property('caloricGoal', 2000);
    });

    it('should delete the user', async () => {
        const res = await chai.request(app).delete(`/users/4`).auth('username', 'password') 
            ;
        expect(res.status).to.equal(204);
    });

    it('should return 404 for a non-existent user', async () => {
        const res = await chai.request(app).get(`/users/99999`).auth('username', 'password');
        expect(res.status).to.equal(404);
    });
});
