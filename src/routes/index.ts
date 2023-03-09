import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get('/', (_req: express.Request, response: express.Response): void => {
  response.send(
    '<a href="/api/images">/api/images</a><br/><a href="/api/images?filename=fjord">/api/images?filename=fjord</a><br/><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a>'
  );
});

export default routes;
