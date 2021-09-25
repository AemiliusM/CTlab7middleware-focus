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

  })
  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const joke = await JokeService.updateJoke(req.body, id);
      res.send(joke);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const noJoke = await JokeService.deleteJoke(id);
      console.log(noJoke);
      res.send(noJoke);
    }catch(err) {
      next(err);
    }
  });

