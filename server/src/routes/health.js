import { Router } from 'express';
import { sequelize } from '../models/index.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    await sequelize.query('SELECT 1');
    res.json({ ok: true, status: 'healthy', db: 'connected' });
  } catch (err) {
    res.status(500).json({ ok: false, status: 'unhealthy', error: String(err) });
  }
});

export default router;
