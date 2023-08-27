import { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { darkModeState } from './state/darkModeState';
import { mobileMenuState } from "./state/mobileMenuState";
import { paymentMethodsState } from "./state/paymentMethodsState";

import axios from "axios";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscriptions from "./pages/Subscriptions";
import AddSubscription from "./pages/AddSubscription";
import NewSubscription from "./pages/NewSubscription";
import EditSubscription from "./pages/EditSubscription";
import Settings from "./pages/Settings";

const baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [isMenuVisible, setMenuVisible] = useRecoilState(mobileMenuState);
  const setPaymentMethodsList = useSetRecoilState(paymentMethodsState);

  const menuRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/methods/`)
      .then((response) => {
        setPaymentMethodsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPaymentMethodsList]);

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
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/subscriptions" element={<Subscriptions menuRef={menuRef} />}/>
          <Route path="/add-subscription" element={<AddSubscription menuRef={menuRef}/>}/>
          <Route path="/new-subscription" element={<NewSubscription />} />
          <Route path="/edit-subscription/:subscriptionId" element={<EditSubscription />} />
          <Route path="/settings" element={<Settings menuRef={menuRef} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
