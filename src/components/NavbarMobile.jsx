import { ReactComponent as BurgerMenu } from "../assets/icons/burger_menu.svg";

function NavbarMobile({ content, toggleMenu }) {
  return (
    <header className="mb-4">
      <div className="md:hidden">
        <nav className="flex items-center justify-between w-full">
          <BurgerMenu className="cursor-pointer" onClick={toggleMenu} />
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
