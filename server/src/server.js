import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRouter from './routes/auth.js';
import healthRouter from './routes/health.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

app.use('/api/auth', authRouter);
app.use('/api/health', healthRouter);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB conectado ✅');
    app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error al iniciar el server:', err);
    process.exit(1);
  }
}

start();
