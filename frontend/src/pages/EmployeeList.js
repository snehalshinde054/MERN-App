import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../services/employeeService";

const EmployeeList = () =>{
    const [ employees, setEmployees ] = useState([]);
    const [ loading, setLoading ] = useState(true);

     useEffect(() =>{
        const fetchEmployees = async () =>{
            try{
                const data = await getAllEmployees();
                setEmployees(data);
            }
            catch(error){
                  console.error('Error while fetching employees', error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchEmployees();
     },[]);

     if(loading) return <p>loading employees....</p>
    return (
        <div>
            <h2>Employee List </h2>
            {employees.length === 0 ? (<p>No employee  found...</p>) : (
                 <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
                <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.dept}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
             </tbody>
        </table>
    )}
        </div>
    );
};

export default EmployeeList;