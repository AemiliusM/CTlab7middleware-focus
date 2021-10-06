import { Router } from 'express';
import ProgJokeService from '../services/progJokeService.js';


export default Router()
  .get('/random', async(req, res, next) => {
    try {
      const joke = await ProgJokeService.getRandomSafeProgJoke();
      res.send(joke);
    } catch(err) {
      next(err);
    }
    
  })
  .get('/all', async(req, res, next) => {
    try {
      const joke = await ProgJokeService.getAllProgJokes();
      res.send(joke);
    }catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) =>{
    try{
      const id = req.params.id;
      const joke = await ProgJokeService.getJokeById(id);
      res.send(joke)
    }catch(err){
      next(err);
    }
  })
  
  .post('/', async(req, res, next) => {
    try {
      const joke = await ProgJokeService.createJoke(req.body);
      res.send(joke);
    } catch(err) {
      next(err);
    }

  })
  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const joke = await ProgJokeService.updateJoke(req.body, id);
      res.send(joke);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const noJoke = await ProgJokeService.deleteJoke(id);
      res.send(noJoke);
    }catch(err) {
      next(err);
    }
  });
