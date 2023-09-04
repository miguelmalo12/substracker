import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { darkModeState } from "../state/darkModeState";
import { currencyListState } from "../state/currencyListState";

import SearchField from "./SearchField";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ReactComponent as FilterIcon } from "../assets/icons/filter.svg";
import { ReactComponent as SortIcon } from "../assets/icons/sort.svg";
import { ReactComponent as CategoryIcon } from "../assets/icons/category.svg";
import { ReactComponent as CurrencyIcon } from "../assets/icons/currency.svg";
import { ReactComponent as PaymentIcon } from "../assets/icons/pay_method.svg";
import { ReactComponent as SharedIcon } from "../assets/icons/users_shared.svg";
import { ReactComponent as ChevronRight } from "../assets/icons/chevron_right.svg";
import { ReactComponent as CheckIcon } from "../assets/icons/check.svg";

const baseURL = process.env.REACT_APP_BASE_URL;

function Filters({
  sortSubscriptions,
  setSearchTerm,
  updateFilter,
  resetFilters,
  setSortCriteria,
  checkedFilter,
  setCheckedFilter,
}) {
  const [darkMode] = useRecoilState(darkModeState);
  const [checkedItem, setCheckedItem] = useState("Due Date"); // This is for sort dropdown

  const [currencyList] = useRecoilState(currencyListState);
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

  const [paymentMethods, setPaymentMethods] = useState([]);

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

  return (
    <div className="z-10 flex items-center justify-between pb-6 md:pb-0">
      <div className="flex gap-1 mr-5 md:mr-0 md:gap-6">
        {/* Filter popover */}
        <div className="flex relative p-1.5 rounded items-center cursor-pointer">
          <DropdownMenu.Root>
            <div className={`${checkedFilter ? 'text-primary' : ''}`}>
              <DropdownMenu.Trigger className="flex">
                <FilterIcon className="mr-1 md:mr-3" />
                <h4>Filter</h4>
              </DropdownMenu.Trigger>
            </div>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className={`flex flex-col gap-5 p-4 mb-3 md:ml-20 border rounded drop-shadow ${
                  darkMode
                    ? "bg-dark-grey text-light-grey border-dark"
                    : "bg-white"
                }`}
              >
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
                    className={`min-w-[220px] rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
                      darkMode
                        ? "bg-dark-grey text-light-grey border-dark border"
                        : "bg-white"
                    }`}
                  >
                    {categoryList.map((category, index) => (
                      <DropdownMenu.Item
                        key={index}
                        onSelect={() => {
                          updateFilter('categoryFilter', category);
                          setCheckedFilter(category);
                        }}
                        className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100 hover:text-dark-grey ${
                          darkMode ? "hover:bg-dark !important" : ""
                        }`}
                      >
                        <p>{category}</p>
                        {checkedFilter === category && <CheckIcon className="ml-auto" />}

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
                    className={`min-w-[220px] rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
                      darkMode
                        ? "bg-dark-grey text-light-grey border-dark border"
                        : "bg-white"
                    }`}
                  >
                    {currencyList.map((currency, index) => (
                      <DropdownMenu.Item
                        key={index}
                        onSelect={() => {
                          updateFilter('currencyFilter', currency);
                          setCheckedFilter(currency);
                        }}
                        className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100 hover:text-dark-grey ${
                          darkMode ? "hover:bg-dark !important" : ""
                        }`}
                      >
                        <p>{currency}</p>
                        {checkedFilter === currency && <CheckIcon className="ml-auto" />}

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
                    className={`min-w-[220px] rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
                      darkMode
                        ? "bg-dark-grey text-light-grey border-dark border"
                        : "bg-white"
                    }`}
                  >
                    {paymentMethods.map((method, index) => (
                      <DropdownMenu.Item
                        key={index}
                        onSelect={() => {
                          updateFilter('paymentMethodFilter', method.method_name);
                          setCheckedFilter(method.method_name);
                        }}
                        className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100 hover:text-dark-grey ${
                          darkMode ? "hover:bg-dark !important" : ""
                        }`}
                      >
                        <p>{method.method_name}</p>
                        {checkedFilter === method.method_name && <CheckIcon className="ml-auto" />}

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
                    className={`min-w-[220px] rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
                      darkMode
                        ? "bg-dark-grey text-light-grey border-dark border"
                        : "bg-white"
                    }`}
                  >
                    <DropdownMenu.Item
                      className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100 hover:text-dark-grey ${
                        darkMode ? "hover:bg-dark !important" : ""
                      }`}
                      onSelect={ () => {
                        updateFilter('sharedFilter', "Personal");
                        setCheckedFilter("Personal");
                       }}
                    >
                      <p>Personal</p>
                      {checkedFilter === "Personal" && <CheckIcon className="ml-auto" />}

                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-gray-100 hover:text-dark-grey ${
                        darkMode ? "hover:bg-dark !important" : ""
                      }`}
                      onSelect={ () => {
                        updateFilter('sharedFilter', "Shared");
                        setCheckedFilter("Shared");
                       }}
                    >
                      <p>Shared</p>
                      {checkedFilter === "Shared" && <CheckIcon className="ml-auto" />}

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
              <SortIcon className="mr-2 md:mr-3" />
              <h4>Sort</h4>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className={`flex flex-col gap-5 p-4 mb-3 md:ml-20 border w-48 rounded drop-shadow ${
                  darkMode
                    ? "bg-dark-grey text-light-grey border-dark"
                    : "bg-white"
                }`}>
                <DropdownMenu.Item className="mb-2">
                  <h4 className="mb-4">Sorty By</h4>
                  <DropdownMenu.Separator className="border border-border" />
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCheckedItem("Due Date");
                    setSortCriteria("Due Date");
                    sortSubscriptions("Due Date");
                  }}
                >
                  <SortIcon />
                  <h3 className="pl-3 font-semibold ">
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
                    setSortCriteria("Amount");
                    sortSubscriptions("Amount");
                  }}
                >
                  <SortIcon />
                  <h3 className="pl-3 font-semibold">Amount</h3>
                  {checkedItem === "Amount" && (
                    <CheckIcon className="ml-auto" />
                  )}
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCheckedItem("Name");
                    setSortCriteria("Name");
                    sortSubscriptions("Name");
                  }}
                >
                  <SortIcon />
                  <h3 className="pl-3 font-semibold">Name</h3>
                  {checkedItem === "Name" && <CheckIcon className="ml-auto" />}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="flex cursor-pointer">
        <SearchField placeholder={"Search"} setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
}

export default Filters;
