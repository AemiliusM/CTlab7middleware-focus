import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import singleJokes from './controller/singlejokes.js';
import doublejokes from './controller/doublejokes.js';
import punnyjokes from './controller/punnyjokes.js';
import programming from './controller/programmingjokes.js';

const app = express();

app.use(express.json());

app.use('/api/singlejokes', singleJokes);
app.use('/api/doublejokes', doublejokes);
app.use('/api/punnyjokes', punnyjokes);
app.use('/api/programmingjokes', programming);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
