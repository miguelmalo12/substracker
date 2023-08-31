import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { mobileMenuState } from "../state/mobileMenuState";

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import Button from "../components/Button";

import Footer from "../components/Footer";


function NotFound() {
  const navigate = useNavigate();

  const [isMenuVisible, setMenuVisible] = useRecoilState(mobileMenuState);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <main className="responsive-padding dark:bg-dark md:pl-28 max-w-7xl md:min-h-screen md:flex md:flex-col">
      <div className="flex-grow">
        <section>
          {/* Nav on Mobile */}
          <NavbarMobile
            content={"Page Not Found"}
            toggleMenu={() => setMenuVisible(!isMenuVisible)}
          />

          {/* Nav on Desktop */}
          <div>
            <NavbarDesktop content={"Page Not Found"} hideLeftArrow={true} />
          </div>
        </section>

        <div className="flex justify-center">
          <div className="flex flex-col items-center content-center dark:text-light-grey md:mt-20">
            <div className="flex flex-col items-center content-center pb-6">
              <img
                className="w-48 mb-7 md:w-72"
                src="https://i.postimg.cc/kgBbxyjD/not-found.jpg"
                alt="Description"
              />
              <h3>Sorry, the page you are looking for doesn't exist.</h3>
            </div>
            <Button
              onClick={handleClick}
              content={"Return Home"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default NotFound;
