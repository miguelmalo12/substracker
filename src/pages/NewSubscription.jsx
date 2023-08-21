import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";

import axios from "axios";

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import MenuDesktop from "../components/MenuDesktop";
import FieldBorder from "../components/FieldBorder";
import Button from "../components/Button";
import Card from "../components/Card";
import Footer from "../components/Footer";

const currencyList = [
  "Australian Dollar (AUD)",
  "Bulgarian Lev (BGN)",
  "Brazilian Real (BRL)",
  "Canadian Dollar (CAD)",
  "Swiss Franc (CHF)",
  "Chinese Yuan (CNY)",
  "Czech Koruna (CZK)",
  "Danish Krone (DKK)",
  "Euro (EUR)",
  "British Pound Sterling (GBP)",
  "Hong Kong Dollar (HKD)",
  "Croatian Kuna (HRK)",
  "Hungarian Forint (HUF)",
  "Indonesian Rupiah (IDR)",
  "Israeli New Shekel (ILS)",
  "Indian Rupee (INR)",
  "Icelandic Króna (ISK)",
  "Japanese Yen (JPY)",
  "South Korean Won (KRW)",
  "Mexican Peso (MXN)",
  "Malaysian Ringgit (MYR)",
  "Norwegian Krone (NOK)",
  "New Zealand Dollar (NZD)",
  "Philippine Peso (PHP)",
  "Polish Złoty (PLN)",
  "Romanian Leu (RON)",
  "Russian Ruble (RUB)",
  "Swedish Krona (SEK)",
  "Singapore Dollar (SGD)",
  "Thai Baht (THB)",
  "Turkish Lira (TRY)",
  "US Dollar (USD)",
  "South African Rand (ZAR)",
];
const baseURL = process.env.REACT_APP_BASE_URL;

