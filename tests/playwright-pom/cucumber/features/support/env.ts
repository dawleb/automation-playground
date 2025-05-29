import path from 'path';
import dotenv from 'dotenv';

// const authFile = path.join(__dirname, '../.auth/user.json');
// const authFile = path.join(__dirname, '..', '.auth', 'user.json');

import { fileURLToPath } from 'url';
// import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '.env', `.env.${process.env.NODE_ENV || 'development'}`),
});

console.log('ENV LOADED: MY_VAR =', process.env.MY_VAR);
