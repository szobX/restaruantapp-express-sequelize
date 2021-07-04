process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let should = chai.should();
let expect = chai.expect;
let responseId = 0;
chai.use(chaiHttp);

describe('Order', () => {

    // /api/order test

    describe('/api/order test', () => {

        // GET all orders
        describe('GET all orders', () => {
            it('it should GET all orders', (done) => {
                chai.request(server)
                    .get('/api/order')
                    .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a('array');
                          res.body.length.should.be.at.least(1);
                      done();
                    });
              });
        })
    
        // check if /api/order array returns 11 positions

        describe('GET orders number of properties', () => {
            it('it should have 11 properties', (done) => {
                chai.request(server)
                    .get('/api/order')
                    .end((err, res) => {
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
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
                                                'CurrencyId'
                                            ])
                    done()
                    })
            })
        })

        // create order /api/order
        describe('POST /api/order create order', () => {
            it('it should POST new order', (done) => {
                let req = {
                    "tableNumber": 1,
                    "number": "123",
                    "clientId": 1,
                    "currencyId": 1,
                    "price": "123.00",
                    "CurrencyId": 1,
                    "active": true
                    
                }
                chai.request(server)
                .post('/api/order')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
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
                    'CurrencyId'
                ])
                    responseId = res.body.id
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                done()
                })
            })
        })

        // GET 1 order
        describe('GET one order', () => {
                it('it should GET previously created order', (done) => {
                    chai.request(server)
                        .get('/api/order/' + responseId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object')
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
                                                'CurrencyId'
                                            ])
                            res.body.should.have.property('id').eql(responseId);
                            res.body.should.have.property('active').eql(true)
                          done();
                        });
                    });
            }
        )

        // PUT ORDER
        describe('PUT order', () => {
            it('it should PUT previously created order', (done) => {
                let req = {
                    "active": false
                }
                chai.request(server)
                .put('/api/order/' + responseId)
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
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
                    'CurrencyId'
                ])
                    res.body.should.have.property('id').eql(responseId);
                    res.body.should.have.property('active').eql(false)
                    done()
                })
            })
        })


       // DELETE order
        describe('DELETE /api/order delete order', () => {
            it('it should DELETE order', (done) => {
                chai.request(server)
                .delete('/api/order/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Order was deleted successfully!')
                done()
                })
            })

            it('it should return 404 on GET', (done) => {
                chai.request(server)
                .get('/api/order/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                done()
                })
            })
        })
    });
});