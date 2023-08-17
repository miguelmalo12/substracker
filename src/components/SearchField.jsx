import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

function SearchField({ placeholder}) {
  return (
    <div className="w-full md:max-w-24">
      <div className="relative flex items-center mb-3 border rounded">
        <input
          className="w-full h-12 pl-3 border-none rounded bg-light-grey placeholder:text-sm placeholder:text-medium-grey"
          type="text"
          placeholder={placeholder}
        />
        <SearchIcon className="absolute right-0 mr-4 text-medium-grey"  />
      </div>
    </div>
  )
}

export default SearchField