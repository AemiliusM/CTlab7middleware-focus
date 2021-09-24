import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets a random safe joke from get /', async() => {
    return await request(app).get('/api/joke').then(res => {
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  it('posts joke to /api/joke', async() => {
    return await request(app)
      .post('/api/joke')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          category: 'Programming',
          typeOf: 'single',
          setup: null,
          delivery: null,
          joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
      });
  });

  it('reads all jokes in /api/joke', async() => {
    await request(app).post('/api/joke')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
    return await request(app)
      .get('/api/joke').then(res => {
        expect(res.body).toEqual({ id: '1',
          category: 'Programming',
          typeOf: 'single',
          setup: null,
          delivery: null,
          joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
      });
  });


  afterAll(() => {
    pool.end();
  });
});


