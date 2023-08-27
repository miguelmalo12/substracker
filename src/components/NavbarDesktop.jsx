import { ReactComponent as LeftArrow } from "../assets/icons/left_arrow.svg";

function NavbarDesktop({ content, goBack }) {
  return (
    <header className="hidden mb-4 md:flex dark:text-light-grey">
      <div>
        <nav className="flex items-center justify-between w-full">
        <LeftArrow className="w-5 h-5 mr-6 cursor-pointer" onClick={goBack} />
          <h1 className="text-3xl">{content}</h1>
          <div></div>
        </nav>
        <div className="flex justify-center">
        </div>
      </div>
    </header>
  );
}

export default NavbarDesktop;
