import { BeforeAll } from '@cucumber/cucumber';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

BeforeAll(async function () {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  dotenv.config({
    path: path.resolve(
      __dirname,
      '..',
      '..',
      '.env',
      `.env.${process.env.NODE_ENV || 'development'}`,
    ),
  });
});
