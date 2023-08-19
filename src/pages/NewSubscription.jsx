import { useNavigate } from "react-router-dom";
import * as Select from '@radix-ui/react-select';

import NavbarMobile from "../components/NavbarMobile";
import NavbarDesktop from "../components/NavbarDesktop";
import MenuDesktop from "../components/MenuDesktop";
import FieldBorder from "../components/FieldBorder";
import Footer from "../components/Footer";

function NewSubscription() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/add-subscription");
  };

  return (
    <main className="max-w-7xl responsive-padding md:pl-28">
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
      <div>
      <FieldBorder title={"Name"} type={"text"} placeholder={"Test"}/>
      <FieldBorder title={"Description"} type={"text"} placeholder={"Test"}/>
      <FieldBorder title={"Category"} type={"text"} placeholder={"Test"}/>
      <FieldBorder title={"Currency"} type={"select"} defaultValue={"CAD"} options={[
          "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
        ]}/>

      </div>
      <Footer />
    </main>
  );
}

export default NewSubscription;
