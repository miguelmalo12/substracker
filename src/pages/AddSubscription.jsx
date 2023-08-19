import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import MenuMobile from "../components/MenuMobile";
import MenuDesktop from "../components/MenuDesktop";
import ButtonSmall from "../components/ButtonSmall";
import SearchField from "../components/SearchField";
import ExistingSubsCard from "../components/ExistingSubsCard";
import Footer from "../components/Footer";

function AddSubscription({ setMenuVisible, isMenuVisible, menuRef }) {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState({});

  const baseURL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/subscriptions");
  };

  const handleAddNewClick = () => {
    navigate('/new-subscription');
  };

  useEffect(() => {
    // GET Services
    axios
      .get(`${baseURL}/api/services/`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //GET Categories
    axios
      .get(`${baseURL}/api/categories/`)
      .then((response) => {
        // Transform the array to an object for easier access
        const categoryObj = response.data.reduce((acc, category) => {
          acc[category.category_id] = category.category_name;
          return acc;
        }, {});
        setCategories(categoryObj);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="max-w-7xl responsive-padding md:pl-28">
      {/* Nav on Mobile */}
      <NavbarMobile content={"Add Subscription"} goBack={handleGoBack} />

      {/* Menu on Mobile */}
      <div ref={menuRef}>
        {isMenuVisible && <MenuMobile activePage="subscriptions" />}
      </div>

      {/* Menu on Desktop */}
      <div className="hidden md:block">
        <MenuDesktop activePage="subscriptions" />
      </div>

      <div className="pt-3 md:flex md:justify-between">
        <div className="flex items-center justify-between mb-3 md:w-full md:mr-6">
          <div>
            {/* Nav on Desktop */}
            <NavbarDesktop content={"Add Subscription"} goBack={handleGoBack} />
          </div>
          <ButtonSmall content={"+ New"} type={"primary"} onClick={handleAddNewClick} />
        </div>
        <SearchField placeholder={"Search Service..."} />
      </div>
      <div className="md:flex md:gap-6 md:px-8 md:py-6 md:justify-evenly md:flex-wrap md:card">
        {services.map((service) => {
          return (
            <ExistingSubsCard
              key={service.service_id}
              service={service}
              categories={categories}
            />
          );
        })}
      </div>
      <Footer />

    </main>
  );
}

export default AddSubscription;
