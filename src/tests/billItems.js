process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let responseId = 0;
chai.use(chaiHttp);

describe('Billitems', () => {

    // /api/bill test

    describe('/api/bill test', () => {

        // create bill /api/bill used for testing

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
                done()
                })
            })
        })

        responseId = 1
        describe('GET /api/bill created bill with items', () => {
            it('it should GET created items', (done) => {
                chai.request(server)
                .get('/api/bill/' + responseId + '/billPosition/' )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array').that.is.not.empty
                    res.body.should.have.length.of.at.most(3);
                    res.body[0].should.be.a('object')
                    .that.has.all.keys(
                        [
                            'id'
                        ]
                    )
                    res.body[0]["billPositions"].should.be.a("object")
                    .that.has.all.keys(
                        [
                            'id'
                        ]
                    )
                    positionId = res.body.id;
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
                .put('/api/bill/' + responseId + '/billPositions/' + positionId)
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id'
                ])
                    res.body.should.have.property('id').eql(positionId);
                    res.body.should.have.property('active').eql(true)
                    done()
                })
            })
        })



       // DELETE billPositions
        describe('DELETE /api/bill delete billPosition', () => {
            it('it should DELETE billPosition', (done) => {
                chai.request(server)
                .delete('/api/bill/' + responseId + '/billPosition/' + positionId)
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