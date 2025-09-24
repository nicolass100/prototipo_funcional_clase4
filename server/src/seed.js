import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { sequelize, User } from './models/index.js';

dotenv.config();

async function seed() {
  try {
    await sequelize.sync();
    const email = 'admin@demo.com';
    const plain = '123456';
    const exist = await User.findOne({ where: { email } });
    if (!exist) {
      const passwordHash = await bcrypt.hash(plain, 10);
      await User.create({ email, name: 'Admin Demo', passwordHash, role: 'admin' });
      console.log('Usuario admin creado:', email, ' / pass:', plain);
    } else {
      console.log('Usuario admin ya existe:', email);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error en seed:', err);
    process.exit(1);
  }
}

seed();
