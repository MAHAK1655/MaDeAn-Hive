import './App.css';
import { ThemeProvider } from '@emotion/react';
import customeTheme from './Theme/customeTheme';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import CustomerRoutes from './routes/CustomerRoutes';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import SellerAccountVerification from './seller/pages/SellerAccountVerification';
import SellerAccountVerified from './seller/pages/SellerAccountVerified';
import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import AdminAuth from './admin/pages/Auth/AdminAuth';
import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
import { createHomeCategories } from './Redux Toolkit/Customer/Customer/AsyncThunk';
import { homeCategories } from './data/homeCategories';

// Protected Route Component for Admin
function AdminRoute({ children }: { children: ReactNode }) {
  const { user } = useAppSelector(store => store);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user.user !== undefined) {
      setIsChecking(false);
    }
  }, [user.user]);

  if (isChecking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return user.user?.role === "ROLE_ADMIN" ? children : <Navigate to="/admin-login" replace />;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired
};

// Protected Route Component for Seller
function SellerRoute({ children }: { children: ReactNode }) {
  const { sellers } = useAppSelector(store => store);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || sellers.profile !== undefined) {
      setIsChecking(false);
    }
  }, [sellers.profile]);

  if (isChecking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return <Navigate to="/become-seller" replace />;
  }

  return children;
}

SellerRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  const dispatch = useAppDispatch();
  const { sellers, user } = useAppSelector(store => store);
  const navigate = useNavigate();

  // Fetch user and seller profiles on initial load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    
    if (jwt) {
      // Fetch user profile if not already loaded
      if (!user.user) {
        dispatch(fetchUserProfile({ jwt, navigate }));
      }
      
      // Fetch seller profile if not already loaded
      if (!sellers.profile) {
        dispatch(fetchSellerProfile(jwt));
      }
    }
  }, [dispatch, navigate, user.user, sellers.profile]);

  // Initialize home categories on mount
  useEffect(() => {
    dispatch(createHomeCategories(homeCategories));
    // Uncomment if needed:
    // dispatch(fetchHomePageData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={customeTheme}>
      <div className="App">
        <Routes>
          {/* Seller Routes - Protected */}
          <Route 
            path="/seller/*" 
            element={
              <SellerRoute>
                {sellers.profile ? (
                  <SellerDashboard />
                ) : (
                  <SellerAccountVerification />
                )}
              </SellerRoute>
            } 
          />

          {/* Admin Routes - Protected */}
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* Auth Routes */}
          <Route path="/admin-login" element={<AdminAuth />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller-verification" element={<SellerAccountVerification />} />
          <Route path="/account-verified" element={<SellerAccountVerified />} />

          {/* Customer Routes */}
          <Route path="/*" element={<CustomerRoutes />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;