import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import MyPurchases from "./pages/MyPurchases.jsx";
import Wallet from "./pages/Wallet.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { pathname } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  // Listen for login status changes from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
      setIsAuthenticated(stored);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Paths where the bottom navigation should be hidden
  const hideNavOn = ["/login", "/signup"];
  const shouldShowNav = isAuthenticated && !hideNavOn.includes(pathname);

  return (
    <div style={{ paddingBottom: shouldShowNav ? "60px" : "0" }}>
      {/* Global toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchases"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyPurchases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile
                onLogout={() => {
                  localStorage.removeItem("isAuthenticated");
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setIsAuthenticated(false);
                }}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {shouldShowNav && <BottomNav />}
    </div>
  );
}

export default App;
