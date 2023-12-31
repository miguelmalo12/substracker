import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

function SearchField({ placeholder, setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="w-full h-10 lg:w-72">
      <div className="relative flex items-center mb-3 border rounded dark:border-dark">
        <input
          className="w-full h-10 pl-3 border-none rounded dark:bg-dark-grey bg-light-grey placeholder:text-sm placeholder:text-medium-grey"
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
        />
        <SearchIcon className="absolute right-0 mr-4 text-medium-grey"  />
      </div>
    </div>
  )
}

export default SearchField