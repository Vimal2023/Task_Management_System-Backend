import mongoose, { Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'done';
  userId: mongoose.Types.ObjectId;
  completedAt?: Date;
  createdAt: Date;
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'done'],
    default: 'pending',
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model<ITask>('Task', taskSchema);