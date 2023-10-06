import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";
import Footer from "../components/Footer";

const baseURL = process.env.REACT_APP_BASE_URL;

function ForgotPassword() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true); // Disables button

        try {
            const response = await axios.post(`${baseURL}/api/users/forgot-password`, { user_email: email });
    
            if (response.status === 200) {
                setMessage(response.data.message);
            } else {
                setMessage("Failed to reset password. Please try again later.");
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a non-2xx status code
                setMessage(error.response.data.error || "Failed to reset password. Please try again later.");
            } else if (error.request) {
                // The request was made but no response was received
                setMessage("Server did not respond. Please try again later.");
            } else {
                // Something happened in setting up the request and triggered an error
                setMessage("Failed to reset password. Please try again later.");
            }
        }
    };
    

  return (
    <div className="flex flex-col min-h-screen responsive-navbar-padding dark:text-light-grey">
      <Navbar content={"Forgot Password"} />
      {/* Conditionally render the "Go to Subscriptions" button */}
      {user && user.user_id && (
        <div className="max-w-sm pb-6 mx-auto">
          <h2 className="pb-3">
            You are already logged in as {user && user.user_email}{" "}
          </h2>
          <Button
            content={"Go To Dashboard"}
            onClick={() => navigate("/subscriptions")}
          />
        </div>
      )}
      <div className="flex-grow">
        <div className="max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl text-left">Forgot Password</h1>
            <div className="mt-1 mb-5 border-4 w-18 border-primary"></div>
            <p className="pb-5">
              Enter your SubsTracker email, and we'll send you a link to reset
              your password.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Field title={"Email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button content={"Reset Password"} disabled={isSubmitting} />
            {message && <p className="text-center text-error">{message}</p>}
          </form>

          <p className="text-center">
            Do you remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-bold cursor-pointer text-primary"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <div className="mx-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ForgotPassword