function NewSubscription() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Info coming from the previous page about Service chosen (if any)
  const logoFromPreviousPage = location.state?.logo;
  const nameFromPreviousPage = location.state?.name;
  const categoryIdFromPreviousPage = location.state?.categoryId;
  const websiteFromPreviousPage = location.state?.website;

  // Info that will be passed to the Card
  const [amount, setAmount] = useState("0.00");
  const [name, setName] = useState(nameFromPreviousPage || "");
  const [website, setWebsite] = useState(websiteFromPreviousPage || "");
  const [category, setCategory] = useState(categoryIdFromPreviousPage || ""); // This is an ID!
  const [recurrence, setRecurrence] = useState("Monthly");
  const [nextPaymentDate, setNextPaymentDate] = useState("");
  const [color, setColor] = useState("bg-primary");
  const [selectedCurrency, setSelectedCurrency] = useState(
    "Canadian Dollar (CAD)"
  );

  const [inputWidth, setInputWidth] = useState("auto");
  const measureRef = useRef(null);

  //Emojis
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  

  const handleEmojiClick = (emoji, event) => {
    event.stopPropagation();
    setSelectedEmoji(emoji.native);
    setShowEmojiPicker(false);
  };

  const handleGoBack = () => {
    navigate("/add-subscription");
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/methods/`)
      .then((response) => {
        setPaymentMethods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getCurrencySymbol = (currencyString) => {
    switch (currencyString) {
      case "US Dollar (USD)":
        return "$";
      case "Canadian Dollar (CAD)":
        return "C$";
      case "Euro (EUR)":
        return "€";
      default:
        const match = currencyString.match(/\(([^)]+)\)/); // extracts the value inside brackets
        return match ? match[1] : currencyString;
    }
  };

  useEffect(() => {
    if (measureRef.current) {
      const adjustedWidth = measureRef.current.offsetWidth + 5;
      setInputWidth(`${adjustedWidth}px`);
    }
  }, [amount]);

  return (
    <div className="max-w-7xl md:min-h-screen md:flex md:flex-col responsive-padding md:pl-28">
      <div className="flex-grow">
        <div className="md:flex-grow">
          {/* Nav on Mobile */}
          <NavbarMobile content={"New Subscription"} goBack={handleGoBack} />
          {/* Menu on Desktop */}
          <div className="hidden md:block">
            <MenuDesktop activePage="subscriptions" />
          </div>
          <div className="pt-3 md:flex md:justify-between">
            <div className="flex items-center justify-between mb-3 md:w-full md:mr-6">
              <div>
                {/* Nav on Desktop */}
                <NavbarDesktop
                  content={"New Subscription"}
                  goBack={handleGoBack}
                />
              </div>
            </div>
          </div>
        </div>

        <main className="flex flex-col-reverse md:flex-row">
          {/* Form fields */}
          <section className="md:card md:py-3 md:px-6 md:w-1/2">
            <div className="pb-6">
              <FieldBorder
                title={"Name"}
                type={"text"}
                placeholder={"Enter Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FieldBorder
                title={"Description"}
                type={"text"}
                placeholder={"Enter Description"}
              />
              <FieldBorder
                title={"Category"}
                type={"select"}
                value={category}
                placeholder={"Select Category"}
                options={[
                  "Banking & Finance",
                  "Education & Learning",
                  "Entertainment",
                  "Food & Beverages",
                  "Health & Fitness",
                  "Insurance",
                  "Miscellaneous",
                  "Software & Apps",
                  "Telecommunications",
                  "Transportation",
                  "Utilities & Home Expenses",
                ]}
              />
              <FieldBorder
                title={"Currency"}
                type={"select"}
                value={"Canadian Dollar (CAD)"}
                options={currencyList}
                onChange={(newCurrency) => setSelectedCurrency(newCurrency)}
              />
              <FieldBorder
                title={"Shared with"}
                type={"select"}
                value={"0"}
                options={["0", "1", "2", "3", "4", "5", "6"]}
              />
              <FieldBorder
                title={"Next payment"}
                type={"date"}
                placeholder={"Select Date"}
                onChange={(e) => setNextPaymentDate(e.target.value)}
              />
              <FieldBorder
                title={"Recurrence"}
                type={"select"}
                placeholder={"Select Cicle"}
                value={"Monthly"}
                options={["Weekly", "Monthly", "Yearly"]}
                onChange={(newRecurrence) => setRecurrence(newRecurrence)}
              />
              <FieldBorder
                title={"Payment Method"}
                type={"select"}
                placeholder={"Select an Option"}
                options={paymentMethods.map((method) => method.method_name)}
              />
              <FieldBorder
                title={"Website"}
                type={"url"}
                placeholder={"Enter Website"}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <Button content={"Add Subscription"} />
          </section>

          {/* Card preview */}
          <section className="flex flex-col justify-center md:w-1/2 md:px-6 md:justify-normal md:items-start md:flex-col">
            <div className="flex flex-col">
              {logoFromPreviousPage ? (
                <img
                  className="w-12 h-12 mx-auto my-0 rounded-full md:mx-0 drop-shadow"
                  src={logoFromPreviousPage}
                  alt="Selected Service Logo"
                />
              ) : (
                // Emoji selector in case there is no logo
                <>
                  <div
                    className="mx-auto my-0 text-3xl cursor-pointer md:mx-0 emoji-placeholder"
                    onClick={() => setShowEmojiPicker(true)}
                  >
                    {selectedEmoji || "✏️"}{" "}
                  </div>
                  {showEmojiPicker && (
                    <Picker
                      data={data}
                      previewPosition="none"
                      onEmojiSelect={handleEmojiClick}
                    />
                  )}
                </>
              )}
              <div className="flex items-center justify-center">
                <input
                  style={{ width: inputWidth }}
                  type="text"
                  value={amount}
                  className="py-3 text-3xl font-bold border border-transparent rounded cursor-pointer focus:border-primary"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d.]/g, "");
                    setAmount(value);
                  }}
                  onBlur={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    const formattedAmount = !isNaN(parsedValue)
                      ? parsedValue.toFixed(2)
                      : "0.00";
                    setAmount(formattedAmount);
                  }}
                />
                <span
                  ref={measureRef}
                  style={{
                    visibility: "hidden",
                    position: "absolute",
                    whiteSpace: "pre",
                  }}
                  className="text-3xl font-bold"
                >
                  {amount}
                </span>
                <span className="ml-1 text-3xl font-bold">
                  {getCurrencySymbol(selectedCurrency)}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2 pt-4 border-t">
              <h3>Card Preview</h3>
              <Card
                imageContent={logoFromPreviousPage || selectedEmoji}
                name={name}
                selectedCurrency={selectedCurrency}
                amount={amount}
                recurrence={recurrence}
                nextPaymentDate={nextPaymentDate}
                color={color}
              />
            </div>
            <div className="flex pt-5 mb-5 cursor-pointer md:pt-8">
              {/* Color choose popover */}
              <Popover.Root>
                <Popover.Trigger className={`w-6 h-6 mr-3 rounded border ${color}`}>
                  <Popover.Anchor />
                </Popover.Trigger>
                <Popover.Content className="relative flex flex-col p-4 mt-4 bg-white rounded drop-shadow">
                  <Popover.Arrow />
                  <h5 className="mb-2">Choose Color</h5>
                  <Popover.Close className="absolute p-2 rounded-full top-1 right-1 PopoverClose hover:bg-primary-bg" aria-label="Close">
                    <Cross2Icon />
                  </Popover.Close>
                  <div className="flex gap-3">
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 rounded-full bg-primary"
                      onClick={() => setColor("bg-primary")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-gray-900 rounded-full"
                      onClick={() => setColor("bg-gray-900")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-white border-2 rounded-full"
                      onClick={() => setColor("bg-white")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-gray-500 rounded-full"
                      onClick={() => setColor("bg-gray-500")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-red-600 rounded-full"
                      onClick={() => setColor("bg-red-600")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-orange-500 rounded-full"
                      onClick={() => setColor("bg-orange-500")}
                    ></div>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-yellow-500 rounded-full"
                      onClick={() => setColor("bg-yellow-500")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-green-600 rounded-full"
                      onClick={() => setColor("bg-green-600")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-pink-600 rounded-full"
                      onClick={() => setColor("bg-pink-600")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 rounded-full bg-sky-600"
                      onClick={() => setColor("bg-sky-600")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-teal-600 rounded-full"
                      onClick={() => setColor("bg-teal-600")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-indigo-600 rounded-full"
                      onClick={() => setColor("bg-indigo-600")}
                    ></div>
                  </div>
                </Popover.Content>
              </Popover.Root>
              <h3>Color</h3>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default NewSubscription;
