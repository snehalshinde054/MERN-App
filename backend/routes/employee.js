const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee management APIs
 */

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get("/", protect, employeeController.employee_all);

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Get employee details by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details
 */
router.get("/:id", protect, employeeController.employee_details);

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - dept
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               dept:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created
 */
router.post(
  "",
  protect,
  authorize('admin'),
  [
    body('name').notEmpty().withMessage('Name is Required!'),
    body('position').notEmpty().withMessage('Position is Required!'),
    body('dept').notEmpty().withMessage('Department is Required!')
  ],
  employeeController.employee_create
);

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               dept:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated
 */
router.put("/:id", protect, authorize('admin'), employeeController.employee_update);

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted
 */
router.delete("/:id", protect, authorize('admin'), employeeController.employee_delete);

module.exports = router;
