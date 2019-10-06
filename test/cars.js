const expect = require('chai').expect;
const request = require('supertest');
const app = require('./../app');
const conn = require('../database/connection');


describe('Cars', () => {
    before((done) => {
        conn.connectToDb()
        .then(() => done())
        .catch(() => done())
    })
    after((done) => {
        conn.closeDbConnection()
        .then(() => done())
        .catch(() => done())
    })

    it('should add car correctly', (done) => {
        request.post('/api/v1/cars')
        .send({ brand: 'Toyota', price: 4699, model: 'Prius'})
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('brand');
            expect(body).to.contain.property('model');
            expect(body).to.contain.property('price');
            done();
        })
        .catch((error) => {
            done(error)
        })
    })
});

