import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus, deleteTask } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth';
import { RequestHandler } from 'express';

const router = Router();
router.use(authMiddleware as RequestHandler);
router.post('/', createTask as RequestHandler);
router.get('/', getTasks);
router.patch('/:id/status', updateTaskStatus as RequestHandler);


router.delete('/:id', deleteTask as RequestHandler);

export default router;