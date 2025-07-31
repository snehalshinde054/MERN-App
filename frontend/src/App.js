import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';

function App() {
  return (
        <Router>
          <Navbar />
          <Routes> 
            <Route path='/' element={<PrivateRoute>< EmployeeList /></PrivateRoute>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={< RegisterPage />} />
            <Route path='/dashboard' element={< Dashboard />} />
            <Route path='/employee/add' element={< EmployeeForm />} />
            <Route path='/employee/edit/:id' element={< EmployeeForm />} />
          </Routes>
        </Router>
  );
}

export default App;
