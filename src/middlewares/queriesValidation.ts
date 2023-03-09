import { Request, Response, NextFunction } from 'express';
import File from '../file';

export const isImagesExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { filename } = req.query;
  if (!(await File.isImageAvailable(filename as string))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(', ');
    res
      .status(404)
      .send(
        `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`
      );
  } else {
    next();
  }
};

export const validateDimensions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { width, height } = req.query;
  let error = false;
  if (!width && !height) {
    next();
    return;
  }

  const widthInt = parseInt(width as string);
  const heightInt = parseInt(height as string);

  if (Number.isNaN(widthInt) || widthInt < 1) {
    res
      .status(400)
      .send("Please provide a positive numerical value for the 'width'.");
    error = true;
    return;
  }
  if (Number.isNaN(heightInt) || heightInt < 1) {
    res
      .status(400)
      .send("Please provide a positive numerical value for the 'height'.");
    error = true;
    return;
  }
  if (!error) {
    next();
  }
};
