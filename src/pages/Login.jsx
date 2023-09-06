import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState, userStateFromLocalStorage } from "../state/userState";
import { darkModeState } from "../state/darkModeState";

import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";
import Footer from "../components/Footer";

const baseURL = process.env.REACT_APP_BASE_URL;

function Login({ initializeDarkMode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const user = useRecoilValue(userState);
  const [password, setPassword] = useState("");
  const setUserState = useSetRecoilState(userStateFromLocalStorage);
  const setDarkMode = useSetRecoilState(darkModeState);

  const handleLogin = async (event) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(`${baseURL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem("userData", JSON.stringify(data.user));

        setUserState(data.user);
        initializeDarkMode(data.user, setDarkMode);
        navigate("/subscriptions");
      } else {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          alert(`Login failed: ${data.message}`);
        } catch (e) {
          console.log("Response text:", text);
        }
      }
    } catch (error) {
      console.error("There was a problem with the login:", error);
      alert("There was a problem with the login.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen responsive-navbar-padding dark:text-light-grey">
      <Navbar content={"Select Account"} />
      {/* Conditionally render the "Go to Subscriptions" button */}
      {user && user.user_id && (
          <div className="max-w-sm pb-6 mx-auto">
              <h2 className="pb-3">You are already logged in as {user && user.user_email} </h2>
            <Button content={"Go To Dashboard"} onClick={() => navigate('/subscriptions')} />
          </div>
          )}
      <div className="flex-grow">
        <div className="max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl text-left">Login</h1>
            <div className="mt-1 mb-5 border-4 w-18 border-primary"></div>
          </div>
          {/* <a href="/login/google">
            <button className="flex items-center justify-center w-full h-12 p-2 mb-4 border-2 rounded bg-green border-dark-grey dark:border-medium-grey">
              <div className="flex">
                <img
                  className="pr-3"
                  src="https://i.postimg.cc/HLpc7TsB/google-icon.png"
                />
                <h3>Login with Google</h3>
              </div>
            </button>
          </a> */}
          {/* <div className="flex-col items-center justify-center mt-6 mb-3">
            <div className="border border-border dark:border-dark-grey"></div>
            <h3 className="flex items-center justify-center w-3 mx-auto -mt-3 bg-white dark:bg-dark px-7">
              or
            </h3>
          </div> */}
          <form onSubmit={handleLogin}>
            <Field
              title={"Email"}
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              title={"Password"}
              type={"password"}
              className="pt-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button content={"Login"} onClick={handleLogin} />
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="font-bold cursor-pointer text-primary"
            >
              Signup
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

export default Login;
