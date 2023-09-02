import { useRecoilState, useRecoilValue } from "recoil";
import { mobileMenuState } from "../state/mobileMenuState";
import { currencyListState } from "../state/currencyListState";
import { userState } from "../state/userState";

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import MenuMobile from "../components/MenuMobile";
import MenuDesktop from "../components/MenuDesktop";
import FieldBorder from "../components/FieldBorder";
import Button from "../components/Button";
import Footer from "../components/Footer";

import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";

// Used to display full currency name on dropdown
const getCurrencyFullName = (code, currencyList) => {
  const currency = currencyList.find((fullName) => fullName.includes(`(${code})`));
  return currency || code;
};

function Settings({ menuRef }) {
  const [isMenuVisible, setMenuVisible] = useRecoilState(mobileMenuState);
  const [currencyList, setCurrencyList] = useRecoilState(currencyListState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const fullCurrencyName = getCurrencyFullName(userInfo.preferred_currency, currencyList);

   // CURRENCY Change
   const handleCurrencyChange = (e) => {
    const selectedFullName = e.target.value;
    const selectedCode = selectedFullName.match(/\(([^)]+)\)/)[1]; // Extracts the code between parentheses
    setUserInfo({ ...userInfo, preferred_currency: selectedCode });
  };

  // THEME Change
  const handleThemeChange = (e) => {
    setUserInfo({ ...userInfo, preferred_theme: e.target.value });
  };

  

  return (
    <main className="responsive-padding dark:bg-dark md:pl-28 max-w-7xl md:min-h-screen md:flex md:flex-col">
      <div className="flex-grow">
        <section>
          {/* Nav on Mobile */}
          <NavbarMobile
            content={"Settings"}
            toggleMenu={() => setMenuVisible(!isMenuVisible)}
          />

          {/* Nav on Desktop */}
          <div>
            <NavbarDesktop content={"Settings"} hideLeftArrow={true} />
          </div>

          {/* Menu on Mobile */}
          <div ref={menuRef}>
            {isMenuVisible && <MenuMobile activePage="settings" />}
          </div>
          {/* Menu on Desktop */}
          <div className="hidden md:block">
            <MenuDesktop activePage="settings" />
          </div>
        </section>
        <div className="pt-4 md:hidden">
          <SettingsIcon className="w-8 h-8 mx-auto" />
        </div>
        <section className="mt-4 md:mt-10 md:card dark:bg-dark-grey dark:text-light-grey dark:border-dark md:py-3 md:px-6 md:w-1/2">
          <div className="pb-6">
            <div className="flex items-center justify-between pt-4 pb-2 border-b-2 dark:border-medium-grey">
              <h2 className="mr-3">Email</h2>
              <p className="flex-grow text-right border-none dark:bg-dark-grey">
                {userInfo.user_email}
              </p>
            </div>

            <FieldBorder
              title={"Preferred Currency"}
              type={"select"}
              value={fullCurrencyName}
              options={currencyList}
              onChange={handleCurrencyChange}
            />
            <FieldBorder
              title={"Preferred Theme"}
              type={"select"}
              value={userInfo.preferred_theme || "Light"}
              options={["Light", "Dark"]}
              onChange={handleThemeChange}
            />
            <FieldBorder
              title={"Add Payment Method"}
              type={"text"}
              placeholder={"Add Payment Method"}
              // value={nextPaymentDate}
              // onChange={(e) => setNextPaymentDate(e.target.value)}
            />
          </div>
          <Button content={"Save"} />
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default Settings;
