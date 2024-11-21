import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';

const router = Router();

router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', register);
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', login);
router.get('/logout', logout);

export default router;
