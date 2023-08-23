import React, { useState } from "react";

import axios from "axios";

import AlertModal from "./AlertModal";

import { ReactComponent as ChevronDown } from "../assets/icons/chevron_down.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { ReactComponent as WebsiteIcon } from "../assets/icons/website.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const baseURL = process.env.REACT_APP_BASE_URL;

function Card({
  id,
  imageContent,
  name,
  selectedCurrency,
  amount,
  recurrence,
  nextPaymentDate,
  color,
  notFunctional,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // DELETE Method
  const deleteSubscription = async (subscriptionId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/subscriptions/${subscriptionId}`
      );

      if (response.status === 200) {
        console.log("Successfully deleted subscription:", subscriptionId);
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

    if (isNaN(dateObj.getTime())) return "Invalid Date"; // Return 'Invalid Date' or handle it however you want

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
    <div
      className={`flex items-center justify-between w-full max-w-sm p-3 rounded drop-shadow h-18 ${color}`}
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
          <span className="mx-auto my-auto text-3xl md:mx-0 drop-shadow">
            {imageContent}
          </span>
        )}
        <div className={`pl-3 ${textColor}`}>
          <h2 className={`font-extrabold ${textColor}`}>{name || "Name"}</h2>
          <span className={`text-xl font-base ${textColor}`}>
            {formatCurrency(selectedCurrency)} {amount}
          </span>
          <span className={`pl-0.5 text-xs font-base ${textColor}`}>
            {formatRecurrence(recurrence)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center p-2 px-3 bg-white rounded drop-shadow h-9">
          <p className="text-xs">{formatDate(nextPaymentDate)}</p>
        </div>

        {notFunctional ? (
          <ChevronDown className={`w-3 h-3 ${textColor}`} />
        ) : (
          <DropdownMenu.Root
            className="z-1000"
            onOpenChange={(isOpen) => setIsDropdownOpen(isOpen)}
          >
            <DropdownMenu.Trigger>
              <ChevronDown className={`w-3 h-3 ${textColor}`} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="flex flex-col gap-5 p-4 mb-3 card">
              <DropdownMenu.Item className="flex cursor-pointer">
                <EditIcon className="mt-0.5 mr-3" />
                <h4>Edit</h4>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex cursor-pointer">
                <WebsiteIcon className="mr-3" />
                <h4>Visit Website</h4>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex cursor-pointer"
                onClick={() => deleteSubscription(id)}
              >
                <DeleteIcon className="mr-3" />
                <h4 className="pr-3 text-error">Delete</h4>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
    </div>
  );
}

export default Card;
