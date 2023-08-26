import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PopoverSort from "./PopoverSort";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ReactComponent as FilterIcon } from "../assets/icons/filter.svg";
import { ReactComponent as SortIcon } from "../assets/icons/sort.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as CategoryIcon } from "../assets/icons/category.svg";
import { ReactComponent as CurrencyIcon } from "../assets/icons/currency.svg";
import { ReactComponent as PaymentIcon } from "../assets/icons/pay_method.svg";
import { ReactComponent as SharedIcon } from "../assets/icons/users_shared.svg";
import { ReactComponent as ChevronRight } from "../assets/icons/chevron_right.svg";
import { ReactComponent as CheckIcon } from "../assets/icons/check.svg";

const baseURL = process.env.REACT_APP_BASE_URL;

function Filters({ setFilteredCategory, resetFilters, sortSubscriptions }) {
  const [active, setActive] = useState(null);
  const [showPopoverSort, setShowPopoverSort] = useState(false);
  const [checkedItem, setCheckedItem] = useState("Due Date"); // This is for sort dropdown

  const categoryList = [
    "Entertainment",
    "Software & Apps",
    "Telecommunications",
    "Health & Fitness",
    "Food & Beverages",
    "Banking & Finance",
    "Insurance",
    "Transportation",
    "Education & Learning",
    "Utilities & Home Expenses",
    "Miscellaneous",
  ];

  const currencyList = [
    "Australian Dollar (AUD)",
    "Bulgarian Lev (BGN)",
    "Brazilian Real (BRL)",
    "Canadian Dollar (CAD)",
    "Swiss Franc (CHF)",
    "Chinese Yuan (CNY)",
    "Czech Koruna (CZK)",
    "Danish Krone (DKK)",
    "Euro (EUR)",
    "British Pound Sterling (GBP)",
    "Hong Kong Dollar (HKD)",
    "Croatian Kuna (HRK)",
    "Hungarian Forint (HUF)",
    "Indonesian Rupiah (IDR)",
    "Israeli New Shekel (ILS)",
    "Indian Rupee (INR)",
    "Icelandic Króna (ISK)",
    "Japanese Yen (JPY)",
    "South Korean Won (KRW)",
    "Mexican Peso (MXN)",
    "Malaysian Ringgit (MYR)",
    "Norwegian Krone (NOK)",
    "New Zealand Dollar (NZD)",
    "Philippine Peso (PHP)",
    "Polish Złoty (PLN)",
    "Romanian Leu (RON)",
    "Russian Ruble (RUB)",
    "Swedish Krona (SEK)",
    "Singapore Dollar (SGD)",
    "Thai Baht (THB)",
    "Turkish Lira (TRY)",
    "US Dollar (USD)",
    "South African Rand (ZAR)",
  ];

  const [paymentMethods, setPaymentMethods] = useState([]);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const handleSortItemClick = (sortItem) => {
    setCheckedItem(sortItem);
    sortSubscriptions(sortItem);
  };

  // Can delete
  useEffect(() => {
    const handleOutsideClick = (event) => {
      let shouldHideAll = true;

      if (filterRef.current && filterRef.current.contains(event.target)) {
        shouldHideAll = false;
      }

      if (sortRef.current && sortRef.current.contains(event.target)) {
        shouldHideAll = false;
      }

      if (shouldHideAll) {
        setShowPopoverSort(false);
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // GETS payment methods

  useEffect(() => {
    // Fetch payment methods when the component mounts
    axios
      .get(`${baseURL}/api/methods/`)
      .then((response) => {
        setPaymentMethods(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching payment methods", error);
      });
  }, []);

  const handleDivClick = (divName) => {
    if (active === divName) {
      setActive(null);
      setShowPopoverSort(false);
    } else {
      setActive(divName);
      setShowPopoverSort(divName === "sort");
    }
  };

  return (
    <div className="z-10 flex items-center justify-between pb-6 md:pb-0">
      <div className="flex gap-6">
        {/* Filter popover */}
        <div className="flex relative p-1.5 rounded items-center cursor-pointer">
          <DropdownMenu.Root>
            <div
              // ref={filterRef}
              className={`p-1.5 flex rounded ${
                active === "filter" ? "text-primary bg-primary-bg" : ""
              }`}
              onClick={() => handleDivClick("filter")}
            >
              <DropdownMenu.Trigger className="flex">
                <FilterIcon className="mr-3" />
                <h4>Filter</h4>
              </DropdownMenu.Trigger>
            </div>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="flex flex-col gap-5 p-4 mb-3 md:ml-20 card">
                <h4
                  onClick={resetFilters}
                  className="cursor-pointer text-primary"
                >
                  Reset Filter
                </h4>
                <DropdownMenu.Separator className="border border-border" />

                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between">
                    <div className="flex">
                      <CategoryIcon className="w-6 h-6 mr-3" />
                      <h4>Category</h4>
                    </div>
                    <ChevronRight className="w-3 h-3 ml-4" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    sideOffset={12}
                    alignOffset={-5}
                    className="min-w-[220px] bg-white rounded-md p-1.5 shadow-lg animate animate-fadeInEase"
                  >
                    {categoryList.map((category, index) => (
                      <DropdownMenu.Item
                        key={index}
                        onSelect={() => {
                          setFilteredCategory(category);
                        }}
                        className="relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100"
                      >
                        <p>{category}</p>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>

                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between">
                    <div className="flex">
                      <CurrencyIcon className="w-6 h-6 mr-3" />
                      <h4>Currency</h4>
                    </div>
                    <ChevronRight className="w-3 h-3 ml-4" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    sideOffset={12}
                    alignOffset={-5}
                    className="min-w-[220px] bg-white rounded-md p-1.5 shadow-lg animate animate-fadeInEase"
                  >
                    {currencyList.map((currency, index) => (
                      <DropdownMenu.Item
                        key={index}
                        onSelect={() => {
                          // Handle the selection of the currency here
                          console.log(`Selected currency: ${currency}`);
                        }}
                        className="relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100"
                      >
                        <p>{currency}</p>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>

                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between">
                    <div className="flex">
                      <PaymentIcon className="w-6 h-6 mr-3" />
                      <h4>Payment Method</h4>
                    </div>
                    <ChevronRight className="w-3 h-3 ml-4" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    sideOffset={12}
                    alignOffset={-5}
                    className="min-w-[220px] bg-white rounded-md p-1.5 shadow-lg animate animate-fadeInEase"
                  >
                    {paymentMethods.map((method, index) => (
                      <DropdownMenu.Item
                        key={index}
                        onSelect={() => {
                          // Handle the selection of the category here
                          console.log(`Selected method: ${method.method_name}`);
                        }}
                        className="relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100"
                      >
                        <p>{method.method_name}</p>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>

                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between">
                    <div className="flex">
                      <SharedIcon className="mr-3 w-7 h-7" />
                      <h4>Shared</h4>
                    </div>
                    <ChevronRight className="w-3 h-3 ml-4" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    sideOffset={12}
                    alignOffset={-5}
                    className="min-w-[220px] bg-white rounded-md p-1.5 shadow-lg animate animate-fadeInEase"
                  >
                    <DropdownMenu.Item className="relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100">
                      <p>Personal</p>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100">
                      <p>Shared</p>
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        {/* Sort popover */}
        <div className="flex relative p-1.5 rounded items-center cursor-pointer">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex">
              <SortIcon className="mr-3" />
              <h4>Sort</h4>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="flex flex-col w-48 gap-5 p-4 mb-3 md:ml-20 card">
                <DropdownMenu.Item className="mb-2">
                  <h4 className="mb-4">Sorty By</h4>
                  <DropdownMenu.Separator className="border border-border" />
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                  className="flex items-center cursor-pointer"   
                  onClick={() => {
                    setCheckedItem("Due Date");
                    sortSubscriptions("Due Date");
                  }}
                >
                  <SortIcon />
                  <h3 className="pl-3 font-semibold text-dark-grey">
                    Due Date
                  </h3>
                  {checkedItem === "Due Date" && (
                    <CheckIcon className="ml-auto" />
                  )}
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                  className="flex items-center cursor-pointer"   
                  onClick={() => {
                    setCheckedItem("Amount");
                    sortSubscriptions("Amount");
                  }}
                >
                  <SortIcon />
                  <h3 className="pl-3 font-semibold text-dark-grey">Amount</h3>
                  {checkedItem === "Amount" && (
                    <CheckIcon className="ml-auto" />
                  )}
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCheckedItem("Name");
                    sortSubscriptions("Name");
                  }}
                >
                  <SortIcon />
                  <h3 className="pl-3 font-semibold text-dark-grey">Name</h3>
                  {checkedItem === "Name" && <CheckIcon className="ml-auto" />}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="flex p-1.5 cursor-pointer">
        <SearchIcon className="mr-3" />
        <h4>Search</h4>
      </div>
    </div>
  );
}

export default Filters;
