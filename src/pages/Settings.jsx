import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { mobileMenuState } from "../state/mobileMenuState";
import { currencyListState } from "../state/currencyListState";
import { paymentMethodsState } from "../state/paymentMethodsState";
import { userState } from "../state/userState";
import { darkModeState } from "../state/darkModeState";

import axios from "axios";

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import MenuMobile from "../components/MenuMobile";
import MenuDesktop from "../components/MenuDesktop";
import FieldBorder from "../components/FieldBorder";
import Button from "../components/Button";
import Footer from "../components/Footer";

import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as AddPayMethod } from "../assets/icons/pay_method_add.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const baseURL = process.env.REACT_APP_BASE_URL;

// Used to display full currency name on dropdown
const getCurrencyFullName = (code, currencyList) => {
  const currency = currencyList.find((fullName) =>
    fullName.includes(`(${code})`)
  );
  return currency || code;
};

function Settings({ menuRef }) {
  const [darkMode] = useRecoilState(darkModeState);
  const [isMenuVisible, setMenuVisible] = useRecoilState(mobileMenuState);
  const [currencyList, setCurrencyList] = useRecoilState(currencyListState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [localCurrency, setLocalCurrency] = useState(
    userInfo.preferred_currency
  );
  const [localTheme, setLocalTheme] = useState(userInfo.preferred_theme);

  // Used to keep button disabled if no value changes
  const [initialCurrency, setInitialCurrency] = useState(localCurrency);
  const [initialTheme, setInitialTheme] = useState(localTheme);
  const [initialValuesUpdated, setInitialValuesUpdated] = useState(false);

  const [newPaymentMethodName, setNewPaymentMethodName] = useState("");
  const [paymentMethods, setPaymentMethods] =
    useRecoilState(paymentMethodsState);

  const [originalSettings, setOriginalSettings] = useState({
    preferred_currency: userInfo.preferred_currency,
    preferred_theme: userInfo.preferred_theme,
  });

  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [methodAdded, setMethodAdded] = useState(false);

  const fullCurrencyName = getCurrencyFullName(localCurrency, currencyList);

  // Initialize original settings when component renders or userInfo changes
  useEffect(() => {
    setOriginalSettings({
      preferred_currency: userInfo.preferred_currency,
      preferred_theme: userInfo.preferred_theme,
    });
  }, [userInfo]);

  // PUT Update User
  const handleSave = () => {
    const newSettings = {
      preferred_currency: localCurrency,
      preferred_theme: localTheme,
    };
  
    if (JSON.stringify(newSettings) !== JSON.stringify(originalSettings)) {
      // Update the settings via PUT request if they have changed
      axios
        .put(`${baseURL}/api/users/${userInfo.user_id}`, newSettings, {
          withCredentials: true,
        })
        .then(response => {
          // Update Recoil state and local storage
          setUserInfo({ ...userInfo, ...newSettings }); 
          const currentLocalStorageData = JSON.parse(localStorage.getItem("userData"));
          localStorage.setItem("userData", JSON.stringify({ ...currentLocalStorageData, ...newSettings }));
          setSettingsUpdated(true);
        })
        .catch(error => {
          console.log("Failed to update settings:", error);
        });
    } else {
      console.log("Settings have not changed. No update necessary.");
    }
    setInitialCurrency(localCurrency);
    setInitialTheme(localTheme);
  };

   // CURRENCY Change
   const handleCurrencyChange = (e) => {
    setSettingsUpdated(false);
    const selectedFullName = e.target.value;
    const selectedCode = selectedFullName.match(/\(([^)]+)\)/)[1]; // Extracts the code between parentheses
    setLocalCurrency(selectedCode);
  };

  // THEME Change
  const handleThemeChange = (e) => {
    setSettingsUpdated(false);
    setLocalTheme(e.target.value);
  };

  useEffect(() => {
    if (localCurrency !== initialCurrency || localTheme !== initialTheme) {
      setInitialValuesUpdated(true);
    } else {
      setInitialValuesUpdated(false);
    }
  }, [localCurrency, localTheme, initialCurrency, initialTheme]);

  // POST Payment Method
  const handleAddPaymentMethod = () => {
    const newPaymentMethod = {
      user_id: userInfo.user_id,
      method_name: newPaymentMethodName,
    };

    axios
      .post(`${baseURL}/api/methods/`, newPaymentMethod, {
        withCredentials: true,
      })
      .then((response) => {
        setMethodAdded(true);
        setPaymentMethods((prevMethods) => [...prevMethods, newPaymentMethod]);
      })
      .catch((error) => {
        console.log(error);
      });
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
              value={localTheme || "Light"}
              options={["Light", "Dark"]}
              onChange={handleThemeChange}
            />
            <div className="flex items-center justify-between pt-4 pb-2 border-b-2 dark:border-medium-grey">
              <h2 className="mr-3">Add Payment Method</h2>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <AddPayMethod className="w-6 h-6 cursor-pointer" />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-10 bg-black bg-opacity-30 backdrop-blur-sm animate-fade-in" />
                  <Dialog.Content
                    className={`data-[state=open]:animate-contentShow z-20 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none ${
                      darkMode ? "text-light-grey bg-dark-grey" : "bg-white"
                    }`}
                  >
                    <Dialog.Title className="m-0 text-[17px] font-medium">
                      Add Payment Method
                    </Dialog.Title>
                    <Dialog.Description className="mt-[10px] mb-5 text-[15px] flex flex-col gap-3 leading-normal">
                      <p></p>
                    </Dialog.Description>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className="w-[90px] text-right text-[15px]"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="text-dark-grey shadow-primary focus:shadow-primary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="name"
                        defaultValue="Enter Payment Method"
                        onChange={(e) =>
                          setNewPaymentMethodName(e.target.value)
                        }
                      />
                    </fieldset>
                    <div className="mt-[25px] flex justify-end">
                      <Dialog.Close asChild>
                        <button
                          onClick={handleAddPaymentMethod}
                          className="inline-flex items-center justify-center w-auto px-4 py-2 text-base font-medium rounded text-dark-grey bg-light-grey hover:bg-border focus:ring-2 focus:ring-dark-grey"
                        >
                          + Add
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        className="text-primary hover:bg-primary-bg focus:shadow-primary-dark absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
          <Button content={"Save"} onClick={handleSave} disabled={!initialValuesUpdated} />
          {settingsUpdated && (
            <p className="mt-4 text-center text-success">
              Settings successfully updated!
            </p>
          )}
          {methodAdded && (
            <p className="mt-4 text-center text-success">
              New payment method added!
            </p>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default Settings;
