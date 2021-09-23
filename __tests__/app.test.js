import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import fetchJokeAPI from '../lib/utils/jokeAPI.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets a random safe joke from get /', async() => {
    return await request(app).get(fetchJokeAPI()).then(res => {
      expect(res.body).toEqual(null);
    });
  });

  afterAll(() => {
    pool.end();
  });
});
