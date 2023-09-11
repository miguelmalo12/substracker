import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";
import { darkModeState } from "../state/darkModeState";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { ReactComponent as SubsIcon } from "../assets/icons/subscriptions.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as DarkModeIcon } from "../assets/icons/dark_mode.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as ActiveMenuIcon } from "../assets/icons/active_menu.svg";

import Switch from "./Switch";

const baseURL = process.env.REACT_APP_BASE_URL;

function MenuMobile({ activePage, toggleMenu }) {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [darkMode] = useRecoilState(darkModeState);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseURL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to logout: ${response.statusText}`);
      }
      // Clears any client-side storage and navigates to login
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

  // Close menu when navigating to another page
  const handleNavigation = (path) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <div className="absolute z-10 -mt-3 dark:bg-dark-grey dark:border-dark dark:text-light-grey w-52 card">
      <div className="p-4 mb-3 border-b border-border">
        <p className="text-sm font-semibold text-medium-grey">
         {user?.user_email || "Not logged in"}
        </p>
      </div>
      <div className="p-4 mb-3 border-b border-border">
        <div
          className="flex pb-3 mb-3 cursor-pointer"
          onClick={() => handleNavigation("/subscriptions")}
        >
          {activePage === "subscriptions" && (
            <ActiveMenuIcon className="absolute left-0" />
          )}
          <SubsIcon className="mt-0.5 mr-3" />
          <h4>Subscriptions</h4>
        </div>
        <div
          className="flex pb-3 cursor-pointer"
          onClick={() => handleNavigation("/settings")}
        >
          {activePage === "settings" && (
            <ActiveMenuIcon className="absolute left-0" />
          )}
          <SettingsIcon className="mr-3" />
          <h4>Settings</h4>
        </div>
      </div>
      <div className="p-4">
        <div className="flex pb-3 cursor-pointer">
          <DarkModeIcon className="mb-3 mr-3" />
          <h4 className="pr-3">Darkmode</h4>
          <Switch />
        </div>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <div className="flex pb-3 cursor-pointer">
              <LogoutIcon className="mr-4" />
              <h4 className="text-error">Logout</h4>
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
                    onTouchStart={handleLogout}
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
  );
}

export default MenuMobile;
