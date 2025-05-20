const express= require('express');

const router = express.Router();

const employeeController=require('../controllers/employeeController');

const { body } = require('express-validator');

router.get("/",employeeController.employee_all);

router.get("/:id",employeeController.employee_details);

// Create Employee API
router.post("",[
    body('name').notEmpty().withMessage('Name is Required!'),
    body('position').notEmpty().withMessage('Postion is Required!'),
    body('dept').notEmpty().withMessage('Department is Required!')
],employeeController.employee_create);

router.put("/:id",employeeController.employee_update);

router.delete("/:id",employeeController.employee_delete);


module.exports= router;




