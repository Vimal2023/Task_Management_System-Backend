// User-related API logic (register, login)
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};