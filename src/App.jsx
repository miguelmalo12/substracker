import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { darkModeState } from './state/darkModeState';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscriptions from "./pages/Subscriptions";
import AddSubscription from "./pages/AddSubscription";
import NewSubscription from "./pages/NewSubscription";
import EditSubscription from "./pages/EditSubscription";

function App() {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

  const menuRef = useRef(null);
  const [isMenuVisible, setMenuVisible] = useState(false);

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
          <Route
            path="/subscriptions"
            element={
              <Subscriptions
                setMenuVisible={setMenuVisible}
                isMenuVisible={isMenuVisible}
                menuRef={menuRef}
              />
            }
          />
          <Route
            path="/add-subscription"
            element={
              <AddSubscription
                setMenuVisible={setMenuVisible}
                isMenuVisible={isMenuVisible}
                menuRef={menuRef}
              />
            }
          />
          <Route path="/new-subscription" element={<NewSubscription />} />
          <Route path="/edit-subscription/:subscriptionId" element={<EditSubscription />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
