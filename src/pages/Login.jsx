import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userStateFromLocalStorage } from "../state/userState";

import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";
import Footer from "../components/Footer";

const baseURL = process.env.REACT_APP_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUserState = useSetRecoilState(userStateFromLocalStorage);
  
  const handleLogin = async () => {
    const payload = {
      email,
      password
    };

    try {
      const response = await fetch(`${baseURL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        console.log('Data.user:', data.user);
        localStorage.setItem('userData', JSON.stringify(data.user));
        console.log('localStorage immediately after set:', JSON.parse(localStorage.getItem('userData')));

        setUserState(data.user);
        navigate('/subscriptions');
      } else {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          alert(`Login failed: ${data.message}`);
        } catch (e) {
          console.log('Response text:', text);
        }
      }
    } catch (error) {
      console.error('There was a problem with the login:', error);
      alert('There was a problem with the login.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen responsive-navbar-padding">
      <Navbar content={"Select Account"} />

      <div className="flex-grow">
        <div className="max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl text-left">Login</h1>
            <div className="mt-1 mb-5 border-4 w-18 border-primary"></div>
          </div>
          <a href="/login/google">
            <button className="flex items-center justify-center w-full h-12 p-2 mb-4 border-2 rounded bg-green border-dark-grey">
              <div className="flex">
                <img
                  className="pr-3"
                  src="https://i.postimg.cc/HLpc7TsB/google-icon.png"
                />
                <h3>Login with Google</h3>
              </div>
            </button>
          </a>
          <div className="flex-col items-center justify-center mt-6 mb-3">
            <div className="border border-border dark:border-dark-grey"></div>
            <h3 className="flex items-center justify-center w-3 mx-auto -mt-3 bg-white px-7">
              or
            </h3>
          </div>
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
          <p className="text-center">
            Don't have an account?{" "}
            <a href="/signup" className="font-bold cursor-pointer text-primary">
              Signup
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
