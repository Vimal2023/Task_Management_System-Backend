import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/user';
import { Task } from '../models/task';
import jwt from 'jsonwebtoken';

describe('POST /tasks', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
  });

  it('should create a task with valid token', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

    const response = await supertest(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Test Description',
        userId: user._id,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Task');
    expect(response.body.status).toBe('pending');
  });

  it('should return 401 without token', async () => {
    const response = await supertest(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description',
        userId: '123',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('No token provided');
  });
});