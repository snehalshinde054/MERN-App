const express= require('express');

const router = express.Router();

const employeeController=require('../controllers/employeeController');

const { protect, authorize } = require('../middlewares/authMiddleware');

const { body } = require('express-validator');

// view details route(admin+user)
router.get("/",protect,employeeController.employee_all);

router.get("/:id",protect,employeeController.employee_details);

// Create Employee API (admin)
router.post("",protect, authorize('admin'),
    [
    body('name').notEmpty().withMessage('Name is Required!'),
    body('position').notEmpty().withMessage('Postion is Required!'),
    body('dept').notEmpty().withMessage('Department is Required!')
],employeeController.employee_create);

router.put("/:id",protect,authorize('admin'),employeeController.employee_update);

router.delete("/:id",protect,authorize('admin'),employeeController.employee_delete);


module.exports= router;




