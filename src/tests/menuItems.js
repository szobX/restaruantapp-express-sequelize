process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let responseId = 0;
let should = chai.should();
let categoryResponseId = 0;
chai.use(chaiHttp);

describe('MenuCategories', () => {

    // /api/menu test

    describe('/api/menu test', () => {

        // create menu /api/menu used for testing
        describe('POST menu create menu', () => {
            it('it should POST new menu', (done) => {
                let req = {
                    "name": "Test Menu",
                    "description": "categoryId test"
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
                done()
                })
            })
        })

        describe('POST menu create category', () => {
            it('it should POST new category', (done) => {
                let req = {
                    "name": "testCategory"
                }
                chai.request(server)
                .post('/api/menu/' + responseId + '/menuCategory/')
                .send(req)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'menuId', 'name', 'active', 'createdAt', 'updatedAt'])
                    categoryResponseId = res.body.id
                done()
                })
            })

            it('it should fail to POST new category', (done) => {
                let req = {
                }
                chai.request(server)
                .post('/api/menu/' + responseId + '/menuCategory/')
                .send(req)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(400);
                done()
                })
            })
        })

        describe('GET menu created category', () => {
            it('it should GET created category', (done) => {
                chai.request(server)
                .get('/api/menu/' + responseId + '/menuCategory/' + categoryResponseId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    .that.has.all.keys([ 'id', 'menuId', 'name', 'active', 'createdAt', 'updatedAt', 'MenuId', 'menu'])
                    done()
                })
            })
        })

        describe('POST create new menuItem', () => {
            it('it should POST new menuItem', (done) => {
                let req = {
                    "menuCategoryId": 1,
                    "name": "Kamikaze",
                    "price": "7.00",
                    "currencyId": 1,
                    "active": true,
                    "MenuCategoryId": 1
                }
                chai.request(server)
                .post('/api/menu/' + responseId + '/menuCategory/' + categoryResponseId + '/menuPositions/')
                .send(req)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    itemResponseId = res.body.id
                done()
            })
        })
    })
    // DELETE THIS
    itemResponseId = 1;
    describe('DELETE created menuItem', () => {
        it('it should DELETE created menuItem', (done) => {
            chai.request(server)
            .delete('/api/menu/' + responseId + '/menuCategory/' + categoryResponseId + '/menuPositions/' + itemResponseId)
            .end((err, res) => {
                res.should.have.status(200);
            done()
        })
    })
    })

    describe('GET deleted menuItem', () => {
        it('it should return 404', (done) => {
            chai.request(server)
            .get('/api/menu/' + responseId + '/menuCategory/' + categoryResponseId + '/menuPositions/' + itemResponseId)
            .end((err, res) => {
                res.should.have.status(404);
            
            done()
        })
    })
    })
    });
});