import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

export default app;