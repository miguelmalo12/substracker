import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavbarMobile from "../components/NavbarMobile";
import MenuMobile from "../components/MenuMobile";
import ButtonSmall from "../components/ButtonSmall";
import SearchField from "../components/SearchField";
import ExistingSubsCard from "../components/ExistingSubsCard";

import { ReactComponent as LeftArrow } from "../assets/icons/left_arrow.svg";

function AddSubscription({ setMenuVisible, isMenuVisible, menuRef }) {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState({});

  const baseURL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/subscriptions");
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
    <main className="responsive-padding md:pl-28">
      {/* Nav on Mobile */}
      <NavbarMobile
        content={"Add Subscription"}
        toggleMenu={() => setMenuVisible(!isMenuVisible)}
      />
      {/* Menu on Mobile */}
      <div ref={menuRef}>
        {isMenuVisible && <MenuMobile activePage="subscriptions" />}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2.5 mb-4 items-center" onClick={handleGoBack}>
          <LeftArrow />
          <h3>Go Back</h3>
        </div>
        <ButtonSmall content={"+ New"} type={"primary"} />
      </div>
      <SearchField placeholder={"Search Service..."} />
      <div>
        {services.map((service) => {
            return (
                <ExistingSubsCard key={service.service_id} service={service} categories={categories} />
            )
        })}
      </div>
    </main>
  );
}

export default AddSubscription;
