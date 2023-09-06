import { useRecoilState, useSetRecoilState } from "recoil";
import { darkModeState } from "../state/darkModeState";
import { userState } from "../state/userState";

import { useNavigate } from "react-router-dom";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

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
  const setUser = useSetRecoilState(userState);
  const isActive = (page) => (activePage === page ? "text-primary" : "");
  const [darkMode] = useRecoilState(darkModeState);

  const handleLogout = async () => {
    console.log(`Logging out, hitting URL: ${baseURL}/api/users/logout`);
    try {
      const response = await fetch(`${baseURL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to logout: ${response.statusText}`);
      }
      // Clear any client-side storage here if applicable and navigate to login
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      
      setUser({
        user_id: null,
        user_email: null,
        preferred_currency: null,
        user_password: null,
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
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
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <div className="flex items-center pb-5 cursor-pointer">
                <LogoutIcon className="w-5 h-6 mr-6" />
                <h4 className="ml-1 text-base text-error">Logout</h4>
              </div>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
              <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm animate-fade-in" />
              <AlertDialog.Content className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-screen-sm max-h-[85vh] p-6 rounded-lg shadow-xl z-50 animate-scale-in focus:outline-none ${
                      darkMode
                        ? "bg-dark-grey text-light-grey border-dark"
                        : "bg-white"
                    }`}>
                <AlertDialog.Title className="text-base font-semibold">
                  Are you sure you want to logout?
                </AlertDialog.Title>
                <AlertDialog.Description className="mb-5 text-base leading-6">
                  This will end the current session.
                </AlertDialog.Description>
                <div className="flex justify-end gap-6">
                  <AlertDialog.Cancel asChild>
                    <button className="inline-flex items-center justify-center w-auto px-4 py-2 text-base font-medium rounded text-dark-grey bg-light-grey hover:bg-border focus:ring-2 focus:ring-dark-grey">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center w-auto px-4 py-2 text-base font-medium rounded bg-rose-100 text-error hover:bg-rose-200 focus:ring-2 focus:ring-error"
                    >
                      Logout
                    </button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      </div>
    </div>
  );
}

export default MenuDesktop;
