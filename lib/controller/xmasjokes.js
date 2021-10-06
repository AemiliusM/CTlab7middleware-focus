import { Router } from 'express';
import XmasJokeService from '../services/XmasJokeServices.js';


export default Router()
  .get('/random', async(req, res, next) => {
    try {
      const joke = await XmasJokeService.getRandomXmasSafeJoke();
      res.send(joke);
    } catch(err) {
      next(err);
    }
      
  })
  .get('/all', async(req, res, next) => {
    try {
      const joke = await XmasJokeService.getAllJokes();
      res.send(joke);
    }catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    try{
      const id = req.params.id;
      const joke = await XmasJokeService.getJokeById(id);
      res.send(joke);
    }catch(err){
      next(err);
    }
  })

  .post('/', async(req, res, next) => {
    try {
      const joke = await XmasJokeService.createJoke(req.body);
      res.send(joke);
    } catch(err) {
      next(err);
    }

  })
  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const joke = await XmasJokeService.updateJoke(req.body, id);
      res.send(joke);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const noJoke = await XmasJokeService.deleteJoke(id);
      res.send(noJoke);
    }catch(err) {
      next(err);
    }
  });

