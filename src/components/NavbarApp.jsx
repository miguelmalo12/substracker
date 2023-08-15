import { ReactComponent as BurgerMenu } from "../assets/icons/burger_menu.svg";



function Navbar({ content }) {
  return (
    <header className="mb-4">
      {/* Mobile View Navbar */}
      <div className="md:hidden">
        <nav className="flex items-center justify-between w-full">
          <BurgerMenu className="cursor-pointer"/>
          <h1 className="content-center">{content}</h1>
          <div></div>
        </nav>
        <div className="flex justify-center">
        </div>
      </div>

      {/* Desktop View Navbar */}
      <div className="hidden md:block">
        <nav className="flex items-center justify-between w-full p-5">
        <BurgerMenu className="cursor-pointer"/>
          <div className="flex justify-center">
          </div>{" "}
          <div></div>
        </nav>
        <div className="mt-2 border mb-14"></div>
      </div>
    </header>
  );
}

export default Navbar;
