import { Router } from 'express';
import { registerUser, login } from '../controllers/user.controller';

const router = Router();
router.post('/', (req, res, next) => {
  Promise.resolve(registerUser(req, res)).catch(next);
});
router.post('/login', (req, res, next) => {
  Promise.resolve(login(req, res)).catch(next);
});

export default router;