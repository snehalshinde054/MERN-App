import React,{ useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [ form,setForm ] = useState({name:'',email:'',password:'',role:'user'});
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
       setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('/auth/register',form);
            alert('registered Successfully!!');
            navigate('/login');
        }
        catch(err){
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} required /><br />
                <input name="email" placeholder="Email" onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
                 <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                 </select><br />
                <button type="submit">Register</button>
            </form>
    </div>
    );
}

export default RegisterPage;