const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name : {type: String, required: true, trim: true },
    position: {type: String, required: true, trim: true },
    dept: {type: String, required: true, trim: true }

});
 
module.exports = mongoose.model('Employee',EmployeeSchema);