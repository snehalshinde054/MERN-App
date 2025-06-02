const express= require('express');

const router = express.Router();

const employeeController=require('../controllers/employeeController');

const { protect } = require('../middlewares/authMiddleware');

const { body } = require('express-validator');

router.get("/",protect,employeeController.employee_all);

router.get("/:id",protect,employeeController.employee_details);

// Create Employee API
router.post("",protect,[
    body('name').notEmpty().withMessage('Name is Required!'),
    body('position').notEmpty().withMessage('Postion is Required!'),
    body('dept').notEmpty().withMessage('Department is Required!')
],employeeController.employee_create);

router.put("/:id",protect,employeeController.employee_update);

router.delete("/:id",protect,employeeController.employee_delete);


module.exports= router;




