import { ReactComponent as ChevronDown } from "../assets/icons/chevron_down.svg";

function Card({
  imageContent,
  name,
  selectedCurrency,
  amount,
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
  
    const dateObj = new Date(date);  // No need to append 'T00:00:00Z'
    
    if (isNaN(dateObj.getTime())) return "Invalid Date"; // Return 'Invalid Date' or handle it however you want
  
    const day = dateObj.getUTCDate();
    const month = dateObj.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    
    return `${day} ${month}`;
  };

  console.log("Next Payment Date:", nextPaymentDate);
  console.log("Formatted Date:", formatDate(nextPaymentDate));

  // Checks if the color is white and changes the text color to black
  const textColor = (color === "bg-white" || color === "bg-gray-200" || color === "bg-primary-bg") ? "text-dark-grey" : "text-white";

  return (
    <div className={`flex items-center justify-between w-full max-w-sm p-3 rounded drop-shadow h-18 ${color}`}>
      <div className="flex">
        {imageContent && imageContent.startsWith("http") ? (
          <img
            className="w-12 h-12 mx-auto my-0 rounded-full md:mx-0 drop-shadow"
            src={imageContent}
            alt="Card Logo"
          />
        ) : (
          <span className="mx-auto my-auto text-3xl md:mx-0 drop-shadow">{imageContent}</span>
        )}
        <div className={`pl-3 ${textColor}`}>
            <h2 className={`font-extrabold ${textColor}`}>{name || "Name"}</h2>
            <span className={`text-xl font-base ${textColor}`}>
            {formatCurrency(selectedCurrency)} {amount}
          </span>
          <span className={`pl-0.5 text-xs font-base ${textColor}`}>{formatRecurrence(recurrence)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center p-2 px-3 bg-white rounded drop-shadow h-9">
          <p className="text-xs">{formatDate(nextPaymentDate)}</p>
        </div>
        <ChevronDown className={`w-3 h-3 ${textColor}`} />
      </div>
    </div>
  );
}

export default Card;
