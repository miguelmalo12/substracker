import { ReactComponent as SortIcon } from "../assets/icons/sort_three.svg";

function PopoverSort() {
  return (
    <div className='absolute w-48 p-4 card top-10'>
        <div className="pb-3 mb-6 border-b">
            <h2 className="font-semibold text-dark-grey">Sort by</h2>
        </div>
        <div>
            <div className="flex items-center pb-4 cursor-pointer">
                <SortIcon />
                <h3 className="pl-3 font-semibold text-dark-grey">Name</h3>
            </div>
            <div className="flex items-center pb-4 cursor-pointer">
                <SortIcon />
                <h3 className="pl-3 font-semibold text-dark-grey">Amount</h3>
            </div>
            <div className="flex items-center cursor-pointer">
                <SortIcon />
                <h3 className="pl-3 font-semibold text-dark-grey">Due Date</h3>
            </div>
        </div>
    </div>
  )
}

export default PopoverSort