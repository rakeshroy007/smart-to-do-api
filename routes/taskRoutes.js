import express from 'express';
import protectRoutes from '../middleware/protectRoutes.js';
import { getTasks, createTask, updateTask, deleteTask, } from '../controllers/taskController.js';
import { createTaskValidation, updateTaskValidation } from '../utils/validators.js';
import verifyTaskOwnership from '../middleware/taskOwnership.js';


const router = express.Router();

// Below all routes require authentication...

// Create task and get all tasks
router.route('/')
    .get(protectRoutes, getTasks)
    .post(protectRoutes, createTaskValidation, createTask)


// Update and delete specific task (requires ownership)
router.route('/:id')
    .put(protectRoutes, verifyTaskOwnership, updateTaskValidation, updateTask)
    .delete(protectRoutes, verifyTaskOwnership, deleteTask)


export default router;