import { ReactComponent as ChevronDown } from "../assets/icons/chevron_down.svg";
import { ReactComponent as Shared } from "../assets/icons/users_shared.svg";

function CardPreview({
  imageContent,
  name,
  selectedCurrency,
  amount,
  sharedNumber,
  recurrence,
  nextPaymentDate,
  color,
}) {

  // Converts recurrence to short form
  const formatRecurrence = (recurrence) => {
    const normalizedRecurrence = recurrence.toLowerCase();
    switch (normalizedRecurrence) {
      case "monthly":
        return "/mo";
      case "weekly":
        return "/wk";
      case "yearly":
        return "/yr";
      default:
        return recurrence;
    }
  };

  // Extracts and format currency
  const formatCurrency = (currencyString) => {
    if (!currencyString) return '';
    
    const match = currencyString.match(/\(([^)]+)\)/); // Extracts the value inside brackets
    if (!match) return currencyString;

    switch (match[1]) {
      case "CAD":
        return "C$";
      case "EUR":
        return "€";
      case "USD":
        return "$";
      default:
        return match[1];
    }
  };

  // Formats the next payment date or use default if not chosen
  const formatDate = (date) => {
    if (!date) return "01 Jan";

    const dateObj = new Date(date); // No need to append 'T00:00:00Z'

    if (isNaN(dateObj.getTime())) return "Invalid Date";

    const day = dateObj.getUTCDate();
    const month = dateObj.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });

    return `${day} ${month}`;
  };

  // Checks if the color is white and changes the text color to black
  const textColor =
    color === "bg-white" || color === "bg-gray-200" || color === "bg-primary-bg"
      ? "text-dark-grey"
      : "text-white";
      
  // Divides the amount displayed if it's a shared expense
  const calculateSharedAmount = () => {
    const sharedNumberAsNumber = parseInt(sharedNumber, 10);
    const amountAsNumber = parseFloat(amount);
  
    if (sharedNumberAsNumber === 0) {
      return amountAsNumber.toFixed(2);
    } else {
      return (amountAsNumber / (sharedNumberAsNumber + 1)).toFixed(2);
    }
  };

  return (
    <div className="relative rounded lighten-on-hover">
      <div
        className={`flex-grow flex items-center justify-between p-3 pr-2 rounded drop-shadow h-18 ${color}`}
      >
        <div className="flex">
          {imageContent && imageContent.startsWith("http") ? (
            <img
              className="w-12 h-12 mx-auto my-0 rounded-full md:mx-0 drop-shadow"
              src={imageContent}
              alt="Card Logo"
            />
          ) : (
            <span className="mx-auto my-auto text-3xl md:mx-0 drop-shadow">
              {imageContent}
            </span>
          )}
          <div className={`pl-3 ${textColor}`}>
            <h2 className={`font-extrabold truncate w-[13ch] ${textColor}`}>
              {name || "Name"}
            </h2>
            <span className={`text-xl font-base ${textColor}`}>
              {formatCurrency(selectedCurrency)} {calculateSharedAmount()}
            </span>
            <span className={`pl-0.5 text-xs font-base ${textColor}`}>
              {formatRecurrence(recurrence)}
            </span>
          </div>
        </div>
        <div className="relative flex items-center gap-1.5">
          {sharedNumber > 0 && (
            <Shared className={`absolute w-6 h-6 -left-8 ${textColor}`} />
          )}
          <div className="flex items-center justify-center p-2 bg-white rounded drop-shadow h-9">
            <p className="text-xs text-dark-grey">
              {formatDate(nextPaymentDate)}
            </p>
          </div>
          <ChevronDown className={`w-3 h-3 ${textColor}`} />
        </div>

        {/* Card background effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 gradient-overlay">
          <div
            className={`absolute w-40 h-40 rounded-full opacity-10 ${
              ["bg-white", "bg-gray-200", "bg-primary-bg"].includes(color)
                ? "bg-medium-grey"
                : "bg-light-grey"
            }`}
            style={{ top: "-160%", right: "-5%" }}
          ></div>
          <div
            className={`absolute w-24 h-24 rounded-full opacity-10 ${
              ["bg-white", "bg-gray-200", "bg-primary-bg"].includes(color)
                ? "bg-medium-grey"
                : "bg-light-grey"
            }`}
            style={{ top: "10%", right: "-15%" }}
          ></div>{" "}
        </div>
      </div>
    </div>
  );
}

export default CardPreview;
