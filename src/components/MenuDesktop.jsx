import { useRecoilState } from 'recoil';
import { darkModeState } from '../state/darkModeState';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as SubsIcon } from "../assets/icons/subscriptions.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as DarkModeIcon } from "../assets/icons/dark_mode.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as ActiveMenuIcon } from "../assets/icons/active_menu.svg";

import logo from "../assets/logos/SubsTracker-logo-wide.svg";
import logoWhite from "../assets/logos/SubsTracker-logo-wide-white.svg";

import Switch from "./Switch";

const baseURL = process.env.REACT_APP_BASE_URL;

function MenuDesktop({ activePage }) {
  const navigate = useNavigate();
  const isActive = (page) => (activePage === page ? "text-primary" : "");
  const [darkMode] = useRecoilState(darkModeState);

  const handleLogout = async () => {
    console.log(`Logging out, hitting URL: ${baseURL}/api/users/logout`);
    try {
      const response = await fetch(`${baseURL}/api/users/logout`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`Failed to logout: ${response.statusText}`);
      }
      // Clear any client-side storage here if applicable
      localStorage.removeItem('userToken');

      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="absolute top-0 left-0 z-10 h-screen pt-6 overflow-hidden duration-300 ease-out bg-white border border-t-0 border-b-0 rounded dark:text-light-grey dark:border-dark dark:bg-dark-grey w-18 transition-width hover:w-60 drop-shadow">
      <div className="w-60">
        <div className="p-4 pl-5 mb-6 border-b border-border">
         <img className="pb-5" src={darkMode ? logoWhite : logo} alt="" />
        </div>
        <div className="p-4 pl-6 mb-5 border-b border-border">
          <div
            className={`flex items-center pb-5 mb-3 cursor-pointer ${isActive(
              "subscriptions"
            )}`}
            onClick={() => navigate("/subscriptions")}
          >
            {activePage === "subscriptions" && (
              <ActiveMenuIcon className="absolute left-0 w-2 h-8" />
            )}
            <SubsIcon className="mt-0.5 mr-6 h-6 w-6" />
            <h4 className={`text-base ${isActive("subscriptions")}`}>
              Subscriptions
            </h4>
          </div>
          <div
            className={`flex items-center pb-5 cursor-pointer ${isActive(
              "settings"
            )}`}
            onClick={() => navigate("/settings")}
          >
            {activePage === "settings" && (
              <ActiveMenuIcon className="absolute left-0 w-2 h-8" />
            )}
            <SettingsIcon className={`w-6 h-6 mr-6 ${isActive("settings")}`} />
            <h4 className={`text-base ${isActive("settings")}`}>Settings</h4>
          </div>
        </div>
        <div className="p-4 pl-6">
          <div className="flex items-center pb-5 mb-2 cursor-pointer">
            <DarkModeIcon className="w-6 h-6 mr-6" />
            <h4 className="pr-3 text-base">Darkmode</h4>
            <Switch />
          </div>
          <div className="flex items-center pb-5 cursor-pointer" onClick={handleLogout}>
            <LogoutIcon className="w-5 h-6 mr-6" />
            <h4 className="ml-1 text-base text-error">Logout</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDesktop;
