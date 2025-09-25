import { Router } from 'express';
import { Product } from '../models/index.js';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Product.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ ok: true, items });
});

router.post('/', async (req, res) => {
  const { name, price, stock } = req.body || {};
  if (!name) return res.status(400).json({ ok: false, message: 'name es requerido' });
  const item = await Product.create({
    name,
    price: Number(price) || 0,
    stock: Number(stock) || 0,
  });
  res.status(201).json({ ok: true, item });
});

export default router;
