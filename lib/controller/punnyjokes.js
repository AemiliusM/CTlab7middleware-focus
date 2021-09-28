import { Router } from 'express';
import PunService from '../services/punService.js';


export default Router()
  .get('/random', async(req, res, next) => {
    try {
      const pun = await PunService.getRandomSafePun();
      res.send(pun);
    } catch(err) {
      next(err);
    }
    
  })
  .get('/all', async(req, res, next) => {
    try {
      const pun = await PunService.getAllPun();
      res.send(pun);
    }catch(err) {
      next(err);
    }
  })
  
  .post('/', async(req, res, next) => {
    try {
      const pun = await PunService.createPun(req.body);
      console.log('PUN', pun);
      res.send(pun);
    } catch(err) {
      next(err);
    }

  })
  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const pun = await PunService.updatePun(req.body, id);
      res.send(pun);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      res.send(noPun);
      const noPun = await PunService.deletePun(id);
    }catch(err) {
      next(err);
    }
  });
