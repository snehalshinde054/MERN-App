const express= require('express');

const router = express.Router();

const Employee = require('./employee.js');

// GET API
router.get('/',async (req,res) =>{
    
    try{
        const employeeList = await Employee.find();
        res.json(employeeList);
    }catch(err) {
        res.json({message:err });
    }

});

//POST API
router.post('/',async (req,res)=>{
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
});

module.exports= router;