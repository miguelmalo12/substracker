import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

function SearchField({ placeholder, setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="w-full h-10 md:w-72">
      <div className="relative flex items-center mb-3 border rounded">
        <input
          className="w-full h-10 pl-3 border-none rounded bg-light-grey placeholder:text-sm placeholder:text-medium-grey"
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