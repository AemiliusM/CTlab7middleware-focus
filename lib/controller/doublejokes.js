import { Router } from 'express';
import DoubleJokeService from '../services/doubleJokeServices.js';


export default Router()
  .get('/random', async(req, res, next) => {
    console.log('we hit controler');
    try {
      const joke = await DoubleJokeService.getRandomDoubleSafeJoke();
      res.send(joke);
    } catch(err) {
      next(err);
    }
      
  })
  .get('/all', async(req, res, next) => {
    try {
      const joke = await DoubleJokeService.getAllJokes();
      res.send(joke);
    }catch(err) {
      next(err);
    }
  })

  .post('/', async(req, res, next) => {
    try {
      const joke = await DoubleJokeService.createJoke(req.body);
      res.send(joke);
    } catch(err) {
      next(err);
    }

  })
  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const joke = await DoubleJokeService.updateJoke(req.body, id);
      res.send(joke);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const noJoke = await DoubleJokeService.deleteJoke(id);
      res.send(noJoke);
    }catch(err) {
      next(err);
    }
  });

