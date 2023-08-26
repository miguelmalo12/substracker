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

const baseURL = process.env.REACT_APP_BASE_URL;

function AddSubscription({ setMenuVisible, isMenuVisible, menuRef }) {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState({});

  // Used on the Search Field
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        setFilteredServices(response.data);
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

  // Filters the services based on the search term
  useEffect(() => {
    setFilteredServices(
      services.filter(service =>
        service.service_name ? service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) : false
      )
    );
  }, [searchTerm, services]);

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
        <SearchField placeholder={"Search Service..."} setSearchTerm={setSearchTerm} />
      </div>
      <div className="md:flex md:gap-6 md:px-8 md:py-6 md:justify-evenly md:flex-wrap md:card">
        {filteredServices.map((service) => {
          return (
            <ExistingSubsCard
              key={service.service_id}
              service={service}
              categories={categories}
              onClick={() => navigate('/new-subscription/', { state: {logo: service.logo_url, name: service.service_name, id: service.service_id, categoryId: service.category_id, website: service.website} })}
            />
          );
        })}
      </div>
      <Footer />

    </main>
  );
}

export default AddSubscription;
