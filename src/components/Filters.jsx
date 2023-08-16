import { ReactComponent as FilterIcon } from "../assets/icons/filter.svg";
import { ReactComponent as SortIcon } from "../assets/icons/sort.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

function Filters() {
  return (
    <div className="flex justify-between pb-6">
      <div className="flex gap-6">
        <div className="flex cursor-pointer">
          <FilterIcon className="mr-3" />
          <h4>Filter</h4>
        </div>
        <div className="flex cursor-pointer">
          <SortIcon className="mr-3" />
          <h4>Sort</h4>
        </div>
      </div>
      <div className="flex cursor-pointer">
        <SearchIcon className="mr-3" />
        <h4>Search</h4>
      </div>
    </div>
  );
}

export default Filters;
