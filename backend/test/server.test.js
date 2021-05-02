//import module
import * as request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// const request = require('supertest');
// require('../server.js');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// setting up database connection before unit testing
beforeEach((done) => {
  // using env config
  dotenv.config();
  mongoose.connect(process.env.TEST_URL, { useNewUrlParser: true }, () =>
    done()
  );
});

// closing the database connection after testing
afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
describe('GET /api/v1/restaurants', () => {
  it('respond with status code 200', async (done) => {
    request(app)
      .get('/api/v1/restaurants')
      .except(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
      });
  });
});
