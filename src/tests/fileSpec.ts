import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

describe('Test image processing via sharp', (): void => {
  it('succeeds to write resized resized file (existing file, valid size values)', async (): Promise<void> => {
    await File.createResized({ filename: 'fjord', width: '99', height: '99' });

    const resizedImagePath: string = path.resolve(
      File.imagesResizedPath,
      `fjord-99x99.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesResizedPath,
    'fjord-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    //
  }
});
