import { ReactComponent as LeftArrow } from "../assets/icons/left_arrow.svg";

function Navbar({ content }) {
  return (
    <header>
        <nav className="flex items-center justify-between w-full">
            <LeftArrow />
            <h1 className="content-center">{content}</h1>
            <div></div>
        </nav>
    </header>
  )
}

export default Navbar