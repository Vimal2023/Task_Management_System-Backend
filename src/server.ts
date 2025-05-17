import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { startAutoCloseJob } from './jobs/autoCloseTasks';

dotenv.config();

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log('Connected to MongoDB');
  startAutoCloseJob();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});