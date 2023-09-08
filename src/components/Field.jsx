import { useRecoilValue } from "recoil";
import { darkModeState } from "../state/darkModeState";

import currencyIcons from "../utils/CurrencyIcons";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

function Field({ title, type, value, options, onChange, label }) {
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

  return (
    <div className="pb-4">
      <h2 className="pb-2">{title}</h2>
      {type === "select" ? (
        <Select.Root
          className="w-full p-2 text-right"
          value={value}
          onValueChange={handleValueChange}
        >            
        <div className="w-full p-2 bg-white border rounded dark:bg-dark-grey border-border dark:border-medium-grey">
          <Select.Trigger
            className={`inline-flex  items-center justify-center text-right h-6 gap-1 leading-none rounded cursor-pointer`}
          >
            <Select.Value>
              {label || value || "Select an Option"}
            </Select.Value>
            
          </Select.Trigger>
          </div>

          <Select.Portal>
            <Select.Content
              className={`overflow-hidden rounded md:-ml-12 drop-shadow ${
                darkMode
                  ? "bg-dark-grey border border-dark drop-shadow"
                  : "bg-white"
              }`}
            >
              <Select.ScrollUpButton className="flex items-center justify-center h-7">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-4">
                {options.map((optionObj, index) => (
                  <Select.Item
                    key={index}
                    value={optionObj.value}
                    className={`relative dropdown-item flex items-center h-6 px-6 text-xs leading-none rounded select-none hover:bg-primary ${
                      darkMode ? "text-light-grey" : ""
                    } hover:text-white`}
                  >
                    <span className="mr-2 dark:text-dark-grey">
                      {currencyIcons[optionObj.label]}
                    </span>
                    <Select.ItemText>{optionObj.label}</Select.ItemText>
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
      ) : (
        <input
          className="w-full p-2 bg-white dark:bg-dark-grey dark:border-medium-grey dark:text-light-grey text-dark-grey"
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Field;
