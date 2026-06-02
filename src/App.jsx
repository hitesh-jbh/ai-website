import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Register from './login/Register';
import ForgotPassword from './login/Forget';
import ResetPassword from './login/Reset';
import Dashboard from './Home/Home';
import SearchPage from './Search/Search';
import ManageSubscriptions from './Subscription/Subscription';
import './App.css';

function App() {
  const [hasPlan, setHasPlan] = useState(false);

  const handlePlanActivation = (planId) => {
    console.log(`Plan activated: ${planId}`);
    setHasPlan(true); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Dashboard />} />
        
          <Route 
          path="/search" 
          element={hasPlan ? <SearchPage onChangePlan={() => setHasPlan(false)} /> : <Navigate to="/subscriptions" replace />} 
        />
        
        <Route 
          path="/subscriptions" 
          element={
            hasPlan ? (
              <Navigate to="/search" replace />
            ) : (
              <ManageSubscriptions onPlanSelect={handlePlanActivation} />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;