import React,{ useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
      const [form, setForm] = useState({email:'',password:''});
      const [error, setError] = useState('');
      const navigate = useNavigate();

      const handleChange = (e) =>{
        setForm({ ...form, [e.target.name] : e.target.value });
      };
      const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('/auth/login',form);
            localStorage.setItem('token',res.data.data.token);
            alert('Login Successfully!');
            navigate('/dashboard');

        }
        catch(err){
             setError(err.response?.data?.message || 'Login Failed');
        }
      };

    return (
        <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
    );
};

export default LoginPage;