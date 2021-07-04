process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let should = chai.should();
let responseId = 0;
chai.use(chaiHttp);

describe('Billitems', () => {

    // /api/bill test

    describe('/api/bill test', () => {

        // create bill /api/bill used for testing

        describe('POST /api/bill create bill', () => {
            it('it should POST new bill', (done) => {
                let req = {
                        "orderId": 1
                    
                }
                chai.request(server)
                .post('/api/bill')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id',
                    'orderId',
                    'clientId',
                    'currencyId',
                    'price',
                    'active',
                    'createdAt',
                    'updatedAt'
                ])
                    responseId = res.body.id
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                done()
                })
            })
        })

        
        describe('GET /api/bill created bill with items', () => {
            it('it should GET created items', (done) => {
                chai.request(server)
                .get('/api/bill/' + responseId + '/billitems/' )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array').that.is.not.empty
                    res.body.should.have.length.of.at.least(1);
                    res.body[0].should.be.a('object')
                    .that.has.all.keys([ 'id',
                    'menuPositionId',
                    'billId',
                    'active',
                    'createdAt',
                    'updatedAt',
                    'menuPositions',
                        ])
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
                    positionId = res.body[0].id;
                    done()
                })
            })
        })

          // PUT billPositions

          describe('PUT billPositions', () => {
            it('it should PUT previously created billPosition', (done) => {
                let req = {
                    "active": false
                }
                chai.request(server)
                .put('/api/bill/' + responseId + '/billItems/' + positionId)
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id',
                        'menuPositionId',
                        'billId',
                        'active',
                        'createdAt',
                        'updatedAt'
                ])
                    res.body.should.have.property('id').eql(positionId);
                    res.body.should.have.property('active').eql(false)
                    done()
                })
            })
        })



       // DELETE billPositions
        describe('DELETE /api/bill delete billPosition', () => {
            it('it should DELETE billPosition', (done) => {
                chai.request(server)
                .delete('/api/bill/' + responseId + '/billitems/' + positionId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('bill Position was deleted successfully!')
                done()
                })
            })

            it('it should return 404 on GET', (done) => {
                chai.request(server)
                .get('/api/bill/' + responseId + '/billPosition/' + positionId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                done()
                })
            })
        })
    });
});