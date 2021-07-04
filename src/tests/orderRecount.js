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

describe('orderRecount', () => {

    // /api/order/recount test

    describe('/api/order/recount test', () => {

        // create new order
        // describe('POST /api/order create order', () => {
        //     it('it should POST new order', (done) => {
        //         let req = {
        //             "tableNumber": 1,
        //             "number": "123",
        //             "clientId": 1,
        //             "currencyId": 1,
        //             "price": "123.00",
        //             "CurrencyId": 1,
        //             "active": true
                    
        //         }
        //         chai.request(server)
        //         .post('/api/order')
        //         .set('Content-Type', 'application/json')
        //         .send(req)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object')
        //             .that.has.all.keys([ 'id', 
        //             'tableNumber',
        //             'number',
        //             'clientId', 
        //             'currencyId', 
        //             'price', 
        //             'active', 
        //             'status', 
        //             'createdAt', 
        //             'updatedAt',
        //             'CurrencyId'
        //         ])
        //             responseId = res.body.id
        //             //res.body.errors.should.have.property('pages');
        //             //res.body.errors.pages.should.have.property('kind').eql('required');
        //         done()
        //         })
        //     })
        // })

        // GET 1 order
        responseId = 7
        describe('GET one order', () => {
            it('it should GET previously created order', (done) => {
                chai.request(server)
                    .get('/api/order/' + responseId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body['order'].should.be.a('object')
                        .that.has.all.keys([ 'id', 
                                            'tableNumber',
                                            'number',
                                            'clientId', 
                                            'currencyId', 
                                            'price', 
                                            'active', 
                                            'status', 
                                            'createdAt', 
                                            'updatedAt',
                                            'CurrencyId',
                                            'user',
                                            'currency'
                                        ])
                        res.body['order'].should.have.property('id').eql(responseId);
                        res.body['order'].should.have.property('active').eql(true)
                        price = res.body['order']['price'];
                      done();
                    });
                });
        }
    )

         // POST /api/currency/{id}
         describe('POST currency', () => {
            it('it should create new currency', (done) => {
                let req = {
                    "name": "Dollar",
                    "symbol": "$",
                    "exchangeRate": "3.69",
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
                    currencyResponseId = res.body.id
                    done()
                })
            })
        })

        // GET one currency
        describe('GET one currency', () => {
            it('it should GET previously created currency', (done) => {
                chai.request(server)
                .get('/api/currency/' + currencyResponseId)
                .end((err,  res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'name', 'symbol', 'exchangeRate', 'active', 'createdAt', 'updatedAt' ])
                    res.body.should.have.property('id').eql(currencyResponseId);
                    res.body.should.have.property('name').eql('Dollar');
                    res.body.should.have.property('symbol').eql('$');
                    res.body.should.have.property('exchangeRate').eql('3.69');
                    res.body.should.have.property('active').eql(true);
                    done()
                })
            })
        })

        describe('PUT recount order', () => {
            it('it should recount order to dollars', (done) => {
                let req = {
                    "currencyId": currencyResponseId
                }
                const check = (price * 3.69).toFixed(2)
                chai.request(server)
                .post('/api/order/' + responseId + '/recount/')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('price').eql(check);
                    done()
                })
            })})
        });
});