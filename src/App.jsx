import { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "./state/userState";
import { darkModeState } from "./state/darkModeState";
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [, setMenuVisible] = useRecoilState(mobileMenuState);
  const [toggledByButton, setToggledByButton] = useState(false);
  const setPaymentMethodsList = useSetRecoilState(paymentMethodsState);
  const setCurrencyRates = useSetRecoilState(currencyRatesState);

  const menuRef = useRef(null);

  const isAuthenticated = Boolean(user.user_id && user.user_email);

  const initializeDarkMode = (userData, setDarkMode) => {
    if (userData.preferred_theme === "Dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
      initializeDarkMode(parsedUserData, setDarkMode);
    }
    setIsInitialized(true);
  }, [setUser, setDarkMode]);

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
      if (!lastFetchTime || currentTime - lastFetchTime > 3600000) {
        // 1 hour
        try {
          const response = await axios.get(
            "https://api.freecurrencyapi.com/v1/latest",
            {
              params: {
                apikey: process.env.REACT_APP_FREECURRENCY_API_KEY,
              },
            }
          );
          cachedRates = response.data.data;
          lastFetchTime = currentTime;
        } catch (error) {
          console.error("Error fetching currency rates:", error);
          cachedRates = hardcodedRates; // Fallback to hardcoded rates
        }
      }

      setCurrencyRates(cachedRates);
    };

    fetchCurrencyRates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Closes mobile menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (toggledByButton) {
          setToggledByButton(false);
        } else {
          setMenuVisible(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, toggledByButton]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isInitialized) {
    return (
        <div className="flex items-center justify-center h-screen" role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <p>Loading...</p>
        </div>
    );
  }

  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <div className="dark:bg-dark">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login initializeDarkMode={initializeDarkMode} />}
            />
            <Route path="/signup" element={<Signup />} />
            {isAuthenticated ? (
              <>
                <Route
                  path="/subscriptions"
                  element={
                    <Subscriptions
                      menuRef={menuRef}
                      setToggledByButton={setToggledByButton}
                    />
                  }
                />
                <Route path="/add-subscription" element={<AddSubscription />} />
                <Route path="/new-subscription" element={<NewSubscription />} />
                <Route
                  path="/edit-subscription/:subscriptionId"
                  element={<EditSubscription />}
                />
                <Route
                  path="/settings"
                  element={
                    <Settings
                      menuRef={menuRef}
                      setToggledByButton={setToggledByButton}
                    />
                  }
                />
              </>
            ) : null}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
