require('ts-node/register'); // Permite cargar archivos TS en tiempo real
const configs = require('../configs.ts');

export const username = configs.DB_USERNAME;
export const password = configs.DB_PASSWORD;
export const database = configs.DB_DATABASE;
export const host = configs.DB_HOST;
export const dialect = 'postgres';
export const port = 5432;
