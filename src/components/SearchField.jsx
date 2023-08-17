import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

function SearchField({ placeholder}) {
  return (
    <div className="w-full inventory--header__search md:max-w-24">
      <div className="relative flex items-center mb-3 border rounded inventory--header__search--searchbar">
        <input
          className="w-full h-12 pl-3 border-none rounded bg-light-grey inventory--header__search--searchbar__input placeholder:text-sm placeholder:text-medium-grey"
          type="text"
          placeholder={placeholder}
        />
        <SearchIcon className="absolute right-0 mr-4 inventory--header__search--searchbar__icon text-medium-grey"  />
      </div>
    </div>
  )
}

export default SearchField