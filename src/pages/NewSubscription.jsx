import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import MenuDesktop from "../components/MenuDesktop";
import FieldBorder from "../components/FieldBorder";
import Button from "../components/Button";
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
  const logoFromPreviousPage = location.state?.logo;

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

  return (
    <div className="max-w-7xl responsive-padding md:pl-28">
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
            />
            <FieldBorder
              title={"Description"}
              type={"text"}
              placeholder={"Enter Description"}
            />
            <FieldBorder
              title={"Category"}
              type={"select"}
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
              defaultValue={"Canadian Dollar (CAD)"}
              options={currencyList}
            />
            <FieldBorder
              title={"Shared with"}
              type={"select"}
              defaultValue={"0"}
              options={["0", "1", "2", "3", "4", "5", "6"]}
            />
            <FieldBorder
              title={"Next payment"}
              type={"date"}
              placeholder={"Select Date"}
            />
            <FieldBorder
              title={"Recurrence"}
              type={"select"}
              placeholder={"Select Cicle"}
              defaultValue={"Monthly"}
              options={["Weekly", "Monthly", "Yearly"]}
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
            />
          </div>
          <Button content={"Add Subscription"} />
        </section>

        {/* Card preview */}
        <section className="flex items-center justify-center md:w-1/2 md:px-6">
          <div className="flex flex-col">
            {logoFromPreviousPage ? (
              <img className="w-12 h-12 mx-auto my-0 rounded-full drop-shadow" src={logoFromPreviousPage} alt="Selected Service Logo" />
            ) : (
              <>
                <img
                  src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                  alt="Placeholder"
                />
                {/* You can add an image uploader here like the one in WhatsApp or other apps */}
              </>
            )}
            <h1 className="py-3 text-3xl">0.00 C$</h1>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NewSubscription;
