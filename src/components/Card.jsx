import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkModeState } from "../state/darkModeState";

import axios from "axios";

import { ReactComponent as ChevronDown } from "../assets/icons/chevron_down.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { ReactComponent as WebsiteIcon } from "../assets/icons/website.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { ReactComponent as Shared } from "../assets/icons/users_shared.svg";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Portal from "@radix-ui/react-portal";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const baseURL = process.env.REACT_APP_BASE_URL;

function Card({
  id,
  imageContent,
  name,
  description,
  category,
  selectedCurrency,
  amount,
  actualAmount,
  sharedNumber,
  recurrence,
  nextPaymentDate,
  reminderDays,
  paymentMethod,
  website,
  color,
  removeSubscriptionById,
}) {
  const [darkMode] = useRecoilState(darkModeState);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // DELETE Method
  const deleteSubscription = async (subscriptionId) => {
    const userDataJSON = localStorage.getItem('userData'); 
    if (!userDataJSON) {
      console.error("User data is missing from localStorage");
      return;
    }
  
    const userData = JSON.parse(userDataJSON);
    const userId = userData.user_id;
    if (!userId) {
      console.error("User ID is missing from userData in localStorage");
      return;
    }
    
    try {
      const response = await axios.delete(
        `${baseURL}/api/subscriptions/${subscriptionId}`,
        {
          params: { user_id: userId },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        removeSubscriptionById(subscriptionId);
      } else {
        console.error("Error deleting subscription:", response.data);
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

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

  return (
    <Dialog.Root>
      <AlertDialog.Root>
      <Dialog.Trigger asChild>
        <div className="relative rounded cursor-pointer lighten-on-hover">
          <div
            className={`flex-grow flex items-center justify-between p-3 pr-2 rounded drop-shadow h-18 ${color}`}
            style={{ zIndex: isDropdownOpen ? 1000 : 1 }}
          >
              <div className="flex">
                {imageContent && imageContent.startsWith("http") ? (
                  <img
                    className="w-12 h-12 mx-auto my-0 rounded-full md:mx-0 drop-shadow"
                    src={imageContent}
                    alt="Card Logo"
                  />
                ) : (
                  <span className="flex items-center w-12 pl-2 text-3xl drop-shadow">
                    {imageContent}
                  </span>
                )}
                <div className={`pl-3 ${textColor}`}>
                  <h2
                    className={`font-extrabold truncate w-[13ch] ${textColor}`}
                  >
                    {name || "Name"}
                  </h2>
                  <span className={`text-xl font-base ${textColor}`}>
                    {formatCurrency(selectedCurrency)}{" "}
                    {(actualAmount ?? Number(amount)).toFixed(2)}
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
                <div className="flex items-center p-2 px-3 bg-white rounded min-w-[63px] drop-shadow h-9">
                  <p className="text-xs text-dark-grey">
                    {formatDate(nextPaymentDate)}
                  </p>
                </div>
                <DropdownMenu.Root
                  onOpenChange={(isOpen) => setIsDropdownOpen(isOpen)}
                  style={{ zIndex: 1001 }}
                >
                  <DropdownMenu.Trigger className="p-1.5 rounded hover:bg-opacity-20 hover:bg-light-grey">
                    <ChevronDown className={`w-3 h-3  ${textColor}`} />
                  </DropdownMenu.Trigger>
                  <Portal.Root>
                    <DropdownMenu.Content
                      className={`flex flex-col gap-5 p-4 mb-3 rounded drop-shadow ${
                        darkMode
                          ? "bg-dark-grey text-light-grey border-dark"
                          : "bg-white"
                      }`}
                    >
                      <DropdownMenu.Item>
                        <Link
                          className="flex cursor-pointer"
                          to={`/edit-subscription/${id}`}
                        >
                          <EditIcon className="mt-0.5 mr-3" />
                          <h4>Edit</h4>
                        </Link>
                      </DropdownMenu.Item>

                      {/* WEBSITE - Shows only if there's a website added */}
                      {website && (
                        <DropdownMenu.Item className="flex cursor-pointer">
                          <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex"
                          >
                            <WebsiteIcon className="mr-3" />
                            <h4>Visit Website</h4>
                          </a>
                        </DropdownMenu.Item>
                      )}

                      {/* DELETE - Opens alert dialog */}
                      <DropdownMenu.Item className="flex cursor-pointer">
                        <AlertDialog.Trigger asChild>
                          <div
                            className="flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DeleteIcon className="mr-3" />
                            <h4 className="pr-3 text-error">Delete</h4>
                          </div>
                        </AlertDialog.Trigger>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </Portal.Root>
                </DropdownMenu.Root>
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
      </Dialog.Trigger>
      {/* CONFIRM DELETE ALERT DIALOG */}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm animate-fade-in" />
        <AlertDialog.Content className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-screen-sm max-h-[85vh] p-6 rounded-lg shadow-xl z-50 animate-scale-in focus:outline-none ${darkMode ? 'text-light-grey bg-dark' : 'bg-white'} `}>
          <AlertDialog.Title className="text-base font-semibold">
            Are you sure you want to delete this subscription?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 text-base font-light leading-6">
            This action cannot be undone. This will permanently delete
            this subscription entry.
          </AlertDialog.Description>
          <div className="flex justify-end gap-6">
            <AlertDialog.Cancel asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-auto px-4 py-2 text-base font-medium rounded text-dark-grey bg-light-grey hover:bg-border focus:ring-2 focus:ring-dark-grey"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => deleteSubscription(id)}
                className="inline-flex items-center justify-center w-auto px-4 py-2 text-base font-medium rounded bg-rose-100 text-error hover:bg-rose-200 focus:ring-2 focus:ring-error"
              >
                Yes, delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
      </AlertDialog.Root>

      {/* DETAILS DIALOG */}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black bg-opacity-30 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content   className={`overflow-y-auto max-h-[90vh] data-[state=open]:animate-contentShow z-20 fixed top-[50%] left-[50%] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none ${darkMode ? 'text-light-grey bg-dark-grey' : 'bg-white'}`}
>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px] flex flex-col gap-3 leading-normal">
            <div>
              <h2>Name</h2>
              <p>{name}</p>
            </div>
            <div>
              <h2>Amount</h2>
              <p>{amount}</p>
            </div>
            <div>
              <h2>Description</h2>
              <p>{description ? description : "N/A"}</p>
            </div>
            <div>
              <h2>Category</h2>
              <p>{category}</p>
            </div>
            <div>
              <h2>Currency</h2>
              <p>{selectedCurrency}</p>
            </div>
            <div>
              <h2>Shared with</h2>
              <p>{sharedNumber}</p>
            </div>
            <div>
              <h2>Next Payment</h2>
              <p>{formatDate(nextPaymentDate)}</p>
            </div>
            <div>
              <h2>Reminder Days</h2>
              <p>{reminderDays ? reminderDays : "N/A"}</p>
            </div>
            <div>
              <h2>Recurrence</h2>
              <p>{recurrence ? recurrence.charAt(0).toUpperCase() + recurrence.slice(1) : "N/A"}</p>
            </div>
            <div>
              <h2>Payment Method</h2>
              <p>{paymentMethod}</p>
            </div>
            <div>
              <h2>Website</h2>
              <p>{website ? website : "N/A"}</p>
            </div>
          </Dialog.Description>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="inline-flex items-center justify-center w-auto px-4 py-2 text-base font-medium rounded text-dark-grey bg-light-grey hover:bg-border focus:ring-2 focus:ring-dark-grey">
                Close
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-primary hover:bg-primary-bg focus:shadow-primary-dark absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Card;
