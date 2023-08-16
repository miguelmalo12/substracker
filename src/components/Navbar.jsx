import { ReactComponent as LeftArrow } from "../assets/icons/left_arrow.svg";

import logo from "../assets/logos/SubsTracker-Logo.png";
import logoflat from "../assets/logos/SubsTracker-Logo-H.png";

function Navbar({ content }) {
  return (
    <header>
      {/* Mobile View Navbar */}
      <div className="md:hidden">
        <nav className="flex items-center justify-between w-full">
          <LeftArrow className="cursor-pointer"/>
          <h1 className="content-center">{content}</h1>
          <div></div>
        </nav>
        <div className="flex justify-center">
          <img className="w-40 responsive-margin" src={logo} alt="" />
        </div>
        <div className="mt-4 mb-4 border"></div>
      </div>

      {/* Desktop View Navbar */}
      <div className="hidden md:block">
        <nav className="flex items-center justify-between w-full p-5">
          <LeftArrow className="w-5 h-5 cursor-pointer"/>
          <div className="flex justify-center">
            <img className="w-60" src={logoflat} alt="" />
          </div>{" "}
          <div></div>
        </nav>
        <div className="mt-2 border mb-14"></div>
      </div>
    </header>
  );
}

export default Navbar;
