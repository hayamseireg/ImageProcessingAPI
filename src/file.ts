import { promises as fs } from 'fs';
import path from 'path';
import processImage from './image-processing';
import { imageQuery } from './interfaces/imageQuery';

export default class File {
  static imagesFullPath = path.resolve(__dirname, '../images');
  static imagesResizedPath = path.resolve(__dirname, '../images/resized');

  static async getImagePath(params: imageQuery): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    const filePath: string =
      params.width && params.height
        ? path.resolve(
            File.imagesResizedPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(File.imagesFullPath, `${params.filename}.jpg`);

    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  static async isImageAvailable(filename: string): Promise<boolean> {
    return (await File.getAvailableImageNames()).includes(filename);
  }

  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesFullPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
    } catch {
      return [];
    }
  }

  static async isResizedAvailable(params: imageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false;
    }

    const filePath: string = path.resolve(
      File.imagesResizedPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async createResizedPath(): Promise<void> {
    try {
      await fs.access(File.imagesResizedPath);
    } catch {
      fs.mkdir(File.imagesResizedPath);
    }
  }

  static async createResized(params: imageQuery): Promise<void> {
    if (!params.filename || !params.width || !params.height) {
      return;
    }

    const filePathFull: string = path.resolve(
      File.imagesFullPath,
      `${params.filename}.jpg`
    );
    const filePathResized: string = path.resolve(
      File.imagesResizedPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );
    console.log(`Creating resized ${filePathResized}`);
    await processImage({
      source: filePathFull,
      target: filePathResized,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}
