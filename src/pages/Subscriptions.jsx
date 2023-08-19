import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarMobile from "../components/NavbarMobile";
import MenuMobile from "../components/MenuMobile";
import MenuDesktop from "../components/MenuDesktop";
import DropdownFilter from "../components/DropdownFilter";
import ButtonSmall from "../components/ButtonSmall";
import Filters from "../components/Filters";
import NoSubs from "../components/NoSubs";
import Footer from "../components/Footer";
import NavSubsDesktop from "../components/NavSubsDesktop";

function Subscriptions({ isMenuVisible, setMenuVisible, menuRef }) {
  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [selectedMetric, setSelectedMetric] = useState("Average");

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-subscription");
  };

  return (
    <main className="responsive-padding md:pl-28">
      {/* Nav on Mobile */}
      <NavbarMobile
        content={"Subscriptions"}
        toggleMenu={() => setMenuVisible(!isMenuVisible)}
      />

      {/* Nav on Desktop */}
      <NavSubsDesktop
        content={"Subscriptions"}
        selectedInterval={selectedInterval}
        selectedMetric={selectedMetric}
        setSelectedInterval={setSelectedInterval}
        setSelectedMetric={setSelectedMetric}
        handleAddClick={handleAddClick}
      />

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
          <div className="flex gap-2.5 mb-4">
            <DropdownFilter
              options={["Monthly", "Yearly", "Weekly"]}
              onChange={setSelectedInterval}
            />
            <DropdownFilter
              options={["Average", "Total"]}
              onChange={setSelectedMetric}
            />
          </div>
          <ButtonSmall
            content={"+ Add"}
            type={"primary"}
            onClick={handleAddClick}
          />
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
