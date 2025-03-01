import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { ReactComponent as TrackIcon } from "../assets/icons/solid/usp_track.svg";
import { ReactComponent as CurrencyIcon } from "../assets/icons/solid/usp_currency.svg";
import { ReactComponent as SharedIcon } from "../assets/icons/solid/usp_shared.svg";

import { ReactComponent as DashboardIcon } from "../assets/icons/solid/usp_dashboard.svg";
import { ReactComponent as MethodIcon } from "../assets/icons/solid/usp_methods.svg";
import { ReactComponent as ReminderIcon } from "../assets/icons/solid/usp_reminders.svg";
import { ReactComponent as UiIcon } from "../assets/icons/solid/usp_ui.svg";

import { ReactComponent as MobileIcon } from "../assets/icons/solid/mobile.svg";
import { ReactComponent as MobileDashboardIcon } from "../assets/icons/solid/mobile_dashboard.svg";

import { ReactComponent as DarkIcon } from "../assets/icons/dark_switch.svg";
import { ReactComponent as LightIcon } from "../assets/icons/light_switch.svg";

import logo from "../assets/logos/SubsTracker-logo-H.svg";

// For future potential site growth
const navigation = [
  //   { name: "Product", href: "#" },
];

const features = [
  {
    name: "Comprehensive Tracking of Recurring Payments",
    description:
      "Manage recurring payments with ease in a centralized view. Set reminders for individual payments to avoid late fees or accidental renewals.",
    icon: <TrackIcon />,
  },
  {
    name: "Multi-Currency Support",
    description:
      "SubsTracker converts amounts into your preferred currency, keeping you in the loop regardless of where your payments are going.",
    icon: <CurrencyIcon />,
  },
  {
    name: "Shared Expenses Made Easy",
    description:
      "Have shared expenses? See which payments are shared and track these expenses seamlessly.",
    icon: <SharedIcon />,
  },
];

const mobileFeatures = [
  {
    name: "Fully Optimized for Mobile",
    description:
      "With SubsTracker's mobile-friendly interface, you're not confined to a desk to manage your subscriptions, giving you freedom to focus on what really matters.",
    icon: <MobileIcon />,
  },
  {
    name: "Quick View Dashboard",
    description:
      "Our mobile dashboard is designed for quick and easy access to all your subscriptions. Get a comprehensive view with just a swipe and a tap.",
    icon: <MobileDashboardIcon />,
  },
];

const usp = [
  {
    name: "All-in-One Dashboard",
    description:
      "View all your subscriptions, payments, and reminders in one intuitive dashboard. No more toggling between multiple apps or spreadsheets.",
    icon: <DashboardIcon />,
  },
  {
    name: "Personalized Payment Reminders",
    description:
      "Set up reminders for specific payments you don't want to miss. Whether it's your monthly rent or a quarterly subscription, our reminder system keeps you on top of your payment schedule.",
    icon: <ReminderIcon />,
  },
  {
    name: "Custom Payment Methods",
    description:
      "SubsTracker allows you to add your own payment methods used, providing a comprehensive way to track how you're making your recurring payments.",
    icon: <MethodIcon />,
  },
  {
    name: "User-Friendly Interface",
    description:
      "With a focus on user experience, SubsTracker offers a clean, intuitive, and responsive design. Whether you prefer a bright interface or the comfort of dark mode, managing subscriptions has never been so smooth and enjoyable.",
    icon: <UiIcon />,
  },
];

