import { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from './state/userState';
import { darkModeState } from './state/darkModeState';
import { mobileMenuState } from "./state/mobileMenuState";
import { paymentMethodsState } from "./state/paymentMethodsState";
import { currencyRatesState } from "./state/currencyRatesState";
import { hardcodedRates } from "./state/hardcodedRates";

import axios from "axios";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Subscriptions from "./pages/Subscriptions";
import AddSubscription from "./pages/AddSubscription";
import NewSubscription from "./pages/NewSubscription";
import EditSubscription from "./pages/EditSubscription";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const baseURL = process.env.REACT_APP_BASE_URL;

let cachedRates = null;
let lastFetchTime = null;

function App() {
  const [user, setUser] = useRecoilState(userState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [isMenuVisible, setMenuVisible] = useRecoilState(mobileMenuState);
  const setPaymentMethodsList = useSetRecoilState(paymentMethodsState);
  const setCurrencyRates = useSetRecoilState(currencyRatesState);

  const menuRef = useRef(null);

  const isAuthenticated = Boolean(user.user_id && user.user_email);

  useEffect(() => {
    // Check if there's user data in local storage when app initializes
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [setUser]);

  // Gets all methods and sets them in global state
  useEffect(() => {
    axios
    .get(`${baseURL}/api/methods/`, { params: { user_id: user.user_id } })
      .then((response) => {
        setPaymentMethodsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPaymentMethodsList, user]);

  // Gets currency rates and sets them in global state
  useEffect(() => {
    const currentTime = new Date();

    const fetchCurrencyRates = async () => {
      if (!lastFetchTime || (currentTime - lastFetchTime > 3600000)) { // 1 hour
        try {
          const response = await axios.get('https://api.freecurrencyapi.com/v1/latest', {
            params: {
              apikey: process.env.REACT_APP_FREECURRENCY_API_KEY,
            }
          });
          cachedRates = response.data.data;
          lastFetchTime = currentTime;
        } catch (error) {
          console.error('Error fetching currency rates:', error);
          cachedRates = hardcodedRates; // Fallback to hardcoded rates
        }
      }
      
      setCurrencyRates(cachedRates);
    };

    fetchCurrencyRates();
  }, []);

  // Closes mobile menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <div className="dark:bg-dark">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          { isAuthenticated ? (
              <>
                <Route path="/subscriptions" element={<Subscriptions menuRef={menuRef} />}/>
                <Route path="/add-subscription" element={<AddSubscription menuRef={menuRef}/>}/>
                <Route path="/new-subscription" element={<NewSubscription />} />
                <Route path="/edit-subscription/:subscriptionId" element={<EditSubscription />} />
                <Route path="/settings" element={<Settings menuRef={menuRef} />} />
              </>
            ) : null }
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
