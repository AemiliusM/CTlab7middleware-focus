import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets a random safe xmas joke from get /', async() => {
    return await request(app).get('/api/xmasjokes/random').then(res => {
      console.log(res.body);
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  it('posts joke to /api/xmasjokes', async() => {
    return await request(app)
      .post('/api/xmasjokes')
      .send({
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa walking backwards!' })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          category: 'Christmas',
          typeOf: 'twopart',
          setup: 'What says Oh Oh Oh?',
          delivery: 'Santa walking backwards!' });
      });
  });

  it('reads all jokes in /api/xmasjoke', async() => {
    await request(app).post('/api/xmasjokes')
      .send({
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa walking backwards!' });
    return await request(app)
      .get('/api/xmasjokes/all').then(res => {
        expect(res.body).toEqual([{ 
          id: '1',
          category: 'Christmas',
          typeOf: 'twopart',
          setup: 'What says Oh Oh Oh?',
          delivery: 'Santa walking backwards!' }]);
      });
  });

  

  it('updates a joke by id', async() => {
    await request(app).post('/api/xmasjokes')
      .send({
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa walking backwards!' });
    return await request(app).patch('/api/xmasjokes/1')
      .send({
        id:'1',
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa falling down stairs!' })
      .then(res => {
        expect(res.body).toEqual(
          { id: '1',
            category: 'Christmas',
            typeOf: 'twopart',
            setup: 'What says Oh Oh Oh?',
            delivery: 'Santa falling down stairs!' });
      });
  });
      
  it('gets a xmasjoke by id', async() => {
    await request(app).post('/api/xmasjokes')
      .send({
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa walking backwards!' });
    return await request(app).get('/api/xmasjokes/1').then(res => {
      expect(res.body).toEqual([{
        id: '1',
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa walking backwards!' }]);
    });    
    
  });    
  
    
  it('should delete a joke', async () => {
    await request(app).post('/api/xmasjokes')
      .send({
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa walking backwards!' });
    return request(app).delete('/api/xmasjokes/1').then(res => {
      expect(res.body).toEqual({
        id: '1',
        category: 'Christmas',
        typeOf: 'twopart',
        setup: 'What says Oh Oh Oh?',
        delivery: 'Santa walking backwards!' });
    });
  });


});
afterAll(() => {
  pool.end();
});



