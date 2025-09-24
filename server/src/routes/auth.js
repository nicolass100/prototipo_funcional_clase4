import { Router } from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Email y password son requeridos' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'demo', { expiresIn: '1h' });
    return res.json({
      ok: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Error interno' });
  }
});

export default router;
