import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { mobileMenuState } from "../state/mobileMenuState";
import { currencyRatesState } from "../state/currencyRatesState";
import { userState } from "../state/userState";
import { filtersState } from "../state/filtersState";

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

function Subscriptions({ menuRef }) {
  const navigate = useNavigate();
  // Recoil States
  const user = useRecoilValue(userState);
  const rates = useRecoilValue(currencyRatesState);
  const [isMenuVisible, setMenuVisible] = useRecoilState(mobileMenuState);

  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [selectedMetric, setSelectedMetric] = useState("Average");
  const intervalMapping = {
    "Monthly": "Current Month",
    "Yearly": "Current Year",
    "Weekly": "Current Week"
  };
  let displayInterval = selectedMetric === "Total" ? intervalMapping[selectedInterval] : selectedInterval;


  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [preferredCurrency, setPreferredCurrency] = useState("C$");
  const [totalAmount, setTotalAmount] = useState(0); // This will show the monthly average by default

  // Variables used for Sort
  const [sorteredSubscriptions, setSorteredSubscriptions] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("Due Date");
  const [searchTerm, setSearchTerm] = useState("");

  // Variables coming from Filters
  const [filters, setFilters] = useRecoilState(filtersState);
  const [, setFilteredSubscriptions] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState(null);
  const [checkedCurrency, setCheckedCurrency] = useState(null);
  const [checkedPaymentMethod, setCheckedPaymentMethod] = useState(null);
  const [checkedShared, setCheckedShared] = useState(null);

  const [subscriptionsToRender, setSubscriptionsToRender] = useState([]);

  const handleAddClick = () => {
    navigate("/add-subscription");
  };

  //GET Subscriptions
  useEffect(() => {
    axios
      .get(`${baseURL}/api/subscriptions/`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.subscriptions)) {
          setSubscriptions(response.data.subscriptions);
          setSorteredSubscriptions([...response.data.subscriptions]);
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

  // Caculates amount after "shared with" value; used in Card and in Sort function
  const calculateActualAmount = (amount, sharedNumber) => {
    return Number(sharedNumber) > 0
      ? Number(amount) / (Number(sharedNumber) + 1)
      : Number(amount);
  };

  // SORT subscriptions by criteria selected
  const sortSubscriptions = (criteria, subscriptionsToSort) => {
    if (!Array.isArray(subscriptionsToSort)) {
      console.error('Invalid argument: subscriptionsToSort must be an array');
      return [];
    }
    
    let sortedSubscriptions = [...subscriptionsToSort];

    if (criteria === "Due Date") {
      sortedSubscriptions.sort(
        (a, b) => new Date(a.payment_date) - new Date(b.payment_date)
      );
    } else if (criteria === "Amount") {
      sortedSubscriptions.sort((a, b) => {
        const actualAmountA = calculateActualAmount(a.amount, a.shared_with);
        const actualAmountB = calculateActualAmount(b.amount, b.shared_with);

        const convertedAmountA = convertCurrency(
          a.currency,
          "United States Dollar (USD)",
          actualAmountA,
          rates
        );
        const convertedAmountB = convertCurrency(
          b.currency,
          "United States Dollar (USD)",
          actualAmountB,
          rates
        );

        return convertedAmountA - convertedAmountB;
      });
    } else if (criteria === "Name") {
      sortedSubscriptions.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedSubscriptions;
  };

  //GET user's preferred currency
  useEffect(() => {
    const userId = user.user_id;
   
    axios
      .get(`${baseURL}/api/users/${userId}`)
      .then((response) => {
        if (
          response.data &&
          response.data.user &&
          response.data.user.preferred_currency
        ) {
          setPreferredCurrency(response.data.user.preferred_currency);
        } else {
          console.error("Unexpected data format:", response.data);
          setPreferredCurrency("C$"); // set to default
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setPreferredCurrency("C$"); // set to default
      });
  }, [user]);

  // This will convert the global state rates to a 3 letter format that the convertCurrency function expects
  const extractCurrencyCode = (currencyStr) => {
    const currencyMatch = currencyStr.match(/\((\w{3})\)/);
    if (!currencyMatch) {
      return currencyStr; // Fallback
    }
    return currencyMatch[1];
  };

  // Converts currency used inside calculateTotalAmount and calculateTotalForCurrentInterval function
  const convertCurrency = (fromCurrency, toCurrency, amount, rates) => {
    const fromCurrencyCode = extractCurrencyCode(fromCurrency);
    const toCurrencyCode = extractCurrencyCode(toCurrency);

    if (!rates[fromCurrencyCode] || !rates[toCurrencyCode]) {
      console.error("Invalid currency");
      return amount; // Fallback
    }

    return (amount * rates[toCurrencyCode]) / rates[fromCurrencyCode];
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
  const calculateTotalAmount = async (subscriptionsToCalculate) => {
    if (!Array.isArray(subscriptionsToCalculate)) {
      console.error("subscriptionsToCalculate is not an array:", subscriptionsToCalculate);
      return;
    }
    
    let total = 0;

    for (let subscription of subscriptionsToCalculate) {
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
          adjustedAmount,
          rates
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

  // Calculates total based on the current interval on dropdown
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
          adjustedAmount,
          rates
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

  // Rerenders subscription list when one is deleted
  const removeSubscriptionById = (id) => {
    const newSubscriptions = subscriptions.filter(
      (sub) => sub.subscription_id !== id
    );
    setSubscriptions(newSubscriptions);
    setSorteredSubscriptions(newSubscriptions);
  };

  // Converts currency 3 letter code to symbol
  const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case 'CAD':
        return 'C$';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      default:
        return currencyCode;
    }
  };

  // Applies FILTERS
  const applyFilters = (unfilteredSubscriptions) => {
    let filteredSubscriptions = [...unfilteredSubscriptions];
    
    const { categoryFilter, currencyFilter, paymentMethodFilter, sharedFilter } = filters;
  
    if (categoryFilter) {
      filteredSubscriptions = filteredSubscriptions.filter(sub => sub.category_name === categoryFilter);
    }

    if (currencyFilter) {
      filteredSubscriptions = filteredSubscriptions.filter(sub => sub.currency === currencyFilter);
    }

    if (paymentMethodFilter) {
      filteredSubscriptions = filteredSubscriptions.filter(sub => sub.payment_method === paymentMethodFilter);
    }

    if (sharedFilter) {
      if (sharedFilter === 'Personal') {
        filteredSubscriptions = filteredSubscriptions.filter(sub => sub.shared_with === 0);
      } else if (sharedFilter === 'Shared') {
        filteredSubscriptions = filteredSubscriptions.filter(sub => sub.shared_with > 0);
      }
    }
    
    return filteredSubscriptions;
  };

  const updateFilter = (filterName, newValue) => {
    setFilters({
      ...filters,
      [filterName]: newValue
    });
  };

  useEffect(() => {
    const filtered = applyFilters(sorteredSubscriptions);
    setFilteredSubscriptions(filtered);
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // Checks if any filter is active
  const isAnyFilterActive = Boolean(checkedCurrency || checkedPaymentMethod || checkedCategory || checkedShared);

  // Resets FILTERS
  const resetFilters = () => {
    setFilters({
      categoryFilter: null,
      currencyFilter: null,
      paymentMethodFilter: null,
      sharedFilter: null,
    });
    setCheckedCategory(null);
    setCheckedCurrency(null);
    setCheckedPaymentMethod(null);
    setCheckedShared(null);
  };

  // Makes sure filters are reset when component is unmounted
  useEffect(() => {
    return () => {
      resetFilters();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // This will set the subscriptions to be rendered after search / filters / sort
  const processSubscriptions = (subscriptions) => {
    let searchableSubscriptions = subscriptions.filter((subscription) =>
      subscription.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    let filteredSubscriptions = applyFilters(searchableSubscriptions);
    
    let sortedSubscriptions = sortSubscriptions(sortCriteria, filteredSubscriptions);
  
    return sortedSubscriptions;
  };

  useEffect(() => {
    const processedSubscriptions = processSubscriptions(subscriptions);
    setSubscriptionsToRender(processedSubscriptions);
  }, [subscriptions, filters, sortCriteria, searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Recalculate total amount when parameters change
  useEffect(() => {
    const subscriptionsToUse = selectedMetric.toLowerCase() === "average" ? subscriptionsToRender : subscriptions;
  
    if (selectedMetric.toLowerCase() === "total") {
      calculateTotalForCurrentInterval(selectedInterval).then((total) => {
        setTotalAmount(total);
      });
    } else if (selectedMetric.toLowerCase() === "average") {
      calculateTotalAmount(subscriptionsToUse);
    }
  }, [subscriptions, subscriptionsToRender, preferredCurrency, selectedMetric, selectedInterval, filters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="responsive-padding dark:bg-dark md:pl-28 max-w-7xl md:min-h-screen md:flex md:flex-col">
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
          displayInterval={displayInterval}
          handleAddClick={handleAddClick}
          totalAmount={totalAmount}
          adjustTotalsToInterval={adjustTotalsToInterval}
          preferredCurrency={preferredCurrency}
          sortSubscriptions={sortSubscriptions}
          setSearchTerm={setSearchTerm}
          getCurrencySymbol={getCurrencySymbol}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          setSortCriteria={setSortCriteria}
          checkedCategory={checkedCategory}
          setCheckedCategory={setCheckedCategory}
          checkedCurrency={checkedCurrency}
          setCheckedCurrency={setCheckedCurrency}
          checkedPaymentMethod={checkedPaymentMethod}
          setCheckedPaymentMethod={setCheckedPaymentMethod}
          checkedShared={checkedShared}
          setCheckedShared={setCheckedShared}
          isAnyFilterActive={isAnyFilterActive}
        />

        {/* Menu on Mobile */}
        <div ref={menuRef}>
          {isMenuVisible && <MenuMobile activePage="subscriptions" />}
        </div>
        {/* Menu on Desktop */}
        <div className="hidden md:block">
          <MenuDesktop activePage="subscriptions" />
        </div>

        {/* Top section only visible on Mobile */}
        <section className="md:hidden dark:text-light-grey">
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
              <span className="text-xl">{getCurrencySymbol(preferredCurrency)}</span>
            </h1>
            <h4 className="text-medium-grey">
              {displayInterval} {selectedMetric}
            </h4>
          </div>
          <div className="mt-6 mb-6 border"></div>
          <Filters
            sortSubscriptions={sortSubscriptions}
            setSearchTerm={setSearchTerm}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            setSortCriteria={setSortCriteria}
            checkedCategory={checkedCategory}
            setCheckedCategory={setCheckedCategory}
            checkedCurrency={checkedCurrency}
            setCheckedCurrency={setCheckedCurrency}
            checkedPaymentMethod={checkedPaymentMethod}
            setCheckedPaymentMethod={setCheckedPaymentMethod}
            checkedShared={checkedShared}
            setCheckedShared={setCheckedShared}
            isAnyFilterActive={isAnyFilterActive}
          />
        </section>

        <div className="relative">
          {!loading && sorteredSubscriptions.length === 0 ? (
            <div className="flex items-center justify-center">
              <NoSubs />
            </div>
          ) : (
            <div
              className="grid gap-2.5 mb-5"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              }}
            >
              {subscriptionsToRender.map((subscription) => (
                <Card
                  key={subscription.subscription_id}
                  id={subscription.subscription_id}
                  imageContent={subscription.logo}
                  name={subscription.name}
                  description={subscription.description}
                  category={subscription.category_name}
                  selectedCurrency={subscription.currency}
                  amount={subscription.amount}
                  actualAmount={calculateActualAmount(
                    subscription.amount,
                    subscription.shared_with
                  )}
                  sharedNumber={subscription.shared_with}
                  recurrence={subscription.recurrence}
                  nextPaymentDate={subscription.payment_date}
                  reminderDays={subscription.reminder_days}
                  paymentMethod={subscription.payment_method}
                  website={subscription.website}
                  color={subscription.color}
                  removeSubscriptionById={removeSubscriptionById}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Subscriptions;
