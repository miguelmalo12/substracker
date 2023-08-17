import NavbarMobile from "../components/NavbarMobile";
import MenuMobile from "../components/MenuMobile";
import ButtonSmall from "../components/ButtonSmall";
import SearchField from "../components/SearchField";

import { ReactComponent as LeftArrow } from "../assets/icons/left_arrow.svg";


function AddSubscription({ setMenuVisible, isMenuVisible, menuRef }) {
  return (
    <main className="responsive-padding md:pl-28">
      {/* Nav on Mobile */}
      <NavbarMobile
        content={"Add Subscription"}
        toggleMenu={() => setMenuVisible(!isMenuVisible)}
      />
      {/* Menu on Mobile */}
      <div ref={menuRef}>
        {isMenuVisible && <MenuMobile activePage="subscriptions" />}
      </div>

      <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2.5 mb-4 items-center">
           <LeftArrow />
           <h3>Go Back</h3>
          </div>
          <ButtonSmall content={"+ New"} type={"primary"} />
        </div>
        <SearchField placeholder={"Search Service..."} />
    </main>
  );
}

export default AddSubscription;