const stats = [
  { name: 'Save time tracking recurring payments, allowing your team to focus on more critical tasks.', value: 'Save Time' },
  { name: 'Utilize data to make informed decisions about your company\'s subscription portfolio.', value: 'Reduce Costs' },
  { name: 'All your global payments are converted into your preferred currency for easy expense tracking.', value: 'Simplify Multi-currency' },
]

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [isDashboardDark, setIsDashboardDark] = useState(true);
  const [isAddDark, setIsAddDark] = useState(true);

  const toggleDashboard = () => {
    setIsDashboardDark(!isDashboardDark);
  };

  const toggleAdd = () => {
    setIsAddDark(!isAddDark);
  };

  const scrollToDiv = (ref) => {
    const element = document.getElementById(ref);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Reads local storage to make sure to show login option or not
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser({
        user_id: null,
        user_email: null,
        preferred_currency: null,
        user_password: null,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      {/* Hero */}
      <div className="z-20 bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <span className="sr-only">SubsTracker</span>
              <img className="w-48 h-auto" src={logo} alt="" />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-dark-grey"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {user.user_id ? (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    className="rounded mr-4 border border-primary px-3.5 py-2.5 text-sm font-semibold text-primary hover:text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Signup
                  </button>
                  <button
                    onClick={() => navigate("/subscriptions")}
                    className="text-sm font-semibold leading-6 transition-transform text-dark-grey hover:-translate-y-1"
                  >
                    Access Your Dashboard <span aria-hidden="true">&rarr;</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    className="rounded mr-4 border border-primary px-3.5 py-2.5 text-sm font-semibold text-primary hover:text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Get started
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-semibold leading-6 transition-transform text-dark-grey hover:-translate-y-1"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                </>
              )}
            </div>
          </nav>
          {/* Mobile menu */}
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <img className="w-48 h-auto" src={logo} alt="" />
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flow-root mt-6">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6 space-y-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg text-dark-grey hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    {user.user_id ? (
                      <>
                        <button
                          onClick={() => navigate("/signup")}
                          className="rounded mr-4 border bg-primary px-3.5 py-2.5 text-sm font-semibold text-white hover:text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Signup
                        </button>
                        <button
                          onClick={() => navigate("/subscriptions")}
                          className="rounded mr-4 border border-primary px-3.5 py-2.5 text-sm font-semibold text-primary hover:text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Access Your Dashboard
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate("/signup")}
                          className="rounded mr-4 border bg-primary px-3.5 py-2.5 text-sm font-semibold text-white hover:text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Get started
                        </button>
                        <button
                          onClick={() => navigate("/login")}
                          className="rounded mr-4 border border-primary px-3.5 py-2.5 text-sm font-semibold text-primary hover:text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Log in
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
          {/* Mobile menu END */}
        </header>

        <div id="info" className="relative px-6 isolate pt-14 lg:px-8">
          {/* Background Effect Top */}
          <div
            className="absolute inset-x-0 overflow-hidden -top-40 -z-50 transform-gpu blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="max-w-2xl py-20 mx-auto sm:py-24 lg:pt-24 lg:pb-44">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="flex items-center px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span className="mr-2">Track. Manage. Save.</span>
                <button
                  onClick={scrollToDiv}
                  className="font-semibold transition-transform text-primary hover:-translate-y-1"
                >
                  Learn more <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-dark-grey sm:text-6xl">
                The Smart Way To Manage Your Subscriptions
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Effortlessly manage and track all your recurring payments in one
                central location with SubsTracker. Our app is designed to
                simplify your subscription management, making it easy to handle
                your monthly expenses.
              </p>
              <div className="flex items-center justify-center mt-10 gap-x-6">
                {user.user_id ? (
                  <button
                    onClick={() => navigate("/subscriptions")}
                    className="rounded bg-primary animate-bounce px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Access Your Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/signup")}
                    className="rounded bg-primary animate-bounce px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Start Now
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Animated PNGs */}
          <div
            className="hidden sm:block absolute w-16 h-16 -z-30 top-15% left-7% md:top-20% lg:left-10% animate-grow-and-fade-in-1s"
            style={{ transform: "scale(0)", opacity: "0" }}
          >
            <img
              src="https://ik.imagekit.io/mmalo/SubsTracker/Images/netflix-3d.png"
              alt="Netflix Icon"
              className="drop-shadow-xl"
            />
          </div>
          <div
            className="hidden sm:block absolute w-14 h-14 -z-30 bottom-1/2 left-2% sm:bottom-1/2 md:top-1/2 lg:left-5% animate-grow-and-fade-in-2s"
            style={{ transform: "scale(0)", opacity: "0" }}
          >
            <img
              src="https://ik.imagekit.io/mmalo/SubsTracker/Images/slack-3d.png"
              alt="Slack Icon"
              className="drop-shadow-xl"
            />
          </div>
          <div
            className="hidden sm:block absolute w-18 h-18 lg:w-20 lg:h-20 -z-30 bottom-15% left-5% lg:bottom-20% lg:left-10% animate-grow-and-fade-in-4s"
            style={{ transform: "scale(0)", opacity: "0" }}
          >
            <img
              src="https://ik.imagekit.io/mmalo/SubsTracker/Images/spotify-3d.png"
              alt="Spotify Icon"
              className="drop-shadow-xl"
            />
          </div>

          <div
            className="hidden sm:block absolute w-18 h-18 -z-30 top-15% right-10% md:top-20% lg:right-12% animate-grow-and-fade-in-4s"
            style={{ transform: "scale(0)", opacity: "0" }}
          >
            <img
              src="https://ik.imagekit.io/mmalo/SubsTracker/Images/figma-3d.png"
              alt="Dropbox Icon"
              className="drop-shadow-xl"
            />
          </div>

          <div
            className="hidden sm:block absolute w-16 h-16 -z-30 bottom-1/2 right-5% lg:right-7% animate-grow-and-fade-in-1s"
            style={{ transform: "scale(0)", opacity: "0" }}
          >
            <img
              src="https://ik.imagekit.io/mmalo/SubsTracker/Images/youtube-3d.png"
              alt="Youtube Icon"
              className="drop-shadow-xl"
            />
          </div>
          <div
            className="hidden sm:block absolute w-12 h-12 -z-30 bottom-20% right-7% lg:right-12% animate-grow-and-fade-in-2s"
            style={{ transform: "scale(0)", opacity: "0" }}
          >
            <img
              src="https://ik.imagekit.io/mmalo/SubsTracker/Images/amazon-3d.png"
              alt="Amazon Icon"
              className="drop-shadow-xl"
            />
          </div>

          {/* Animated PNGs END*/}
          {/* Background Effect Bottom */}
          <div
            className="hidden sm:block absolute inset-x-0 top-[calc(100%-13rem)] -z-50 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
      {/* Hero END*/}

      {/* INFO + MOCKUP */}
      <div className="py-16 overflow-hidden bg-white z-99 sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="grid items-center max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary">
                  Forget Unwanted Charges
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-dark-grey sm:text-4xl">
                  Simplify Your Recurring Payments with SubsTracker
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Effortlessly manage all your recurring payments, avoid payment
                  surprises, and keep track of your expenses.
                </p>
                <dl className="max-w-xl mt-10 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-dark-grey">
                        <div className="absolute w-5 h-5 left-1 top-1 text-primary">
                          {feature.icon}
                        </div>
                        {feature.name}
                        <br></br>
                      </dt>
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="relative">
              <img
                src={
                  isDashboardDark
                    ? "https://ik.imagekit.io/mmalo/SubsTracker/Images/substracker-dark.jpg"
                    : "https://ik.imagekit.io/mmalo/SubsTracker/Images/substracker-dashboard-light.jpg"
                }
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 transition-transform duration-300 ease-in-out z-50 hover:-translate-x-4"
                width={2432}
                height={1442}
              />
              <div className="absolute p-1.5 bg-white rounded -top-12 right-6 drop-shadow">
                <div className="transition-transform duration-300 ease-in-out origin-center cursor-pointer hover:scale-110 transform-gpu">
                  {isDashboardDark ? (
                    <LightIcon
                      onClick={toggleDashboard}
                      className={"scale-105"}
                    />
                  ) : (
                    <DarkIcon onClick={toggleDashboard} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* INFO + MOCKUP END */}

      {/* MOBILE MOCKUP + INFO */}
      <div className="py-16 overflow-hidden z-99 sm:py-32 dark:bg-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-2">
          <div className="grid items-center max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://ik.imagekit.io/mmalo/SubsTracker/Images/mobile-mockup.jpeg"
                alt="Product screenshot"
                className="w-[60rem] sm:w-[60rem] md:-ml-4 lg:-ml-0 transition-transform duration-300 ease-in-out z-50 hover:-translate-x-4"
                // width={2432}
                // height={1442}
              />
            </div>
            <div className="order-1 lg:pr-8 lg:order-2">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary">
                  Mobile Friendly
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-dark-grey sm:text-4xl">
                  Manage Your Subscriptions On The Go
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Take full control of your recurring payments, anytime,
                  anywhere, right from the palm of your hand.{" "}
                </p>
                <dl className="max-w-xl mt-10 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {mobileFeatures.map((mobileFeature) => (
                    <div key={mobileFeature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-dark-grey">
                        <div className="absolute w-5 h-5 left-1 top-1 text-primary">
                          {mobileFeature.icon}
                        </div>
                        {mobileFeature.name}
                        <br></br>
                      </dt>
                      <dd className="inline">{mobileFeature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* INFO + MOCKUP END */}

      <div className="relative py-24 overflow-hidden bg-gray-900 isolate sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 object-cover object-right w-full h-full -z-10 md:object-center"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#9145B6] to-[#D180F6] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#9145B6] to-[#D180F6] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Are You a Business?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Whether you’re a solo entrepreneur or part of a larger
              organization, SubsTracker can be an invaluable tool for managing
              all your business-related recurring payments.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-10 lg:mx-0 lg:max-w-none">
            <dl className="grid grid-cols-1 gap-8 mt-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-gray-300">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="py-16 bg-white sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Stay in Control of Your Recurring Payments
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-dark-grey sm:text-4xl">
              Why Choose SubsTracker?
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unveil the powerful tools that set us apart.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {usp.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-dark-grey">
                    <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 p-2 text-white rounded-lg bg-primary hover:bg-primary-dark">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white">
        <div className="relative py-16 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
          <div className="relative px-6 pt-16 overflow-hidden bg-gray-900 shadow-2xl isolate sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#9145B6" />
                  <stop offset={1} stopColor="#D180F6" />
                </radialGradient>
              </defs>
            </svg>
            <div className="max-w-md mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Take Control of Your Recurring Payments
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Say goodbye to late fees or accidental renewals
                and navigate your financial commitments with ease. Get started
                with SubsTracker today.
              </p>
              <div className="flex items-center justify-center mt-10 gap-x-6 lg:justify-start">
                <button
                  onClick={() => navigate("/signup")}
                  className="rounded transition-transform hover:-translate-y-1 bg-white px-3.5 py-2.5 text-sm font-semibold text-dark-grey shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </button>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md z-100000 bg-white/5 ring-1 ring-white/10 transition-transform duration-300 ease-in-out z-50 hover:-translate-x-4"
                src={
                  isAddDark
                    ? "https://ik.imagekit.io/mmalo/SubsTracker/Images/add-subscription-dark.jpg"
                    : "https://ik.imagekit.io/mmalo/SubsTracker/Images/add-subscription-light.jpg"
                }
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
            {/* Mobile Swtich */}
            <div className="absolute p-1.5 bg-white rounded bottom-86 right-8 drop-shadow md:hidden">
              <div className="transition-transform duration-300 ease-in-out origin-center cursor-pointer hover:scale-110 transform-gpu">
                {isAddDark ? (
                  <LightIcon onClick={toggleAdd} className="scale-105" />
                ) : (
                  <DarkIcon onClick={toggleAdd} />
                )}
              </div>
            </div>
          </div>
          <div className="absolute p-1.5 hidden bg-white rounded top-20 right-12 drop-shadow md:block">
            <div className="transition-transform duration-300 ease-in-out origin-center cursor-pointer hover:scale-110 transform-gpu">
              {isAddDark ? (
                <LightIcon onClick={toggleAdd} className="scale-105" />
              ) : (
                <DarkIcon onClick={toggleAdd} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-white bg-gray-800">
        <div className="container mx-auto text-center">
          <p className="mb-4">© {new Date().getFullYear()} SubsTracker. All Rights Reserved.</p>
          {/* <div className="space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="text-xl fab fa-linkedin-in"></i>
            </a>
          </div> */}
        </div>
      </footer>
    </main>
  );
}
export default Home;
