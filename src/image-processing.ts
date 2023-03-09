import sharp from 'sharp';
import { sharpResizeParams } from './interfaces/sharpResizeParams';

const processImage = async (params: sharpResizeParams): Promise<void> => {
  await sharp(params.source)
    .resize(params.width, params.height)
    .toFormat('jpeg')
    .toFile(params.target);
};

export default processImage;
