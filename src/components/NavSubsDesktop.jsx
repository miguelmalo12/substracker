import Filters from "../components/Filters";
import ButtonSmall from "./ButtonSmall";
import DropdownFilter from "./DropdownFilter";

function NavSubsDesktop({
  content,
  selectedInterval,
  selectedMetric,
  setSelectedInterval,
  setSelectedMetric,
  handleAddClick,
  totalAmount,
  adjustTotalsToInterval,
  preferredCurrency,
  setFilteredCategory,
}) {
  return (
    <header className="hidden w-full gap-5 pt-3 mb-4 md:flex">
      {/* Left Card */}
      <div className="flex flex-col justify-between w-2/3 h-34">
        <nav className="flex items-center justify-between w-full pb-5 pl-0">
          <h1 className="content-center text-3xl">{content}</h1>
          <ButtonSmall content={"+ Add"} type={"primary"} onClick={handleAddClick}/>
        </nav>

        <Filters setFilteredCategory={setFilteredCategory}  />
        <div className="border"></div>
      </div>

      {/* Right Card */}
      <div className="w-1/3 flex h-34 gap-2.5 p-5 justify-between card min-w-max">

        <div className="flex flex-col">
          <h1 className="py-2 text-4xl">{adjustTotalsToInterval(totalAmount, selectedInterval).toFixed(2)} {preferredCurrency}</h1>
          <h4 className="text-xl text-medium-grey">
            {selectedInterval} {selectedMetric}
          </h4>
        </div>
        <div className="flex flex-col gap-3">
          <DropdownFilter
            options={["Monthly", "Yearly", "Weekly"]}
            onChange={setSelectedInterval}
          />
          <DropdownFilter
            options={["Average", "Total"]}
            onChange={setSelectedMetric}
          />
        </div>
      </div>
    </header>
  );
}

export default NavSubsDesktop;
