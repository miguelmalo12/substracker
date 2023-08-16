import { useState, useRef, useEffect } from "react";

import NavbarMobile from "../components/NavbarMobile";
import MenuMobile from "../components/MenuMobile";
import DropdownFilter from "../components/DropdownFilter";
import ButtonSmall from "../components/ButtonSmall";
import NoSubs from "../components/NoSubs";

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
    <div className="responsive-padding">
      <NavbarMobile
        content={"Subscriptions"}
        toggleMenu={() => setMenuVisible(!isMenuVisible)}
      />
      <div ref={menuRef}>
        {isMenuVisible && <MenuMobile activePage="subscriptions" />}
      </div>
      <div className="flex gap-2.5 justify-between">
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
      <NoSubs />
    </div>
  );
}

export default Subscriptions;
