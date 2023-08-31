import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currencyListState } from "../state/currencyListState";
import { paymentMethodsState } from "../state/paymentMethodsState";


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


const baseURL = process.env.REACT_APP_BASE_URL;

function EditSubscription() {
  const navigate = useNavigate();
  const [currencyList] = useRecoilState(currencyListState);
  const { subscriptionId } = useParams();
  const paymentMethodsList = useRecoilValue(paymentMethodsState);

  const [inputWidth, setInputWidth] = useState("auto");
  const measureRef = useRef(null);

  //Emojis
  const [selectedEmoji, setSelectedEmoji] = useState("✏️");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Form validation
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  // This is the info coming empty and then being edited by the get request
  const [userId, setUserId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("0.00");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [nextPaymentDate, setNextPaymentDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [website, setWebsite] = useState("");
  const [color, setColor] = useState("");
  const [sharedNumber, setSharedNumber] = useState("");
  const [logo, setLogo] = useState("");

  // Function to GET subscription data from database
  useEffect(() => {
    if (subscriptionId) {
    axios.get(`${baseURL}/api/subscriptions/${subscriptionId}`, {
      withCredentials: true,
    })
        .then((response) => {
          const fetchedSubscription = response.data.subscription;
          
          setUserId(fetchedSubscription.user_id);
          setServiceId(fetchedSubscription.service_id);
          setName(fetchedSubscription.name);
          setDescription(fetchedSubscription.description);
          setAmount(fetchedSubscription.amount);
          setSelectedCurrency(fetchedSubscription.currency);
          setRecurrence(capitalizeFirstLetter(fetchedSubscription.recurrence));
          setNextPaymentDate(formatDate(fetchedSubscription.payment_date));
          setCategory(fetchedSubscription.category_name);
          setPaymentMethod(fetchedSubscription.payment_method);
          setWebsite(fetchedSubscription.website);
          setColor(fetchedSubscription.color);
          setSharedNumber(fetchedSubscription.shared_with);
          setLogo(fetchedSubscription.logo);

          // If the logo is not a URL, it means it's an emoji
          if (fetchedSubscription.logo && !fetchedSubscription.logo.startsWith("http")) {
            setSelectedEmoji(fetchedSubscription.logo);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
  }, [subscriptionId]);
  
  const handleEmojiClick = (emoji, event) => {
    event.stopPropagation();
    setSelectedEmoji(emoji.native);
    setShowEmojiPicker(false);
  };

  const handleGoBack = () => {
    navigate("/subscriptions");
  };

  const getCurrencySymbol = (currencyString) => {
    if (typeof currencyString !== "string") {
      console.error("Invalid currencyString:", currencyString);
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

  // Function to PUT edited Subscription to database
  const handleUpdateSubscription = () => {
    setButtonClicked(true);

    if (!name || !category || !nextPaymentDate || !paymentMethod) {
      return;
    }

    const updatedSubscription = {
      subscription_id: subscriptionId,
      user_id: userId,
      service_id: serviceId,
      name: name,
      description: description,
      amount: amount,
      currency: selectedCurrency,
      recurrence: recurrence,
      payment_date: nextPaymentDate,
      category_name: category,
      color: color,
      logo: logo || selectedEmoji,
      shared_with: sharedNumber,
      payment_method: paymentMethod,
      is_active: true,
      website: website,
    };

    axios
      .put(`${baseURL}/api/subscriptions/${subscriptionId}`, updatedSubscription, {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/subscriptions");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Used to capitalize recurrence coming from get request
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Used to format date coming from get request
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JS
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
  // Usage:
  const formattedDate = formatDate("2023-08-26T07:00:00.000Z"); // Output will be "2023-08-26"

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
  }, [name, category, nextPaymentDate, paymentMethod]);

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
                  content={"Edit Subscription"}
                  goBack={handleGoBack}
                />
              </div>
            </div>
          </div>
        </div>

        <main className="flex flex-col-reverse md:flex-row">
          {/* Form fields */}
          <section className="md:card dark:bg-dark-grey dark:text-light-grey dark:border-dark md:py-3 md:px-6 md:w-1/2">
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
                value={description}
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
                value={selectedCurrency}
                placeholder={"Canadian Dollar (CAD)"}
                options={currencyList}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              />
              <FieldBorder
                title={"Shared with"}
                type={"select"}
                value={sharedNumber}
                placeholder={"Select Number"}
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
                placeholder={"Enter Website"}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            {/* Error messages */}
            {buttonClicked && (
              <div className="pb-3 text-sm">
                {!name && <p className="text-error">Name is required.</p>}
                {!category && <p className="text-error">Category is required.</p>}
                {!nextPaymentDate && <p className="text-error">Next payment date is required.</p>}
                {!paymentMethod && <p className="text-error">Payment Method is required.</p>}
              </div>
            )}
            <Button
              content={"Update Subscription"}
              onClick={handleUpdateSubscription}
            />
          </section>

          {/* CARD PREVIEW */}
          <section className="flex flex-col justify-center dark:text-light-grey md:w-1/2 md:px-6 md:justify-normal md:items-start md:flex-col">
            <div className="flex flex-col">
              {logo && logo.startsWith("http") ? (
                <img
                  className="w-12 h-12 mx-auto my-0 rounded-full md:mx-0 drop-shadow"
                  src={logo}
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
                <Card
                  imageContent={logo || selectedEmoji}
                  name={name}
                  selectedCurrency={selectedCurrency}
                  amount={amount}
                  sharedNumber={sharedNumber}
                  nextPaymentDate={nextPaymentDate}
                  recurrence={recurrence}
                  color={color}
                  notFunctional={true}
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
                    className="absolute p-2 rounded-full top-1 right-1 dark:hover:bg-dark hover:bg-primary-bg"
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

export default EditSubscription;
