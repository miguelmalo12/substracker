import { ReactComponent as SubsIcon } from "../assets/icons/subscriptions.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as DarkModeIcon } from "../assets/icons/dark_mode.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as ActiveMenuIcon } from "../assets/icons/active_menu.svg";

import Switch from "./Switch";

function MenuMobile({ activePage }) {
  return (
    <div className="absolute z-10 -mt-3 w-52 card">
      <div className="p-4 mb-3 border-b border-border">
        <p className="text-sm font-semibold text-medium-grey">
          john.doe@gmail.com
        </p>
      </div>
      <div className="p-4 mb-3 border-b border-border">
        <div className="flex pb-3 mb-3 cursor-pointer">
          {activePage === "subscriptions" && <ActiveMenuIcon className="absolute left-0" />}
          <SubsIcon className="mt-0.5 mr-3" />
          <h4>Subscriptions</h4>
        </div>
        <div className="flex pb-3 cursor-pointer">
          {activePage === "settings" && <ActiveMenuIcon className="absolute left-0" />}
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
        <div className="flex pb-3 cursor-pointer">
          <LogoutIcon className="mr-4" />
          <h4 className="text-error">Logout</h4>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
