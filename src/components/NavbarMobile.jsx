import { ReactComponent as BurgerMenu } from "../assets/icons/burger_menu.svg";
import { ReactComponent as LeftArrow } from "../assets/icons/left_arrow.svg";

function NavbarMobile({ content, toggleMenu, goBack }) {
  return (
    <header className="mb-4 md:hidden dark:text-light-grey">
      <div>
        <nav className="flex items-center justify-between w-full">
        { toggleMenu 
            ? <BurgerMenu className="cursor-pointer" onClick={toggleMenu} />
            : goBack 
            ? <LeftArrow className="cursor-pointer" onClick={goBack} />
            : null
          }
          <h1 className="content-center">{content}</h1>
          <div></div>
        </nav>
        <div className="flex justify-center">
        </div>
      </div>
    </header>
  );
}

export default NavbarMobile;
