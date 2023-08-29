import { useRecoilState } from 'recoil';
import { darkModeState } from '../state/darkModeState'; 

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

function FieldBorder({ title, type, options, value, placeholder, onChange }) {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

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
    <div className="flex items-center justify-between pt-4 pb-2 border-b-2 dark:border-medium-grey">
      <h2 className="mr-3">{title}</h2>
      {type === "select" ? (
        <Select.Root
          className="w-full p-2 text-right border-none"
          value={value}
          onValueChange={handleValueChange}
        >
          <Select.Trigger className={`inline-flex items-center justify-center h-6 gap-1 leading-none rounded cursor-pointer ${value ? '' : 'text-gray-300'}`}>
            <Select.Value>
              {value || placeholder || "Select an Option"}
            </Select.Value>{" "}
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className={`overflow-hidden rounded md:-ml-12 drop-shadow ${darkMode ? 'bg-dark' : 'bg-white'}`}>
              <Select.ScrollUpButton className="flex items-center justify-center h-7">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-4">
                {options.map((option, index) => (
                  <Select.Item
                    key={index}
                    value={option}
                    className={`relative flex items-center h-6 px-6 text-xs leading-none rounded select-none hover:bg-primary ${darkMode ? 'text-light-grey' : ''} hover:text-white`}
                    >
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
            className={`border-none dark:bg-dark-grey text-right ${!value ? 'text-gray-300' : ''}`}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handleValueChange}
          />
        </div>
      ) : (
        <input
          className="flex-grow text-right border-none dark:bg-dark-grey"
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
