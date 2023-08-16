import { useState, useRef, useEffect } from "react";

import NavbarMobile from "../components/NavbarMobile";
import MenuMobile from "../components/MenuMobile";
import MenuDesktop from "../components/MenuDesktop";
import DropdownFilter from "../components/DropdownFilter";
import ButtonSmall from "../components/ButtonSmall";
import Filters from "../components/Filters";
import NoSubs from "../components/NoSubs";
import Footer from "../components/Footer";
import NavSubsDesktop from "../components/NavSubsDesktop";

function Subscriptions() {
  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [selectedMetric, setSelectedMetric] = useState("Average");

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
    <main className="responsive-padding">
      {/* Nav on Mobile */}
      <NavbarMobile
        content={"Subscriptions"}
        toggleMenu={() => setMenuVisible(!isMenuVisible)}
      />

      {/* Nav on Desktop */}
      <NavSubsDesktop content={"Subscriptions"} />

      {/* Menu on Mobile */}
      <div ref={menuRef}>
        {isMenuVisible && <MenuMobile activePage="subscriptions" />}
      </div>
      {/* Menu on Desktop */}
      <div className="hidden md:block">
        <MenuDesktop activePage="subscriptions" />
      </div>

      <section className="md:hidden">
        <div className="flex gap-2.5 justify-between flex-wrap-reverse">
          <div className="flex gap-2.5">
            <DropdownFilter
              options={["Monthly", "Yearly", "Weekly"]}
              onChange={setSelectedInterval}
            />
            <DropdownFilter
              options={["Average", "Total"]}
              onChange={setSelectedMetric}
            />
          </div>
          <ButtonSmall content={"+ Add"} type={"primary"} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="py-2 text-4xl">0.00 $</h1>
          <h4 className="text-medium-grey">
            {selectedInterval} {selectedMetric}
          </h4>
        </div>
        <div className="mt-6 mb-6 border"></div>
        <Filters />
      </section>

      <NoSubs />
      <Footer />
    </main>
  );
}

export default Subscriptions;
