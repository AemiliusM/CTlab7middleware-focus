import { Router } from 'express';
import JokeService from '../services/JokeServices.js';

export default Router().get('/', async(req, res, next) => {
  try {
    const joke = await JokeService.getRandomSafeJoke();
    res.send(joke);
  } catch(err) {
    next(err);
  }

})

  .post('/', async(req, res, next) => {
    try {
      const joke = JokeService.createJoke();
      res.send(joke);
    } catch(err) {
      next(err);
    }
  });

