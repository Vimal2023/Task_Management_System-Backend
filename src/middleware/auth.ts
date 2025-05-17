import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authMiddleware  = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};