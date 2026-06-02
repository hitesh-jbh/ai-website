import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './login/Register';
import ForgotPassword from './login/Forget';
import ResetPassword from './login/Reset';
import Dashboard from './Home/Home'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;