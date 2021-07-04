process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let responseId = 0;
let categoryResponseId = 0;
chai.use(chaiHttp);

describe('OrderCategories', () => {

    // /api/order test

    describe('/api/order test', () => {

        // create order /api/order used for testing

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

        responseId = 1
        describe('GET /api/order created order with positions', () => {
            it('it should GET created positions', (done) => {
                chai.request(server)
                .get('/api/order/' + responseId + '/orderPositions/' )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array').that.is.not.empty
                    res.body.should.have.length.of.at.most(3);
                    res.body[0].should.be.a('object')
                    .that.has.all.keys(
                        [
                            'id',
                            'menuPositionId',
                            'orderId',
                            'active',
                            'createdAt',
                            'updatedAt',
                            'MenuPositionId',
                            'menuPositions'
                        ]
                    )
                    res.body[0]["menuPositions"].should.be.a("object")
                    .that.has.all.keys(
                        [
                            'id',
                            'menuCategoryId',
                            'name',
                            'price',
                            'currencyId',
                            'active',
                            'createdAt',
                            'updatedAt',
                            'CurrencyId',
                            'MenuCategoryId'
                        ]
                    )
                    done()
                })
            })
        })

          // PUT orderpositions
          positionId = 10
          describe('PUT orderPositions', () => {
            it('it should PUT previously created orderposition', (done) => {
                let req = {
                    "active": false
                }
                chai.request(server)
                .put('/api/order/' + responseId + '/orderPositions/' + positionId)
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
                    res.body.should.have.property('id').eql(positionId);
                    res.body.should.have.property('active').eql(true)
                    done()
                })
            })
        })



       // DELETE orderPosition
        describe('DELETE /api/order delete orderPosition', () => {
            it('it should DELETE orderPosition', (done) => {
                chai.request(server)
                .delete('/api/order/' + responseId + '/orderPositions/' + positionId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('order Position was deleted successfully!')
                done()
                })
            })

            it('it should return 404 on GET', (done) => {
                chai.request(server)
                .get('/api/order/' + responseId + '/orderPositions/' + positionId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                done()
                })
            })
        })
    });
});