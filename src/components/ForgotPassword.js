import React from 'react';
import './ForgotPasswordPage.css';
import { Link } from 'react-router-dom';
import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"

import { getPasswordResetToken } from "../services/operations/authAPI"
const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Your Password?</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="input-group">
            <label htmlFor="email">Enter your registered email</label>
            <input required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>
          <button type="submit" className="reset-button"> {!emailSent ? "Sumbit" : "Resend Email"}</button>
        </form>
        <div className="back-to-login">
        <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
