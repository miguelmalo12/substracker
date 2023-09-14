import { useRecoilValue } from 'recoil';
import { darkModeState } from "../state/darkModeState";

import currencyIcons from "../utils/CurrencyIcons";

import Tooltip from "./Tooltip";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

// Category icons
import SoftwareIcon from "../assets/icons/categories/software&apps.svg";
import TransportationIcon from "../assets/icons/categories/transportation.svg";
import MiscellaneousIcon from "../assets/icons/categories/miscellaneous.svg";
import EducationIcon from "../assets/icons/categories/education&learning.svg";
import UtilitiesIcon from "../assets/icons/categories/utilities.svg";
import FoodIcon from "../assets/icons/categories/food&beverages.svg";
import EntertainmentIcon from "../assets/icons/categories/entertainment.svg";
import HealthIcon from "../assets/icons/categories/health&fitness.svg";
import TelecommunicationsIcon from "../assets/icons/categories/telecommunications.svg";
import FinanceIcon from "../assets/icons/categories/banking&finance.svg";
import InsuranceIcon from "../assets/icons/categories/insurance.svg";

function FieldBorder({ title, type, options, value, placeholder, onChange }) {
  const darkMode = useRecoilValue(darkModeState);

  if (type === "select" && (!options || options.length === 0)) return null;

  const handleValueChange = (eventOrValue) => {
   
    if (onChange) {
      // If it's an event (ex: a standard input like 'date' has triggered the change)
      if (eventOrValue && eventOrValue.target) {
        onChange(eventOrValue);
      } else {
        // Otherwise, it's a value from the custom select component
        onChange({ target: { value: eventOrValue } });
      }
    }
  };

  const categoryIcons = {
    "Banking & Finance": <img className='w-7 h-7' src={FinanceIcon} alt="Banking & Finance" />,
    "Education & Learning": <img className='w-7 h-7' src={EducationIcon} alt="Education & Learning" />,
    "Entertainment": <img className='w-7 h-7' src={EntertainmentIcon} alt="Entertainment" />,
    "Food & Beverages": <img className='w-7 h-7' src={FoodIcon} alt="Food & Beverages" />,
    "Health & Fitness": <img className='w-7 h-7' src={HealthIcon} alt="Health & Fitness" />,
    "Insurance": <img className='w-7 h-7' src={InsuranceIcon} alt="Insurance" />,
    "Miscellaneous": <img className='w-7 h-7' src={MiscellaneousIcon} alt="Miscellaneous" />,
    "Software & Apps": <img className='w-7 h-7' src={SoftwareIcon} alt="Software & Apps" />,
    "Telecommunications": <img className='w-7 h-7' src={TelecommunicationsIcon} alt="Telecommunications" />,
    "Transportation": <img className='w-7 h-7' src={TransportationIcon} alt="Transportation" />,
    "Utilities & Home Expenses": <img className='w-7 h-7' src={UtilitiesIcon} alt="Utilities & Home Expenses" />,
  };

  return (
    <div className="flex items-center justify-between pt-4 pb-2 border-b-2 dark:border-medium-grey">
      <div className="flex">
        {" "}
        <h2 className="mr-3">{title}</h2>
        {title === "Payment Method" && (
          <div className='hidden md:block'>
            <Tooltip
              content={"You can add your own custom payment methods from the Settings page."}
            />
          </div>
          
        )}
      </div>
      {type === "select" ? (
        <Select.Root
          className="w-full p-2 text-right border-none"
          value={value}
          onValueChange={handleValueChange}
        >
          <Select.Trigger
            className={`inline-flex items-center justify-center text-right h-6 gap-1 leading-none rounded cursor-pointer ${
              value ? "" : "text-gray-300 dark:text-zinc-500"
            }`}
          >
            <Select.Value>
              {value || placeholder || "Select an Option"}
            </Select.Value>{" "}
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              side={title === "Payment Method" ? 'top' : undefined}
              position={title === "Payment Method" ? 'popper' : undefined}
              className={`overflow-hidden rounded md:-ml-12 drop-shadow ${
                darkMode ? "bg-dark-grey border border-dark drop-shadow" : "bg-white"
              }`}
            >
              <Select.ScrollUpButton className="flex items-center justify-center h-7">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-4">
                {options.map((option, index) => (
                  <Select.Item
                    key={index}
                    value={option}
                    className={`relative dropdown-item flex items-center h-6 px-6 text-xs leading-none rounded select-none hover:bg-primary ${
                      darkMode ? "text-light-grey" : ""
                    } hover:text-white ${
                      title === "Category" ? "mb-2" : ""
                    }`}
                  >
                    {title === "Category" && <span className="mr-2">{categoryIcons[option]}</span>}
                    {title === "Currency" && <span className="mr-2">{currencyIcons[option]}</span>}
                    {title === "Preferred Currency" && <span className="mr-2">{currencyIcons[option]}</span>}

                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-0 inline-flex items-center justify-center w-6 ">
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center h-7">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
              <Select.Arrow />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      ) : type === "date" ? (
        <div className="flex-grow text-right">
          <input
            className={`border-none dark:bg-dark md:dark:bg-dark-grey text-right ${
              !value ? "text-gray-300 dark:text-zinc-500 bg-white" : ""
            }`}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handleValueChange}
          />
        </div>
      ) : (
        <input
          className="flex-grow text-right border-none dark:bg-dark md:dark:bg-dark-grey"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleValueChange}
        />
      )}
    </div>
  );
}

export default FieldBorder;
