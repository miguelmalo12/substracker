import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

function FieldBorder({ title, type, options, value, placeholder, onChange }) {
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
    <div className="flex items-center justify-between pt-4 pb-2 border-b-2">
      <h2 className="mr-3">{title}</h2>
      {type === "select" ? (
        <Select.Root
          className="w-full p-2 text-right border-none"
          value={value}
          onValueChange={handleValueChange}
        >
          <Select.Trigger className="inline-flex items-center justify-center h-6 gap-1 leading-none rounded cursor-pointer drop-shadow focus:drop-shadow">
            <Select.Value>
              {value || placeholder || "Select an Option"}
            </Select.Value>{" "}
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded drop-shadow">
              <Select.ScrollUpButton className="flex items-center justify-center h-7">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-4">
                {options.map((option, index) => (
                  <Select.Item
                    key={index}
                    value={option}
                    className="relative flex items-center h-6 px-6 text-xs leading-none rounded select-none hover:text-white hover:bg-primary hover:border-success"
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
      ) : (
        <input
          className="flex-grow text-right border-none"
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
