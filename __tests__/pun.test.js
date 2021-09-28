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
        category: 'Pun',
        typeOf: 'twopart',
        setup: 'What do you call a witch at the beach?',
        delivery: 'A Sandwich.', })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          category: 'Pun',
          typeOf: 'twopart',
          setup: 'What do you call a witch at the beach?',
          delivery: 'A Sandwich.' });
      });
  });

  it('reads all jokes in /api/punnyjoke', async() => {
    await request(app).post('/api/punnyjokes')
      .send({
        category: 'Pun',
        typeOf: 'twopart',
        setup: 'What do you call a witch at the beach?',
        delivery: 'A Sandwich.' });
    return await request(app)
      .get('/api/punnyjokes/all').then(res => {
        expect(res.body).toEqual([{ 
          id: '1',
          category: 'Pun',
          typeOf: 'twopart',
          setup: 'What do you call a witch at the beach?',
          delivery: 'A Sandwich.' }]);
      });
  });

  it('updates a joke by id', async() => {
    await request(app).post('/api/punnyjokes')
      .send({
        category: 'Programming',
        typeOf: 'twopart',
        setup: 'A web developer walks into a restaurant.',
        delivery: 'He immediately leaves in disgust as the restaurant was laid out in tables.' });
    return await request(app).patch('/api/punnyjokes/1')
      .send({
        id:'1',
        category: 'Programming',
        typeOf: 'twopart', 
        setup: 'A web developer team walks into a restaurant.',
        delivery: 'They immediately leave in anger as the restaurant could not join tables.' 
      }).then(res => {
        expect(res.body).toEqual(
          { id: '1',
            category: 'Programming',
            typeOf: 'twopart',
            setup: 'A web developer team walks into a restaurant.',
            delivery: 'They immediately leave in anger as the restaurant could not join tables.' });
      });
  });
      
//   it('should delete a joke', async () => {
//     await request(app).post('/api/doublejokes')
//       .send({
//         category: 'Programming',
//         typeOf: 'twopart',
//         setup: 'A web developer team walks into a restaurant.',
//         delivery: 'They immediately leave in anger as the restaurant could not join tables.' });
//     return request(app).delete('/api/doublejokes/1').then(res => {
//       expect(res.body).toEqual({
//         id: '1',
//         category: 'Programming',
//         typeOf: 'twopart',
//         setup: 'A web developer team walks into a restaurant.',
//         delivery: 'They immediately leave in anger as the restaurant could not join tables.' });
//     });
//   });
});


afterAll(() => {
  pool.end();
});
