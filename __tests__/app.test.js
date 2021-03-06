import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets a random single safe joke from get /', async() => {
    return await request(app).get('/api/singlejokes').then(res => {
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  it('posts joke to /api/singlejoke', async() => {
    return await request(app)
      .post('/api/singlejokes')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          category: 'Programming',
          typeOf: 'single',
          joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
      });
  });

  it('reads all jokes in /api/singlejoke', async() => {
    await request(app).post('/api/singlejokes')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
    return await request(app)
      .get('/api/singlejokes/all').then(res => {
        expect(res.body).toEqual([{ id: '1',
          category: 'Programming',
          typeOf: 'single',
          joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' }]);
      });
  });

  it('gets a joke by id', async() => {
    await request(app).post('/api/singlejokes')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
    return await request(app).get('/api/singlejokes/1').then(res => {
      expect(res.body).toEqual([{
        id: '1',
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' }])
    });    
    
  });

  it('updates a joke by id', async() => {
    await request(app).post('/api/singlejokes')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
    return await request(app).patch('/api/singlejokes/1')
      .send({
        id:'1',
        category: 'Programming',
        typeOf: 'single',
        joke: 'HAHAHAHA'
      }).then(res => {
        expect(res.body).toEqual(
          { id: '1',
            category: 'Programming',
            typeOf: 'single',
            joke: 'HAHAHAHA' }
        );
      });
      
      
  });
    
  it('should delete a joke', async () => {
    await request(app).post('/api/singlejokes')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
    return request(app).delete('/api/singlejokes/1').then(res => {
      expect(res.body).toEqual({
        id: '1',
        category: 'Programming',
        typeOf: 'single',
        joke: '"Honey, go to the store and buy some eggs."\n"OK."\n"Oh and while you\'re there, get some milk."\n"He never returned."' });
    });
  });


  afterAll(() => {
    pool.end();
  });
});


