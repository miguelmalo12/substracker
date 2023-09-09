import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkModeState } from "../state/darkModeState";
import { currencyListState } from "../state/currencyListState";
import { paymentMethodsState } from "../state/paymentMethodsState";

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

function Filters({
  sortSubscriptions,
  setSearchTerm,
  updateFilter,
  resetFilters,
  setSortCriteria,
  checkedCategory,
  setCheckedCategory,
  checkedCurrency,
  setCheckedCurrency,
  checkedPaymentMethod,
  setCheckedPaymentMethod,
  checkedShared,
  setCheckedShared,
  isAnyFilterActive,
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

  const paymentMethods = useRecoilValue(paymentMethodsState);

  return (
    <div className="z-10 flex items-center justify-between pb-6 md:pb-0">
      <div className="flex gap-1 mr-5 md:mr-0 md:gap-6">
        {/* Filter popover */}
        <div className="flex relative p-1.5 rounded items-center cursor-pointer">
          <DropdownMenu.Root>
            <div className={`${isAnyFilterActive ? 'text-primary' : ''}`}>
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
                    alignOffset={-8}
                    className={`min-w-[220px] -ml-24 md:ml-0 rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
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
                          setCheckedCategory(category);
                        }}
                        className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-primary hover:text-white ${
                          darkMode ? "hover:bg-dark !important" : ""
                        }`}
                      >
                        <p className={checkedCategory === category ? "font-bold" : ""}>
                          {category}
                        </p>
                        {checkedCategory === category && <CheckIcon className="ml-auto" />}

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
                    alignOffset={-8}
                    className={`min-w-[220px] -ml-24 md:ml-0 rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
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
                          setCheckedCurrency(currency);
                        }}
                        className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-primary hover:text-white ${
                          darkMode ? "hover:bg-dark !important" : ""
                        }`}
                      >
                        <p className={checkedCurrency === currency ? "font-bold" : ""}>
                          {currency}
                        </p>
                        {checkedCurrency === currency && <CheckIcon className="ml-auto" />}

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
                    className={`min-w-[220px] -ml-24 md:ml-0 rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
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
                          setCheckedPaymentMethod(method.method_name);
                        }}
                        className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-primary hover:text-white ${
                          darkMode ? "hover:bg-dark !important" : ""
                        }`}
                      >
                        <p className={checkedPaymentMethod === method.method_name ? "font-bold" : ""}>
                          {method.method_name}
                        </p>
                        {checkedPaymentMethod === method.method_name && <CheckIcon className="ml-auto" />}

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
                    className={`min-w-[220px] -ml-24 md:ml-0 rounded-md p-1.5 shadow-lg animate animate-fadeInEase ${
                      darkMode
                        ? "bg-dark-grey text-light-grey border-dark border"
                        : "bg-white"
                    }`}
                  >
                    <DropdownMenu.Item
                      className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-primary hover:text-white ${
                        darkMode ? "hover:bg-dark !important" : ""
                      }`}
                      onSelect={ () => {
                        updateFilter('sharedFilter', "Personal");
                        setCheckedShared("Personal");
                       }}
                    >
                      <p className={checkedShared === "Personal" ? "font-bold" : ""}>
                          Personal
                        </p>
                      {checkedShared === "Personal" && <CheckIcon className="ml-auto" />}

                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className={`relative flex items-center h-6 pl-6 text-sm leading-none rounded outline-none cursor-pointer select-none hover:bg-primary hover:text-white ${
                        darkMode ? "hover:bg-dark !important" : ""
                      }`}
                      onSelect={ () => {
                        updateFilter('sharedFilter', "Shared");
                        setCheckedShared("Shared");
                       }}
                    >
                      <p className={checkedShared === "Shared" ? "font-bold" : ""}>
                          Shared
                        </p>
                      {checkedShared === "Shared" && <CheckIcon className="ml-auto" />}

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
                  <h4 className="pl-3 font-semibold ">
                    Due Date
                  </h4>
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
                  <h4 className="pl-3 font-semibold">Amount</h4>
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
                  <h4 className="pl-3 font-semibold">Name</h4>
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
