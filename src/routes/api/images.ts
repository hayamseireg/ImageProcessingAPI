import express from 'express';
import File from './../../file';
import {
  validateDimensions,
  isImagesExists
} from './../../middlewares/queriesValidation';

const images = express.Router();
images.use([validateDimensions, isImagesExists]);

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    if (!(await File.isResizedAvailable(request.query))) {
      await File.createResized(request.query);
    }

    const path: null | string = await File.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('Please pass the fileName');
    }
  }
);

export default images;
