process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let expect = chai.expect;
let should = chai.should();
let responseId = 0;
chai.use(chaiHttp);

describe('Menu', () => {

    // /api/menus test

    describe('/api/menu test', () => {

        // GET all menus
        describe('GET all menus', () => {
            it('it should GET all menus', (done) => {
                chai.request(server)
                    .get('/api/menu')
                    .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a('array');
                          res.body.length.should.be.at.least(1);
                      done();
                    });
              });
        })
    
        // check if /api/menus array returns 4 positions

        describe('GET menus number of properties', () => {
            it('it should have 4 properties', (done) => {
                chai.request(server)
                    .get('/api/menu')
                    .end((err, res) => {
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
                            .that.has.all.keys([ 'id', 'name', 'active', 'createdAt', 'updatedAt' ])
                    done()
                    })
            })
        })

        // create menu /api/menu
        describe('POST menu create menu', () => {
            it('it should POST new menu', (done) => {
                let req = {
                    "name": "Test Menu",
                    "description": "test"
                }
                chai.request(server)
                .post('/api/menu')
                .set('Content-Type', 'application/json')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'name', 'active', 'createdAt', 'updatedAt' ])
                    responseId = res.body.id
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                done()
                })
            })
        })

        // GET 1 menu
        describe('GET one menu', () => {
                it('it should GET previously created menu', (done) => {
                    chai.request(server)
                        .get('/api/menu/' + responseId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object')
                            .that.has.all.keys([ 'id', 'name', 'active', 'createdAt', 'updatedAt' ])
                            res.body.should.have.property('id').eql(responseId);
                            res.body.should.have.property('name').eql('Test Menu')
                            res.body.should.have.property('active').eql(true)
                          done();
                        });
                    });
            }
        )

        // PUT MENU
        describe('PUT menu', () => {
            it('it should PUT previously created menu', (done) => {
                let req = {
                    "name": "Production Menu",
                    "active": false
                }
                chai.request(server)
                .put('/api/menu/' + responseId)
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'name', 'active', 'createdAt', 'updatedAt' ])
                    res.body.should.have.property('id').eql(responseId);
                    res.body.should.have.property('name').eql('Production Menu')
                    res.body.should.have.property('active').eql(false)
                    done()
                })
            })
        })


       // DELETE menu
        describe('DELETE menu delete menu', () => {
            it('it should DELETE menu', (done) => {
                chai.request(server)
                .delete('/api/menu/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Menu was deleted successfully!')
                done()
                })
            })

            it('it should return 404 on GET', (done) => {
                chai.request(server)
                .get('/api/menu/' + responseId)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                done()
                })
            })
        })
    });
});