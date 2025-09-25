import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, syncModels } from './models/index.js'; // ← única import
import authRouter from './routes/auth.js';
import healthRouter from './routes/health.js';
import productsRouter from './routes/products.js'; // si ya lo tienes

dotenv.config();

const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

app.use('/api/auth', authRouter);
app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter); // si aplica

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await syncModels(); // ← aquí
    console.log('DB conectado ✅');
    app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error al iniciar el server:', err);
    process.exit(1);
  }
}

start();
