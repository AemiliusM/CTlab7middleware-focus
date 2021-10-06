import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets a random safe programming joke from get /', async() => {
    return await request(app).get('/api/programmingjokes/random').then(res => {
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  it('posts a joke to /api/programmingjokes', async() => {
    return await request(app)
      .post('/api/programmingjokes')
      .send({
        category: 'Programming',
        typeOf: 'single',
        joke: '// This line doesnt actually do anything, but the code stops working when I delete it.', })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          id: '1',
          category: 'Programming',
          typeOf: 'single',
          joke: '// This line doesnt actually do anything, but the code stops working when I delete it.'
        });
      });
  });

  //   it('reads all jokes in /api/programmingjokes', async() => {
  //     await request(app).post('/api/programmingjokes')
  //       .send({
  //         category: 'Pun',
  //         typeOf: 'twopart',
  //         setup: 'What do you call a witch at the beach?',
  //         delivery: 'A Sandwich.' });
  //     return await request(app)
  //       .get('/api/programmingjokes/all').then(res => {
  //         expect(res.body).toEqual([{ 
  //           id: '1',
  //           category: 'Pun',
  //           typeOf: 'twopart',
  //           setup: 'What do you call a witch at the beach?',
  //           delivery: 'A Sandwich.' }]);
  //       });
  //   });

  //   it('updates a joke by id', async() => {
  //     await request(app).post('/api/programmingjokes')
  //       .send({
  //         category: 'Pun',
  //         typeOf: 'twopart',
  //         setup: 'What do you call a witch at the beach?',
  //         delivery: 'A Sandwich.' });
  //     return await request(app).patch('/api/programmingjokes/1')
  //       .send({
  //         id:'1',
  //         category: 'Pun',
  //         typeOf: 'twopart',
  //         setup: 'Did you hear about the cheese factory that exploded in France?',
  //         delivery: 'There was nothing but de brie.' 
  //       }).then(res => {
  //         expect(res.body).toEqual(
  //           { id: '1',
  //             category: 'Pun',
  //             typeOf: 'twopart',
  //             setup: 'Did you hear about the cheese factory that exploded in France?',
  //             delivery: 'There was nothing but de brie.' });
  //       });
  //   });
      
//   it('should delete a joke', async () => {
//     await request(app).post('/api/programmingjokes')
//       .send({
//         category: 'Pun',
//         typeOf: 'twopart',
//         setup: 'Did you hear about the cheese factory that exploded in France?',
//         delivery: 'There was nothing but de brie.' });
//     return request(app).delete('/api/programmingjokes/1').then(res => {
//       expect(res.body).toEqual({
//         id: '1',
//         category: 'Pun',
//         typeOf: 'twopart',
//         setup: 'Did you hear about the cheese factory that exploded in France?',
//         delivery: 'There was nothing but de brie.' });
//     });
//   });
});


afterAll(() => {
  pool.end();
});
