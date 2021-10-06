import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets a random safe pun from get /', async() => {
    return await request(app).get('/api/punnyjokes/random').then(res => {
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  it('posts a pun to /api/punnyjokes', async() => {
    return await request(app)
      .post('/api/punnyjokes')
      .send({
        category: "Pun",
        typeOf: 'single',
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!" })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!" });
      });
  });

  it('reads all jokes in /api/punnyjoke', async() => {
    await request(app).post('/api/punnyjokes')
      .send({
        category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!" });
    return await request(app)
      .get('/api/punnyjokes/all').then(res => {
        expect(res.body).toEqual([{ 
          id: '1',
          category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!" }]);
      });
  });

  it('gets a joke by id', async() => {
    await request(app).post('/api/punnyjokes')
      .send({
        category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!" });
    return await request(app).get('/api/punnyjokes/1').then(res => {
      expect(res.body).toEqual({
        id: '1',
        category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!" })
    });    
    
  });

  it('updates a joke by id', async() => {
    await request(app).post('/api/punnyjokes')
      .send({
        category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!" });
    return await request(app).patch('/api/punnyjokes/1')
      .send({
        id:'1',
        category: "Pun",
        typeOf: "single",
        joke: "I'm trying to read a book about gravity but, It's impossible to pick up!" 
      }).then(res => {
        expect(res.body).toEqual(
          { id: '1',
          category: "Pun",
          typeOf: "single",
          joke: "I'm trying to read a book about gravity but, It's impossible to pick up!"  });
      });
  });
      
  it('should delete a joke', async () => {
    await request(app).post('/api/punnyjokes')
      .send({
        category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!"  });
    return request(app).delete('/api/punnyjokes/1').then(res => {
      expect(res.body).toEqual({
        id: '1',
        category: "Pun",
        typeOf: "single",
        joke: "I'm reading a book about anti-gravity. It's impossible to put down!"  });
    });
  });
});


afterAll(() => {
  pool.end();
});
