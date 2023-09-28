import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import axios from 'axios';

import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";
import Footer from "../components/Footer";

const baseURL = process.env.REACT_APP_BASE_URL;

function NewPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== repeatPassword) {
            setMessage("Passwords do not match!");
            return;
        }
    
        try {
            const response = await axios.post(`${baseURL}/api/users/new-password`, { password, token });
    
            if (response.status === 200) {
                setMessage("Password changed successfully!");
                alert("Password changed successfully!");
                navigate('/login');
            } else {
                setMessage("Failed to change password. Please try again later.");
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error || "Failed to change password. Please try again later.");
            } else if (error.request) {
                setMessage("Server did not respond. Please try again later.");
            } else {
                setMessage("Failed to change password. Please try again later.");
            }
        }
    };
    

  return (
    <div className="flex flex-col min-h-screen responsive-navbar-padding dark:text-light-grey">
      <Navbar content={"New Password"} />
      <div className="flex-grow">
        <div className="max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl text-left">New Password</h1>
            <div className="mt-1 mb-5 border-4 w-18 border-primary"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <Field
              title={"Enter New Password"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pt-0"
            />
            <Field
              title={"Confirm Password"}
              type={"password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="pt-0"
            />
            <Button content={"Submit"}  />
            {message && <p className="text-center text-error">{message}</p>}
          </form>
        </div>
      </div>
      <div className="mx-auto">
        <Footer />
      </div>
    </div>
  )
}

export default NewPassword