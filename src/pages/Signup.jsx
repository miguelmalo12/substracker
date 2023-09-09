import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currencyListState } from "../state/currencyListState";
import { userState } from "../state/userState";

import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";
import Footer from "../components/Footer";

const baseURL = process.env.REACT_APP_BASE_URL;

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState({
    label: "Canadian Dollar (CAD)",
    value: "CAD",
  });

  const [currencyList] = useRecoilState(currencyListState);

  // User sees whole currency name, database gets 3 letter code
  const transformedCurrencyList = currencyList.map((currency) => {
    const match = currency.match(/\(([^)]+)\)/);
    const code = match ? match[1] : "";
    return {
      label: currency,
      value: code,
    };
  });

  // POST Register User
  const handleSignup = async (event) => {
    if (user && user.user_id) {
      alert(
        "You're already logged in. Please log out first to create a new account."
      );
      return;
    }

    localStorage.removeItem("userData");

    // Validate password match
    event.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    const payload = {
      user_email: email,
      user_password: password,
      preferred_currency: preferredCurrency.value,
    };

    try {
      const response = await fetch(`${baseURL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.status === 201) {
        localStorage.setItem("userData", JSON.stringify(data.userData));
        setUser(data.userData);
        navigate("/subscriptions");
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error("There was a problem with the signup:", error);
      alert("There was a problem with the signup.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:text-light-grey responsive-navbar-padding">
      <Navbar content={"Create Account"} />
      <div className="flex-grow">
        <div className="max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl text-left">Signup</h1>
            <div className="mt-1 mb-5 border-4 w-22 border-primary"></div>
          </div>
          <form>
            <Field
              title={"Email"}
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              title={"Password"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pt-0"
            />
            <Field
              title={"Repeat Password"}
              type={"password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="pt-0"
            />
            <Field
              title={"Currency"}
              type={"select"}
              options={transformedCurrencyList}
              value={preferredCurrency.value}
              label={preferredCurrency.label} 
              onChange={(e) => {
                const selectedCurrency = transformedCurrencyList.find(
                  (currency) => currency.value === e.target.value
                );
                setPreferredCurrency({
                  value: selectedCurrency.value,
                  label: selectedCurrency.label,
                });
              }}
              className="pt-0"
            />
            <Button content={"Signup"} onClick={handleSignup} />
          </form>
          <p className="text-center">
            Already have an account?{" "}
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
      </div>{" "}
    </div>
  );
}

export default Signup;
