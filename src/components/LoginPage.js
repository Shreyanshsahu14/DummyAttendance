import React, { useState } from 'react';
import './LoginPage.css'; 
import { Link } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons for password visibility
import { useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
const LoginPage = () => {
 
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Welcome Back</h2>
        <form
        onSubmit={handleOnSubmit}>
          {/* Name field
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name"  onChange={(e) => setname(e.target.value)}  />
          </div> */}

          {/* Email field */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input   required type="text" name="email" id="email" placeholder="Enter your email"  value={email} onChange={handleOnChange} />
          </div>

          {/* Password field with visibility toggle */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password" value={password}
                onChange={handleOnChange}   
              />
              <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Forgot password link now below the password field */}
          <p className="forgot-password-link">
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>

          {/* Login button */}
          <button type="submit"   className="login-button">Login</button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
