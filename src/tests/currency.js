process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let should = chai.should();
let expect = chai.expect;
let responseId = 0;
chai.use(chaiHttp);

describe('Currency', () => {

    // /api/currency test

    describe('/api/currency test', () => {

        // GET /api/currency all currencies
        describe('GET all currencies', () => {
            it('it should GET all currencies', (done) => {
                chai.request(server)
                .get('/api/currency')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                    done()
                })
            })
        })

        // POST /api/currency/{id}
        describe('POST currency', () => {
            it('it should create new currency', (done) => {
                let req = {
                    "name": "Bitcoin",
                    "symbol": "BTC",
                    "exchangeRate": "36200",
                    "active": true
                }
                chai.request(server)
                .post('/api/currency')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'name', 'symbol', 'exchangeRate', 'active', 'createdAt', 'updatedAt' ])
                    responseId = res.body.id
                    done()
                })
            })

            it('it should fail to create new currency with not all info passed', (done) => {
                    let req = {
                        "name": "Bitcoin",
                    }
                chai.request(server)
                .post('/api/currency')
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

        // GET one currency
        describe('GET one currency', () => {
            it('it should GET previously created currency', (done) => {
                chai.request(server)
                .get('/api/currency/' + responseId)
                .end((err,  res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'name', 'symbol', 'exchangeRate', 'active', 'createdAt', 'updatedAt' ])
                    res.body.should.have.property('id').eql(responseId);
                    res.body.should.have.property('name').eql('Bitcoin');
                    res.body.should.have.property('symbol').eql('BTC');
                    res.body.should.have.property('exchangeRate').eql('36200.00');
                    res.body.should.have.property('active').eql(true);
                    done()
                })
            })
        })

        
        // PUT currency
        describe('PUT currency', () => {
            it('it should PUT on previously created currency', (done) => {
                let req = {
                    "exchangeRate": "32000",
                    "active": false 
                }
                chai.request(server)
                .put('/api/currency/' + responseId)
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'name', 'symbol', 'exchangeRate', 'active', 'createdAt', 'updatedAt' ])
                    res.body.should.have.property('id').eql(responseId);
                    res.body.should.have.property('name').eql('Bitcoin');
                    res.body.should.have.property('symbol').eql('BTC');
                    res.body.should.have.property('exchangeRate').eql('32000.00');
                    res.body.should.have.property('active').eql(false);
                    done()
                })
            })
        })


       // DELETE currency
        describe('DELETE currency', () => {
            it('it should DELETE currency', (done) => {
                chai.request(server)
                .delete('/api/currency/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Currency was deleted successfully!')
                done()
                })
            })

            it('it should return 404 on GET', (done) => {
                chai.request(server)
                .get('/api/currency/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                done()
                })
            })
        })

    })
})