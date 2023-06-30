const Employee = require("../models/Employee");

const ObjectId = require('mongoose').Types.ObjectId;

// get all employee
const employee_all= async (req,res) => {
    try{
        const employeeList = await Employee.find();
        res.json(employeeList);
    }catch(err) {
        res.json({message:err });
    }

};

// get employee details
const employee_details= async (req,res) => {
    (async () => {
        try {
            if(ObjectId.isValid(req.params.id)){
                const result = await Employee.findById(req.params.id);
                res.json(result);
            }
            else
            {
                return res.status(400).send(`No record found with ID ${req.params.id}`);
            }
        } catch (err) {
            res.json({message:err });
        }
      })();
};

// create new employee
const employee_create= async (req,res) => {
    try{
        const emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        });
        emp.save();
        res.send(req.body);

    }catch(err) {
        res.json({message:err });
    }
};

// update employee details
const employee_update= async (req,res) => {
    (async () => {
        try {
           
            if(ObjectId.isValid(req.params.id)){
                let emp={
                    name: req.body.name,
                    position:req.body.position,
                    dept:req.body.dept
                };

                const result = await Employee.findByIdAndUpdate(req.params.id,emp);
                res.json(emp);
            }
            else
            {
                return res.status(400).send(`No record found with ID ${req.params.id}`);
            }
        } catch (err) {
            res.json({message:err });
        }
      })();
};

// delete employee
const employee_delete= async (req,res) => {
    (async () => {
        try {
            if(ObjectId.isValid(req.params.id)){
                const result = await Employee.findByIdAndDelete(req.params.id);
                res.json(result);
            }
            else
            {
                return res.status(400).send(`No record found with ID ${req.params.id}`);
            }
        } catch (err) {
            res.json({message:err });
        }
      })();

};

module.exports = {
    employee_all,
    employee_details,
    employee_create,
    employee_update,
    employee_delete
};