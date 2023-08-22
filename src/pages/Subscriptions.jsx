import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import NavbarMobile from "../components/NavbarMobile";
import MenuMobile from "../components/MenuMobile";
import MenuDesktop from "../components/MenuDesktop";
import DropdownFilter from "../components/DropdownFilter";
import ButtonSmall from "../components/ButtonSmall";
import Filters from "../components/Filters";
import NoSubs from "../components/NoSubs";
import Footer from "../components/Footer";
import NavSubsDesktop from "../components/NavSubsDesktop";
import Card from "../components/Card";

const baseURL = process.env.REACT_APP_BASE_URL;

function Subscriptions({ isMenuVisible, setMenuVisible, menuRef }) {
  const navigate = useNavigate();

  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [selectedMetric, setSelectedMetric] = useState("Average");

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [preferredCurrency, setPreferredCurrency] = useState("CAD");
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAddClick = () => {
    navigate("/add-subscription");
  };

  //GET Subscriptions
  useEffect(() => {
    axios
      .get(`${baseURL}/api/subscriptions/`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.subscriptions)) {
          setSubscriptions(response.data.subscriptions);
          console.log(response.data.subscriptions);
        } else {
          console.error("Unexpected data format:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subscriptions:", error);
        setLoading(false);
      });
  }, []);

  //GET user's preferred currency
  useEffect(() => {
    // Using hardcoded user_id for now, needs to come from AUTH
    const userId = 'test-uuid';

    axios
      .get(`${baseURL}/api/users/${userId}`)
      .then((response) => {
        if (response.data && response.data.user) {
          setPreferredCurrency(response.data.user.preferred_currency);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <main className="responsive-padding md:pl-28 md:min-h-screen md:flex md:flex-col">
      <div className="flex-grow">
        {/* Nav on Mobile */}
        <NavbarMobile
          content={"Subscriptions"}
          toggleMenu={() => setMenuVisible(!isMenuVisible)}
        />

        {/* Nav on Desktop */}
        <NavSubsDesktop
          content={"Subscriptions"}
          selectedInterval={selectedInterval}
          selectedMetric={selectedMetric}
          setSelectedInterval={setSelectedInterval}
          setSelectedMetric={setSelectedMetric}
          handleAddClick={handleAddClick}
        />

        {/* Menu on Mobile */}
        <div ref={menuRef}>
          {isMenuVisible && <MenuMobile activePage="subscriptions" />}
        </div>
        {/* Menu on Desktop */}
        <div className="hidden md:block">
          <MenuDesktop activePage="subscriptions" />
        </div>

        <section className="md:hidden">
          <div className="flex gap-2.5 justify-between flex-wrap-reverse">
            <div className="flex gap-2.5 mb-4">
              <DropdownFilter
                options={["Monthly", "Yearly", "Weekly"]}
                onChange={setSelectedInterval}
              />
              <DropdownFilter
                options={["Average", "Total"]}
                onChange={setSelectedMetric}
              />
            </div>
            <ButtonSmall
              content={"+ Add"}
              type={"primary"}
              onClick={handleAddClick}
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="py-2 text-4xl">{totalAmount.toFixed(2)} {preferredCurrency}</h1>
            <h4 className="text-medium-grey">
              {selectedInterval} {selectedMetric}
            </h4>
          </div>
          <div className="mt-6 mb-6 border"></div>
          <Filters />
        </section>

        <div className="flex flex-wrap gap-3 md:gap-9">
          {!loading && subscriptions.length === 0 ? (
            <NoSubs />
          ) : (
            subscriptions.map((subscription) => (
              <Card
                key={subscription.subscription_id}
                imageContent={subscription.logo}
                name={subscription.name}
                selectedCurrency={subscription.currency}
                amount={subscription.amount}
                recurrence={subscription.recurrence}
                nextPaymentDate={subscription.payment_date}
                color={subscription.color}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Subscriptions;
