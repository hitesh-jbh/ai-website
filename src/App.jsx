import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { getAccessToken } from './auth/tokenStorage';
import { getCurrentSubscriptionStatus } from './api/subscription';
import Login from './login/Login';
import Register from './login/Register';
import ForgotPassword from './login/Forget';
import ResetPassword from './login/Reset';
import Dashboard from './Home/Home';
import SearchPage from './Search/SearchPage';
import ChatPage from './Search/ChatPage';
import ManageSubscriptions from './Subscription/Subscription';
import Leaderboard from './Leaderboard/Leaderboard';
import VaultsPage from './Vault/Vault';

import OptionsPage from './Options/Options';
import EditProfile from './Options/Edit';
import ContactPage from './Options/Contact';
import HelpSupportPage from './Options/Support';
import WalletPage from './Options/Wallet';
import RewardsPage from './Options/Reward';

import './App.css';
import AddResource from './Home/AdSense/AdSense';
import AdSlot from './Home/AdSense/AdRender';

function App() {
  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      if (!getAccessToken()) {
        setHasPlan(false);
        return;
      }
      getCurrentSubscriptionStatus()
        .then((data) => {
          // 1. Log the data so you can see exactly what your backend returns
          console.log("Backend Plan Data:", data); 

          
          const hasAnyValidPlan = 
            data?.hasSubscription === true || 
            data?.planType === 'free' || 
            data?.plan === 'free'; 

          setHasPlan(Boolean(hasAnyValidPlan));
        })
        .catch(() => setHasPlan(false));
    };

    checkStatus();
    window.addEventListener('auth:changed', checkStatus);
    return () => window.removeEventListener('auth:changed', checkStatus);
  }, []); 

  const handlePlanActivation = useCallback(() => {
    setHasPlan(true); 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/vault" element={<VaultsPage />} />
          <Route path="/adsense" element={<AddResource />} />
         <Route path="/adrender" element={<AdSlot />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<HelpSupportPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        
        {/* Allows the search page to load, passing the plan status */}
        <Route path="/search" element={<SearchPage hasSubscriptionPlan={hasPlan} />} />
        <Route path="/chat" element={<ChatPage hasSubscriptionPlan={hasPlan} />} />
        <Route path="/chat/:threadId" element={<ChatPage hasSubscriptionPlan={hasPlan} />} />
        
        <Route 
          path="/subscriptions" 
          element={<ManageSubscriptions onPlanSelect={handlePlanActivation} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
