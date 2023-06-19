const express= require('express');

const router = express.Router();

const Employee = require('./employee.js');

const ObjectId = require('mongoose').Types.ObjectId;

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

// GET paricular employee data API
router.get('/:id',(req,res)=>{

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

})
// Search employee API

// Update employee data API
router.put('/:id',(req,res)=>{

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

})


// Delete employee API
router.delete('/:id',(req,res)=>{

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

})

module.exports= router;