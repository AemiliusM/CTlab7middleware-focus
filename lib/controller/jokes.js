import { Router } from 'express';
import JokeService from '../services/JokeServices.js';


export default Router()
  .get('/all', async(req, res, next) => {
    try {
      const joke = await JokeService.getRandomSafeJoke();
      res.send(joke);
    } catch(err) {
      next(err);
    }
      
  })
  .get('/', async(req, res, next) => {
    try {
      const joke = await JokeService.getAllJokes();
      res.send(joke);
    }catch(err) {
      next(err);
    }
  })

  .post('/', async(req, res, next) => {
    try {
      const joke = await JokeService.createJoke(req.body);
      res.send(joke);
    } catch(err) {
      next(err);
    }
  });

