import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?filename=fjord (valid args and without width and height)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord'
      );
      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=199&height=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=199&height=199'
      );
      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=-200&height=200'
      );

      expect(response.status).toBe(400);
    });

    it('gets /api/images (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(404);
    });
  });

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo');
      expect(response.status).toBe(404);
    });
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesResizedPath,
    'fjord-199x199.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    //
  }
});
