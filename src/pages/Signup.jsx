import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { currencyListState } from "../state/currencyListState";

import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";
import Footer from "../components/Footer";

const baseURL = process.env.REACT_APP_BASE_URL;

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState({ label: "Canadian Dollar (CAD)", value: "CAD" });
  
  const [currencyList] = useRecoilState(currencyListState);
  
  // User sees whole currency name, database gets 3 letter code
  const transformedCurrencyList = currencyList.map((currency) => {
    const match = currency.match(/\(([^)]+)\)/);
    const code = match ? match[1] : '';
    return {
      label: currency,
      value: code
    };
  });

  // POST Register User
  const handleSignup = async () => {
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      user_email: email,
      user_password: password,
      preferred_currency: preferredCurrency.value
    };
    console.log("Payload being sent:", payload);

    try {
      const response = await fetch(`${baseURL}/api/users/register`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.status === 201) {
        window.location.href = '/subscriptions';
      } else {
        alert(`Signup failed: ${data.message}`);
      }

    } catch (error) {
      console.error('There was a problem with the signup:', error);
      alert('There was a problem with the signup.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen responsive-navbar-padding">
      <Navbar content={"Create Account"} />
      <div className="flex-grow">
        <div className="max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl text-left">Signup</h1>
            <div className="mt-1 mb-5 border-4 w-22 border-primary"></div>
          </div>
          <Field title={"Email"} type={"text"} value={email} onChange={e => setEmail(e.target.value)} />
          <Field title={"Password"} type={"password"} value={password} onChange={e => setPassword(e.target.value)} className="pt-0" />
          <Field title={"Repeat Password"} type={"password"} value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} className="pt-0" />
          <Field
            title={"Currency"}
            type={"dropdown"}
            options={transformedCurrencyList}
            value={preferredCurrency}
            onChange={e => {
              const selectedCurrency = transformedCurrencyList.find(currency => currency.value === e.target.value);
              setPreferredCurrency(selectedCurrency);
            }}
            className="pt-0"
          />
          <Button content={"Signup"} onClick={handleSignup} />
          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="font-bold cursor-pointer text-primary">
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
