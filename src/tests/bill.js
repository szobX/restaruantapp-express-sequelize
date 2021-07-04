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

describe('Bill', () => {

    // /api/bill test

    describe('/api/bill test', () => {

        // GET all bills
        describe('GET all bills', () => {
            it('it should GET all bills', (done) => {
                chai.request(server)
                    .get('/api/bills')
                    .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a('array');
                          res.body.length.should.be.at.least(1);
                      done();
                    });
              });
        })
    
        // check if /api/bills array returns 11 positions

        describe('GET bills number of properties', () => {
            it('it should have 1 property', (done) => {
                chai.request(server)
                    .get('/api/bill')
                    .end((err, res) => {
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
                            .that.has.all.keys([ 'id'
                                            ])
                    done()
                    })
            })
        })

        // create bill /api/bill
        describe('POST /api/bill create bill', () => {
            it('it should POST new bill', (done) => {
                let req = {
                        "name": "bill1"
                    
                }
                chai.request(server)
                .post('/api/bill')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id'
                ])
                    responseId = res.body.id
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                done()
                })
            })
        })

        // GET 1 bill
        describe('GET one bill', () => {
                it('it should GET previously created bill', (done) => {
                    chai.request(server)
                        .get('/api/bill/' + responseId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object')
                            .that.has.all.keys([ 'id'
                                            ])
                            res.body.should.have.property('id').eql(responseId);
                            res.body.should.have.property('active').eql(true)
                          done();
                        });
                    });
            }
        )

        // PUT bill
        describe('PUT bill', () => {
            it('it should PUT previously created bill', (done) => {
                let req = {
                    "active": false
                }
                chai.request(server)
                .put('/api/bill/' + responseId)
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id'
                ])
                    res.body.should.have.property('id').eql(responseId);
                    res.body.should.have.property('active').eql(false)
                    done()
                })
            })
        })


       // DELETE bill
        describe('DELETE /api/bill delete bill', () => {
            it('it should DELETE bill', (done) => {
                chai.request(server)
                .delete('/api/bill/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Bill was deleted successfully!')
                done()
                })
            })

            it('it should return 404 on GET', (done) => {
                chai.request(server)
                .get('/api/bill/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                done()
                })
            })
        })
    });
});