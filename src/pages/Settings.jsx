import { useRecoilState } from "recoil";
import { mobileMenuState } from "../state/mobileMenuState";
import { currencyListState } from "../state/currencyListState";

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import MenuMobile from "../components/MenuMobile";
import MenuDesktop from "../components/MenuDesktop";
import FieldBorder from "../components/FieldBorder";
import Button from "../components/Button";
import Footer from "../components/Footer";

import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";


function Settings({ menuRef }) {
  const [isMenuVisible, setMenuVisible] = useRecoilState(mobileMenuState);  
  const [currencyList, setCurrencyList] = useRecoilState(currencyListState);

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
            <FieldBorder
              title={"Email"}
              type={"email"}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />

            <FieldBorder
              title={"Preferred Currency"}
              type={"select"}
              // value={selectedCurrency}
              options={currencyList}
              // onChange={(e) => setSelectedCurrency(e.target.value)}
            />
            <FieldBorder
              title={"Preferred Theme"}
              type={"select"}
              // value={sharedNumber}
              options={["Light", "Dark"]}
              // onChange={(e) => setSharedNumber(e.target.value)}
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
