import { NavLink, useLocation } from "react-router-dom";
import "../styles/BottomNav.css";

const BottomNav = () => {
  const location = useLocation();

  const getIndicatorPosition = () => {
    switch (location.pathname) {
      case "/":
        return "12.5%";
      case "/purchases":
        return "37.5%";
      case "/wallet":
        return "62.5%";
      case "/profile":
        return "87.5%";
      default:
        return "12.5%";
    }
  };

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <span>🏠</span>
        <p>Home</p>
      </NavLink>
      <NavLink to="/purchases" className="nav-item">
        <span>🛒</span>
        <p>My Purchases</p>
      </NavLink>
      <NavLink to="/wallet" className="nav-item">
        <span>💳</span>
        <p>Wallet</p>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <span>👤</span>
        <p>Profile</p>
      </NavLink>
      <div className="active-indicator" style={{ left: getIndicatorPosition() }} />
    </nav>
  );
};

export default BottomNav;
