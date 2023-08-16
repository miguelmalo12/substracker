
function NavSubsDesktop({ content, toggleMenu }) {
  return (
    <header className="mb-4">
      {/* Desktop View Navbar */}
      <div className="hidden md:block">
        <nav className="flex items-center justify-between w-full p-5">
          <h1 className="content-center text-3xl">{content}</h1>
          <div className="flex justify-center"></div> <div></div>
        </nav>
        <div className="mt-2 border mb-14"></div>
      </div>
    </header>
  );
}

export default NavSubsDesktop;
