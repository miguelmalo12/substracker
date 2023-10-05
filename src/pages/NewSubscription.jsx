import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkModeState } from "../state/darkModeState";
import { currencyListState } from "../state/currencyListState";
import { paymentMethodsState } from "../state/paymentMethodsState";
import { userState } from "../state/userState";

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
import CardPreview from "../components/CardPreview";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const baseURL = process.env.REACT_APP_BASE_URL;

function NewSubscription() {
  const navigate = useNavigate();
  const location = useLocation();
  const [postingSubscription, setPostingSubscription] = useState(false);

  const [user] = useRecoilState(userState);
  const [darkMode] = useRecoilState(darkModeState);
  const [currencyList] = useRecoilState(currencyListState);
  const paymentMethodsList = useRecoilValue(paymentMethodsState);

  const idToCategoryMapping = {
    1: "Entertainment",
    2: "Software & Apps",
    3: "Telecommunications",
    4: "Health & Fitness",
    5: "Food & Beverages",
    6: "Banking & Finance",
    7: "Insurance",
    8: "Transportation",
    9: "Education & Learning",
    10: "Utilities & Home Expenses",
    11: "Miscellaneous",
  };

  const [inputWidth, setInputWidth] = useState("auto");
  const measureRef = useRef(null);

  // Info coming from the previous page about Service chosen (if any)
  const logoFromPreviousPage = location.state?.logo;
  const nameFromPreviousPage = location.state?.name;
  const categoryIdFromPreviousPage = location.state?.categoryId;
  const initialCategory = idToCategoryMapping[categoryIdFromPreviousPage] || "";

  const websiteFromPreviousPage = location.state?.website;

  // Info that will be passed to the Card and needed to store on the database
  const [amount, setAmount] = useState("0.00");
  const [name, setName] = useState(nameFromPreviousPage || "");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [sharedNumber, setSharedNumber] = useState("0");
  const [nextPaymentDate, setNextPaymentDate] = useState("");
  const [reminderDays, setReminderDays] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [website, setWebsite] = useState(websiteFromPreviousPage || "");
  const [color, setColor] = useState("bg-primary");
  //Emojis
  const [selectedEmoji, setSelectedEmoji] = useState("✏️");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Form validation
  const [, setIsFormValid] = useState(false);
  const [, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmojiClick = (emoji, event) => {
    event.stopPropagation();
    setSelectedEmoji(emoji.native);
    setShowEmojiPicker(false);
  };

  const handleGoBack = () => {
    navigate("/add-subscription");
  };

  // Takes the preferred currrency from logged-in user to populate field
  useEffect(() => {
    if (user && user.preferred_currency) {
      const preferredCurrencyFull = currencyList.find((currency) =>
        currency.includes(`(${user.preferred_currency})`)
      );
      if (preferredCurrencyFull) {
        setSelectedCurrency(preferredCurrencyFull);
      }
    } else {
      setSelectedCurrency("Canadian Dollar (CAD)"); // Fallback
    }
  }, [user, currencyList]);

  const placeholder = selectedCurrency || "Canadian Dollar (CAD)";

  const getCurrencySymbol = (currencyString) => {
    if (typeof currencyString !== "string") {
      console.warn("Invalid currencyString:", currencyString);
      return "";
    }
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

  // Function to POST new Subscription to database
  const handleAddSubscription = () => {
    setButtonClicked(true);

    if (
      !name ||
      !category ||
      !nextPaymentDate ||
      !paymentMethod ||
      !recurrence
    ) {
      return;
    }
    setPostingSubscription(true);

    const matchedNumber = reminderDays ? reminderDays.match(/\d+/) : null;
    const reminderDaysNumber = matchedNumber
      ? parseInt(matchedNumber[0])
      : 0;
  
    const newSubscription = {
      user_id: user.user_id,
      service_id: location.state?.id,
      name: name,
      description: description,
      amount: amount,
      currency: selectedCurrency,
      recurrence: recurrence.toLowerCase(),
      payment_date: nextPaymentDate,
      reminder_days: reminderDaysNumber,
      category_name: category,
      payment_method: paymentMethod,
      website: website,
      color: color,
      shared_with: sharedNumber,
      logo: logoFromPreviousPage || selectedEmoji,
    };

    axios
      .post(`${baseURL}/api/subscriptions/`, newSubscription, {
        withCredentials: true,
      })
      .then((response) => {
        setPostingSubscription(false);
        navigate("/subscriptions");
      })
      .catch((error) => {
        console.log(error);
        setPostingSubscription(false);
      });
  };

  // Form validation
  const validateForm = () => {
    if (!name || !category || !nextPaymentDate || !paymentMethod) {
      setErrorMessage("Please fill in all required fields.");
      setIsFormValid(false);
    } else {
      setErrorMessage("");
      setIsFormValid(true);
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, category, nextPaymentDate, paymentMethod]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <section className="md:card md:dark:bg-dark-grey dark:bg-dark dark:text-light-grey dark:border-dark md:py-3 md:px-6 md:w-1/2">
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
                placeholder={"Enter Desc. (optional)"}
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setCategory(e.target.value)}
              />
              <FieldBorder
                title={"Currency"}
                type={"select"}
                value={selectedCurrency || placeholder}
                placeholder={placeholder}
                options={currencyList}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              />
              <FieldBorder
                title={"Shared with"}
                type={"select"}
                value={sharedNumber}
                placeholder={"Select Number (optional)"}
                options={["0", "1", "2", "3", "4", "5", "6"]}
                onChange={(e) => setSharedNumber(e.target.value)}
              />
              <FieldBorder
                title={"Next payment"}
                type={"date"}
                placeholder={"Select Date"}
                value={nextPaymentDate}
                onChange={(e) => setNextPaymentDate(e.target.value)}
              />
              <FieldBorder
                title={"Reminder"}
                type={"select"}
                placeholder={"None"}
                value={reminderDays}
                options={[
                  "None",
                  "1 day before",
                  "3 days before",
                  "5 days before",
                  "7 days before",
                  "10 days before",
                ]}
                onChange={(e) => setReminderDays(e.target.value)}
              />
              <FieldBorder
                title={"Recurrence"}
                type={"select"}
                placeholder={"Select Cicle"}
                value={recurrence}
                options={["Weekly", "Monthly", "Yearly"]}
                onChange={(e) => setRecurrence(e.target.value)}
              />
              <FieldBorder
                title={"Payment Method"}
                type={"select"}
                value={paymentMethod}
                placeholder={"Select Method"}
                options={paymentMethodsList.map((method) => method.method_name)}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FieldBorder
                title={"Website"}
                type={"url"}
                placeholder={"Enter Website (optional)"}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            {/* Error messages */}
            {buttonClicked &&
              (!name || !category || !nextPaymentDate || !paymentMethod) && (
                <div className="pb-3 text-sm">
                  {!name && <p className="text-error">Name is required.</p>}
                  {!category && (
                    <p className="text-error">Category is required.</p>
                  )}
                  {!nextPaymentDate && (
                    <p className="text-error">Next payment date is required.</p>
                  )}
                  {!paymentMethod && (
                    <p className="text-error">Payment Method is required.</p>
                  )}
                </div>
              )}
            <Button
              content={"Add Subscription"}
              onClick={handleAddSubscription}
            />
            {postingSubscription && <Loader inline={"inline"} />}
          </section>

          {/* CARD PREVIEW */}
          <section className="flex flex-col justify-center dark:text-light-grey md:w-1/2 md:px-6 md:justify-normal md:items-start md:flex-col">
            <div className="flex flex-col items-center lg:items-baseline">
              {logoFromPreviousPage ? (
                <img
                  className="w-12 h-12 mx-auto my-0 rounded-full md:mx-0 drop-shadow"
                  src={logoFromPreviousPage}
                  alt="Selected Service Logo"
                />
              ) : (
                // Emoji selector in case there is no logo
                <div className="relative">
                  <div
                    className="mx-auto my-0 text-3xl cursor-pointer md:mx-0 emoji-placeholder"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    {selectedEmoji || "✏️"}{" "}
                  </div>
                  {showEmojiPicker && (
                    <div className="absolute z-10 hidden md:block md:top-0 md:left-0 ">
                      <Picker
                        data={data}
                        previewPosition="none"
                        theme={darkMode ? "dark" : "light"}
                        onEmojiSelect={handleEmojiClick}
                      />
                    </div>
                  )}
                </div>
              )}
              {showEmojiPicker && (
                <div className="absolute z-10 md:hidden md:top-0 md:left-0 ">
                  <Picker
                    data={data}
                    previewPosition="none"
                    theme={darkMode ? "dark" : "light"}
                    onEmojiSelect={handleEmojiClick}
                  />
                </div>
              )}
              <div className="flex items-center justify-center">
                <input
                  style={{ width: inputWidth }}
                  type="text"
                  value={amount}
                  className="py-3 text-3xl font-bold border border-transparent rounded cursor-pointer dark:bg-dark focus:border-primary"
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
            <div className="flex flex-col w-full gap-2 pt-4 border-t dark:border-medium-grey">
              <h3>Card Preview</h3>
              <div className="max-w-sm">
                <CardPreview
                  imageContent={logoFromPreviousPage || selectedEmoji}
                  name={name}
                  selectedCurrency={selectedCurrency}
                  amount={amount}
                  sharedNumber={sharedNumber}
                  nextPaymentDate={nextPaymentDate}
                  recurrence={recurrence}
                  color={color}
                />
              </div>
            </div>
            <div className="flex pt-5 mb-5 cursor-pointer md:pt-8">
              {/* Color choose popover */}
              <Popover.Root>
                <Popover.Trigger
                  className={`w-6 h-6 mr-3 rounded border border-border ${color}`}
                >
                  <Popover.Anchor />
                </Popover.Trigger>
                <Popover.Content className="relative flex flex-col p-4 mt-4 bg-white rounded dark:bg-dark-grey dark:border dark:border-dark drop-shadow">
                  <Popover.Arrow />
                  <h5 className="mb-2">Choose Color</h5>
                  <Popover.Close
                    className="absolute p-2 rounded-full top-1 right-1 hover:bg-primary-bg dark:hover:bg-dark"
                    aria-label="Close"
                  >
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
                      className="flex items-center justify-center w-6 h-6 mt-2 rounded-full bg-primary-bg"
                      onClick={() => setColor("bg-primary-bg")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-white border-2 rounded-full"
                      onClick={() => setColor("bg-white")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-gray-200 border-2 rounded-full"
                      onClick={() => setColor("bg-gray-200")}
                    ></div>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-gray-500 rounded-full"
                      onClick={() => setColor("bg-gray-500")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 rounded-full bg-slate-700"
                      onClick={() => setColor("bg-slate-700")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-red-600 rounded-full"
                      onClick={() => setColor("bg-red-600")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-orange-500 rounded-full"
                      onClick={() => setColor("bg-orange-500")}
                    ></div>
                    <div
                      className="flex items-center justify-center w-6 h-6 mt-2 bg-yellow-500 rounded-full"
                      onClick={() => setColor("bg-yellow-500")}
                    ></div>
                  </div>
                  <div className="flex gap-3">
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
