import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

export default function Login({ onLogin }) {
  const api = import.meta.env.VITE_URL_API;
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!phone.trim() || !password.trim()) {
      toast.error("Please enter both phone and password");
      return;
    }

    try {
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const res = await response.json();

      if (response.ok && res?.status === true) {
        toast.success(res.message || "Login successful");

        const token = res.User?.token || res.token || "";

        // Save to localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(res.User));
        localStorage.setItem("token", token);

        onLogin?.();
        navigate("/");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Welcome Back 👋</h2>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          className="login-input"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Log In
        </button>
        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}
