process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let responseId = 0;
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('splitBill', () => {

    // /api/bill/splitbill test

    describe('/api/bill/splitbill test', () => {

        describe('POST /api/bill create bill', () => {
            it('it should POST new bill', (done) => {
                let req = {
                    "orderId": 1,
                    "items": [1, 2, 3]

                }
                chai.request(server)
                    .post('/api/bill')
                    .set('Content-Type', 'application/json')
                    .send(req)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object')
                            .that.has.all.keys(['id',
                                'orderId',
                                'clientId',
                                'currencyId',
                                'price',
                                'active',
                                'createdAt',
                                'updatedAt'
                            ])
                        responseId = res.body.id
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
                        res.body.should.be.an('object').and.have.property('bill')
                            .that.has.all.keys([
                                'id',
                                'orderId',
                                'clientId',
                                'currencyId',
                                'price',
                                'active',
                                'createdAt',
                                'updatedAt',
                                'user',
                                'currency',
                            ])
                        res.body['bill'].should.have.property('id').eql(responseId);
                        res.body['bill'].should.have.property('active').eql(true)
                        done();
                    });
            });
        })

        describe('POST split bill', () => {
            it('it should split bill', (done) => {
                let req = {
                    "clientId": 1,
                    "items": [1, 2, 3]
                }

                chai.request(server)
                    .post('/api/bill/' + responseId + '/split/')
                    .set('Content-Type', 'application/json')
                    .send(req)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object')
                            .that.has.property('message').eql("Bill has been split successfully!")
                        done()
                    })
            })
        })

        // GET 1 bill
        describe('GET one bill with empty items', () => {
            it('it should GET previously created bill with empty items', (done) => {
                chai.request(server)
                    .get('/api/bill/' + responseId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('object').and.have.property('bill')
                            .that.has.all.keys([
                                'id',
                                'orderId',
                                'clientId',
                                'currencyId',
                                'price',
                                'active',
                                'createdAt',
                                'updatedAt',
                                'user',
                                'currency',
                            ])
                        res.body['bill'].should.have.property('id').eql(responseId);
                        res.body.should.have.property('items').that.is.empty
                        done();
                    });
            });
        })
    });
});