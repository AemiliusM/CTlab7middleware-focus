import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import singleJokes from './controller/singlejokes.js';
import doublejokes from './controller/doublejokes.js';

const app = express();

app.use(express.json());

app.use('/api/singlejokes', singleJokes);
app.use('/api/doublejokes', doublejokes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
