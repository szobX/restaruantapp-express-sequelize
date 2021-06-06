process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://127.0.0.1:3005"
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('Menu', () => {

    // /api/menus test

    describe('/GET menus basic test', () => {

        // check if /api/menus works correctly

        it('it should GET all positions in menu', (done) => {
          chai.request(server)
              .get('/api/menu')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                done();
              });
        });

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
    });
});