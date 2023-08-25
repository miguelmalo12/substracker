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
  const [totalAmount, setTotalAmount] = useState(0); // This will show the monthly average by default

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
    const userId = "test-uuid";

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

  // Converts currency using API, used inside calculateTotalAmount function
  const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const url = `${baseURL}/api/currencies/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`;
    try {
      const response = await axios.get(url);
      return parseFloat(response.data.convertedAmount);
    } catch (error) {
      console.error("Error converting currency:", error);
      return amount; // In case converson fails, it will return the original amount
    }
  };

  // Used inside calculateTotalAmount function to adjust amount based on recurrence
  const adjustAmountToRecurrence = (amount, recurrence) => {
    switch (recurrence.toLowerCase()) {
      case "weekly":
        return amount * 4;
      case "yearly":
        return amount / 12;
      case "monthly":
      default:
        return amount;
    }
  };

  // Calculates total amount in preferred currency
  const calculateTotalAmount = async () => {
    let total = 0;
  
    for (let subscription of subscriptions) {
      const currencyMatch = subscription.currency.match(/\((\w{3})\)/);
      if (!currencyMatch) {
        console.error("Unexpected currency format:", subscription.currency);
        continue;
      }
  
      const subscriptionCurrency = currencyMatch[1];
      let adjustedAmount = adjustAmountToRecurrence(
        parseFloat(subscription.amount),
        subscription.recurrence
      );
  
      if (subscriptionCurrency !== preferredCurrency) {
        adjustedAmount = await convertCurrency(
          subscriptionCurrency,
          preferredCurrency,
          adjustedAmount
        );
      }
  
      // If the subscription is shared, divide the amount here, after currency conversion
      if (subscription.shared_with > 0) {
        adjustedAmount = adjustedAmount / (subscription.shared_with + 1);
      }
  
      total += adjustedAmount;
    }
    setTotalAmount(total);
  };

  // This will be used in the interval dropdown to display the amount depending on interval
  const adjustTotalsToInterval = (monthlyTotal, interval) => {
    switch (interval.toLowerCase()) {
      case "weekly":
        return monthlyTotal / 4;
      case "yearly":
        return monthlyTotal * 12;
      case "monthly":
      default:
        return monthlyTotal;
    }
  };

  // Gets the start date and end date of the current interval
  const getCurrentIntervalDates = (interval) => {
    const now = new Date();
    let startDate, endDate;

    switch (interval.toLowerCase()) {
      case "monthly":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case "yearly":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      case "weekly":
        const day = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - day);
        endDate = new Date(now);
        endDate.setDate(now.getDate() + (6 - day));
        break;
      default:
        throw new Error("Invalid interval");
    }

    return { startDate, endDate };
  };

  // Filters the subscriptions based on the current interval
  const calculateTotalForCurrentInterval = async (interval) => {
    const { startDate, endDate } = getCurrentIntervalDates(interval);
  
    const relevantSubscriptions = subscriptions.filter((subscription) => {
      const nextPaymentDate = new Date(subscription.payment_date);
      return nextPaymentDate >= startDate && nextPaymentDate <= endDate;
    });
  
    let total = 0;
  
    for (let subscription of relevantSubscriptions) {
      const currencyMatch = subscription.currency.match(/\((\w{3})\)/);
      if (!currencyMatch) {
        console.error("Unexpected currency format:", subscription.currency);
        continue;
      }
  
      const subscriptionCurrency = currencyMatch[1];
      let adjustedAmount = adjustAmountToRecurrence(
        parseFloat(subscription.amount),
        subscription.recurrence
      );
  
      if (subscriptionCurrency !== preferredCurrency) {
        adjustedAmount = await convertCurrency(
          subscriptionCurrency,
          preferredCurrency,
          adjustedAmount
        );
      }
  
      // If the subscription is shared, divide the amount here, after currency conversion
      if (subscription.shared_with > 0) {
        adjustedAmount = adjustedAmount / (subscription.shared_with + 1);
      }
  
      total += adjustedAmount;
    }
  
    return total;
  };

  // Recalculate total amount when interval changes
  useEffect(() => {
    if (selectedMetric.toLowerCase() === "total") {
      calculateTotalForCurrentInterval(selectedInterval).then((total) => {
        setTotalAmount(total);
      });
    } else if (selectedMetric.toLowerCase() === "average") {
      // The logic I already have for average
      calculateTotalAmount();
    }
  }, [subscriptions, preferredCurrency, selectedMetric, selectedInterval]);

  // Rerenders subscription list when one is deleted
  const removeSubscriptionById = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.subscription_id !== id));
  };

  // Recalculate total amount when subscriptions or preferred currency changes
  useEffect(() => {
    calculateTotalAmount();
  }, [subscriptions, preferredCurrency]);

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
          totalAmount={totalAmount}
          adjustTotalsToInterval={adjustTotalsToInterval}
          preferredCurrency={preferredCurrency}
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
            <h1 className="py-2 text-4xl">
              {adjustTotalsToInterval(totalAmount, selectedInterval).toFixed(2)}{" "}
              {preferredCurrency}
            </h1>
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
                id={subscription.subscription_id}
                imageContent={subscription.logo}
                name={subscription.name}
                selectedCurrency={subscription.currency}
                amount={subscription.amount}
                sharedNumber={subscription.shared_with}
                recurrence={subscription.recurrence}
                nextPaymentDate={subscription.payment_date}
                website={subscription.website}
                color={subscription.color}
                removeSubscriptionById={removeSubscriptionById}
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
