import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets a random double safe joke from get /', async() => {
    return await request(app).get('/api/doublejokes/random').then(res => {
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  it('posts joke to /api/doublejokes', async() => {
    return await request(app)
      .post('/api/doublejokes')
      .send({
        category: 'Programming',
        typeOf: 'twopart',
        setup: 'A web developer walks into a restaurant.',
        delivery: 'He immediately leaves in disgust as the restaurant was laid out in tables.' })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          category: 'Programming',
          typeOf: 'twopart',
          setup: 'A web developer walks into a restaurant.',
          delivery: 'He immediately leaves in disgust as the restaurant was laid out in tables.' });
      });
  });

  //   it('reads all jokes in /api/singlejoke', async() => {
  //     await request(app).post('/api/doublejokes')
  //       .send({
  //         category: 'Programming',
  //         typeOf: 'twopart' });
  //     return await request(app)
  //       .get('/api/doublejokes').then(res => {
  //         expect(res.body).toEqual([{ id: '1',
  //           category: 'Programming',
  //           typeOf: 'twopart' }]);
  //       });
  //   });

  //   it('updates a joke by id', async() => {
  //     await request(app).post('/api/doublejokes')
  //       .send({
  //         category: 'Programming',
  //         typeOf: 'twopart' });
  //     return await request(app).patch('/api/doublejokes/1')
  //       .send({
  //         id:'1',
  //         category: 'Programming',
  //         typeOf: 'twopart' });
  //   }).then(res => {
  //     expect(res.body).toEqual(
  //       { id: '1',
  //         category: 'Programming',
  //         typeOf: 'twopart' });
  //   });
  // });
      
      
  
    
// it('should delete a joke', async () => {
//   await request(app).post('/api/doublejokes')
//     .send({
//       category: 'Programming',
//       typeOf: 'twopart' });
//   return request(app).delete('/api/doublejokes/1').then(res => {
//     expect(res.body).toEqual({
//       id: '1',
//       category: 'Programming',
//       typeOf: 'twopart' });
//   });
});


afterAll(() => {
  pool.end();
});



