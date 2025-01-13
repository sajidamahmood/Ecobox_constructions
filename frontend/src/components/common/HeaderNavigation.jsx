import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/logo.jpg';
import loginIcon from '../../assets/images/login-icon.jpg'; 


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for the hamburger menu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState("User"); // State for username
  const [role, setRole] = useState(null); // State for user role
  const navigate = useNavigate();

  // Fetch username, auth state, and role from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("auth_token");
    const userRole = localStorage.getItem("role");
    if (token && storedUsername && userRole) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    setIsLoggedIn(false); // Update state to reflect logged-out status
    navigate("/"); // Redirect to home page
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-info")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logoImg} alt="Logo" className="logo" />
        </Link>
      </div>

      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="/extension">Extension</a></li>
          <li><a href="/interior-renovation">Rénovation Intérieure</a></li>
          <li><a href="/exterior-works">Extérieurs</a></li>
          <li><a href="/Members">Notre équipe</a></li>
          <li><a href="/ContactUs">Contactez-nous</a></li>
          <li><a href="/who-we-are">Qui somme-nous</a></li>
        </ul>
      </nav>

      <div className="header-contact">
        <button className="contact-us">Contactez-nous</button>
        <button className="call-us">01 46 61 61 61</button>

        {isLoggedIn ? (
          <div className="user-info">
            <span onClick={toggleDropdown} className="user-dropdown-toggle">
              Welcome, {username}
            </span>

            {dropdownOpen && (
              <div className="dropdown-menu">
                {/* Render dashboard link based on role */}
                {role === "admin" ? (
                  <Link to="/admin/dashboard" className="dropdown-link">
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/user-dashboard" className="dropdown-link">
                    User Dashboard
                  </Link>
                )}
                <button
                  className="dropdown-link"
                  onClick={handleLogout}
                  style={{ border: "none", background: "none", cursor: "pointer" }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
<img
            src={loginIcon}
            alt="Login"
            className="login-icon"
            onClick={() => navigate('/login')} 
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}/>)}
      </div>
    </header>
  );
};

export default Header;
