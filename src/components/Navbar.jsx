import { ReactComponent as LeftArrow } from "../assets/icons/left_arrow.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../state/darkModeState";

import logo from "../assets/logos/SubsTracker-logo.svg";
import logoflat from "../assets/logos/SubsTracker-logo-H.svg";

import logoWhite from "../assets/logos/SubsTracker-logo-white.svg";
import logoflatWhite from "../assets/logos/SubsTracker-logo-H-white.svg";

function Navbar({ content }) {
  const navigate = useNavigate();
  const darkMode = useRecoilValue(darkModeState);

  return (
    <header>
      {/* Mobile View Navbar */}
      <div className="md:hidden">
        <nav className="flex items-center justify-between w-full">
          <LeftArrow className="cursor-pointer" onClick={() => navigate('/')}/>
          <h1 className="content-center">{content}</h1>
          <div></div>
        </nav>
        <div className="flex justify-center">
          <img className="w-40 responsive-margin" src={darkMode ? logoWhite : logo} alt="" />
        </div>
        <div className="mt-4 mb-4 border"></div>
      </div>

      {/* Desktop View Navbar */}
      <div className="hidden md:block">
        <nav className="flex items-center justify-between w-full px-5 py-4">
          <LeftArrow className="w-5 h-5 cursor-pointer" onClick={() => navigate('/')}/>
          <div className="flex justify-center">
            <img className="w-60" src={darkMode ? logoflatWhite : logoflat} alt="" />
          </div>{" "}
          <div></div>
        </nav>
        <div className="mt-2 mb-8 border dark:border-t-0 dark:border-medium-grey"></div>
      </div>
    </header>
  );
}

export default Navbar;
