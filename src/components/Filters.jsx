import { useState, useEffect, useRef } from "react";

import PopoverSort from "./PopoverSort";
import PopoverFilter from "./PopoverFilter";

import { ReactComponent as FilterIcon } from "../assets/icons/filter.svg";
import { ReactComponent as SortIcon } from "../assets/icons/sort.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

function Filters() {
  const [active, setActive] = useState(null);
  const [showPopoverSort, setShowPopoverSort] = useState(false);
  const [showPopoverFilter, setShowPopoverFilter] = useState(false);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

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
        setShowPopoverFilter(false);
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDivClick = (divName) => {
    if (active === divName) {
      setActive(null);
      setShowPopoverSort(false);
      setShowPopoverFilter(false);
    } else {
      setActive(divName);
      setShowPopoverSort(divName === "sort");
      setShowPopoverFilter(divName === "filter");
    }
  };

  return (
    <div className="flex justify-between pb-6 md:pb-0">
      <div className="flex gap-6">
        <div
          className={`flex relative p-1.5 rounded items-center cursor-pointer ${
            active === "filter" ? "text-primary bg-primary-bg" : ""
          }`}
          onClick={() => handleDivClick("filter")}
        >
          <FilterIcon className="mr-3" />
          <h4>Filter</h4>
          {showPopoverFilter && <PopoverFilter />}
        </div>
        <div
          ref={sortRef}
          className={`relative p-1.5 rounded items-center flex cursor-pointer ${
            active === "sort" ? "text-primary bg-primary-bg" : ""
          }`}
          onClick={() => handleDivClick("sort")}
        >
          <SortIcon className="mr-3" />
          <h4>Sort</h4>
          {showPopoverSort && <PopoverSort />}
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
