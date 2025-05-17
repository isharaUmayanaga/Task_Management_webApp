
const express = require('express');
const { check } = require('express-validator');
const taskController = require('../controllers/taskController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Get all tasks
router.get('/', taskController.getTasks);

// Get task by ID
router.get('/:id', taskController.getTaskById);

// Create task
router.post(
  '/',
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('deadline', 'Valid deadline is required').isISO8601().toDate(),
    check('assignedTo', 'Assigned To is required').notEmpty(),
    check('status', 'Status must be Pending, In Progress, or Done').isIn(['Pending', 'In Progress', 'Done'])
  ],
  taskController.createTask
);

// Update task
router.put(
  '/:id',
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('deadline', 'Valid deadline is required').isISO8601().toDate(),
    check('assignedTo', 'Assigned To is required').notEmpty(),
    check('status', 'Status must be Pending, In Progress, or Done').isIn(['Pending', 'In Progress', 'Done'])
  ],
  taskController.updateTask
);

// Delete task
router.delete('/:id', taskController.deleteTask);

// Generate PDF report
router.get('/report/pdf', taskController.generatePDF);

module.exports = router;
