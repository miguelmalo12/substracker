import { ReactComponent as SubsIcon } from "../assets/icons/subscriptions.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as DarkModeIcon } from "../assets/icons/dark_mode.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as ActiveMenuIcon } from "../assets/icons/active_menu.svg";

import logo from "../assets/logos/SubsTracker-logo-wide.svg";

function MenuMobile({ activePage }) {
  const isActive = (page) => (activePage === page ? "text-primary" : "");

  return (
    <div className="absolute top-0 left-0 z-10 h-screen pt-6 overflow-hidden duration-300 ease-out bg-white border rounded w-18 transition-width hover:w-60 drop-shadow">
      <div className="w-60">
        <div className="p-4 pl-6 mb-6 border-b border-border">
          <img className="pb-5" src={logo} alt="" />
        </div>
        <div className="p-4 pl-6 mb-5 border-b border-border">
          <div
            className={`flex items-center pb-5 mb-3 cursor-pointer ${isActive(
              "subscriptions"
            )}`}
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
            <h4 className="text-base">Darkmode</h4>
          </div>
          <div className="flex items-center pb-5 cursor-pointer">
            <LogoutIcon className="w-5 h-6 mr-6" />
            <h4 className="ml-1 text-base text-error">Logout</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
