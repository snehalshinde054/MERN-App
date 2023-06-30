const express= require('express');

const router = express.Router();

const employeeController=require('../controllers/employeeController');

router.get("/",employeeController.employee_all);
router.get("/:id",employeeController.employee_details);
router.post("",employeeController.employee_create);
router.put("/:id",employeeController.employee_update);
router.delete("/:id",employeeController.employee_delete);


module.exports= router;
