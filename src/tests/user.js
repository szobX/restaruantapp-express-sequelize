process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let responseId = 0;
chai.use(chaiHttp);

describe('User', () => {

    // /api/user test

    describe('/api/user test', () => {

        // GET /api/user all users
        describe('GET all users', () => {
            it('it should GET all users', (done) => {
                chai.request(server)
                .get('/api/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                    done()
                })
            })
        })

        // POST /api/user/{id}
        describe('POST user', () => {
            it('it should create new user', (done) => {
                let req = {
                    "firstName": "Michał",
                    "lastName": "Tester",
                    "email": "asdasd@test.pl",
                    "phoneNumber": "123123123",
                    "role": 1,
                }
                chai.request(server)
                .post('/api/user')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'active', 'createdAt', 'updatedAt' ])
                    responseId = res.body.id
                    done()
                })
            })
             // not all info passed
            it('it should fail to create new user with not all info passed', (done) => {
                let req = {
                    "email": "asdasd@test.pl",
                    "phoneNumber": "123123123",
                    "role": 1,
                }
                chai.request(server)
                .post('/api/user')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Body has Empty value');
                    done()
                })
            })
        })

        // GET one user
        describe('GET one user', () => {
            it('it should GET previously created user', (done) => {
                chai.request(server)
                .get('/api/user/' + responseId)
                .end((err,  res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'active', 'createdAt', 'updatedAt' ])
                    res.body.should.have.property('id').eql(responseId);
                    res.body.should.have.property('firstName').eql('Michał');
                    res.body.should.have.property('lastName').eql('Tester');
                    res.body.should.have.property('email').eql('asdasd@test.pl');
                    res.body.should.have.property('phoneNumber').eql('123123123');
                    res.body.should.have.property('role').eql(1);
                    done()
                })
            })
        })

        
        // PUT USER
        describe('PUT user', () => {
            it('it should PUT on previously created user', (done) => {
                let req = {
                    "firstName": "Marek",
                    "role": 2 
                }
                chai.request(server)
                .put('/api/user/' + responseId)
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'active', 'createdAt', 'updatedAt' ])
                    res.body.should.have.property('id').eql(responseId);
                    res.body.should.have.property('firstName').eql('Marek');
                    res.body.should.have.property('lastName').eql('Tester');
                    res.body.should.have.property('email').eql('asdasd@test.pl');
                    res.body.should.have.property('phoneNumber').eql('123123123');
                    res.body.should.have.property('role').eql(2);
                    done()
                })
            })
        })


       // DELETE user
        describe('DELETE user', () => {
            it('it should DELETE user', (done) => {
                chai.request(server)
                .delete('/api/user/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('User was deleted successfully!')
                done()
                })
            })

            it('it should return 404 on GET', (done) => {
                chai.request(server)
                .get('/api/user/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                done()
                })
            })
        })

    })
})