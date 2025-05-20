const Employee = require("../models/employee");

const ObjectId = require('mongoose').Types.ObjectId;

const { validationResult } = require('express-validator');

const asyncHandler = require('../utils/asyncHandler');

// get all employee
const employee_all= asyncHandler(async (req,res,next) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                status : false,
                message : 'Validation Failed',
                error : error.array(),
            });
        }

        const employeeList = await Employee.find();
        res.json({success: true, data: employeeList});

});

// get employee details by id
const employee_details = asyncHandler(async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: `Invalid ID ${req.params.id}` });
    }
  
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: `Employee not found with ID ${req.params.id}` });
    }
  
    res.json({ success: true, data: employee });
  });

// create new employee
const employee_create= asyncHandler(async (req,res,next) => {

        const emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        });
        await emp.save();
        res.status(201).json({success: true, data: emp });

});

// update employee details
const employee_update = asyncHandler(async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: `Invalid ID ${req.params.id}` });
    }
  
    const updateData = {
      name: req.body.name,
      position: req.body.position,
      dept: req.body.dept
    };
  
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: `Employee not found with ID ${req.params.id}` });
    }
  
    res.json({ success: true, data: updatedEmployee });
  });

// delete employee
const employee_delete = asyncHandler(async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: `Invalid ID ${req.params.id}` });
    }
  
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: `Employee not found with ID ${req.params.id}` });
    }
  
    res.json({ success: true, data: deletedEmployee });
  });

module.exports = {
    employee_all,
    employee_details,
    employee_create,
    employee_update,
    employee_delete
};