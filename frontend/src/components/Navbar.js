import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return (
         <nav style={{ padding: '10px', background: '#eee' }}>
         <Link to="/" style={{ marginRight: '10px' }}>Employee List</Link>
         <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
         <Link to="/register">Register</Link>
    </nav>
    );
}

export default Navbar;