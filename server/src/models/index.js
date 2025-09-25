import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'db.sqlite'),
  logging: false,
});

import UserModel from './user.js';
export const User = UserModel(sequelize);

import ProductModel from './Product.js';
export const Product = ProductModel(sequelize);

export async function syncModels() {
  await sequelize.sync();
}
