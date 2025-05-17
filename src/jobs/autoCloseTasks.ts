import cron from 'node-cron';
import { Task } from '../models/task';

export const startAutoCloseJob = () => {
  cron.schedule('*/10 * * * *', async () => {
    console.log('Running auto-close job');
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    await Task.updateMany(
      { status: 'in-progress', createdAt: { $lt: twoHoursAgo } },
      { status: 'done', completedAt: new Date() }
    );
  });
};