import { Request, Response } from 'express';
import { Task } from '../models/task';
import { User } from '../models/user';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const existingTask = await Task.findOne({ title, userId });
    if (existingTask) return res.status(400).json({ error: 'Task with this title already exists' });
    const task = await Task.create({ title, description, userId, status: 'pending' });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.status = status;
    if (status === 'done') task.completedAt = new Date();
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};