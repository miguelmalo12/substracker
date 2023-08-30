import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { ArrowPathIcon, FingerPrintIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logos/SubsTracker-Logo-H.png";

// For future potential site growth
const navigation = [
  //   { name: "Product", href: "#" },
];

const features = [
  {
    name: "Comprehensive Tracking of Recurring Payments.",
    description:
      "Manage recurring payments with ease. SubsTracker categorizes payments in a centralized view. Set reminders for individual payments to avoid late fees or accidental renewals.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Multi-Currency Support.",
    description:
      "SubsTracker supports multiple currencies and converts your total spend into your preferred currency, keeping you in the loop regardless of where your payments are going.",
    icon: LockClosedIcon,
  },
  {
    name: "Shared Expenses Made Easy.",
    description:
      "Have shared expenses? With SubsTracker, see which payments are shared, helping you track these expenses seamlessly.",
    icon: ServerIcon,
  },
];

const usp = [
  {
    name: "All-in-One Dashboard",
    description:
      "View all your subscriptions, payments, and reminders in one intuitive dashboard. No more toggling between multiple apps or spreadsheets.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Personalized Payment Reminders",
    description:
      "Set up reminders for specific payments you don't want to miss. Whether it's your monthly rent or a quarterly subscription, our reminder system keeps you on top of your payment schedule.",
    icon: LockClosedIcon,
  },
  {
    name: "Custom Payment Methods",
    description:
      "SubsTracker allows you to add your own payment methods, providing a comprehensive way to track how you're making your recurring payments. No matter how you are making that payment, see it all in one place.",
    icon: ArrowPathIcon,
  },
  {
    name: "User-Friendly Interface",
    description:
      "With a focus on user experience, SubsTracker offers a clean, intuitive, and responsive design that makes managing all your recurring payments a smooth and enjoyable process.",
    icon: FingerPrintIcon,
  },
];

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToDiv = (ref) => {
    const element = document.getElementById(ref);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main>
      {/* Hero */}
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <span className="sr-only">SubsTracker</span>
              <img className="h-auto w-48" src={logo} alt="" />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button
                onClick={() => navigate("/signup")}
                className="rounded mr-4 border border-primary px-3.5 py-2.5 text-sm font-semibold text-primary hover:text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
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
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <img className="h-auto w-48" src={logo} alt="" />
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <button
                      onClick={() => navigate("/login")}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        {/* App info */}
        <div id="info" className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:pt-24 lg:pb-44">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="flex items-center rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span className="mr-2">Track. Manage. Save.</span>
                <button
                  onClick={scrollToDiv}
                  className="font-semibold text-primary"
                >
                  Learn more <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                The Smart Way To Manage Your Subscriptions
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Effortlessly manage and track all your recurring payments in one
                central location with SubsTracker. Our app is designed to
                simplify your subscription management, making it easy to handle
                your monthly expenses.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => navigate("/signup")}
                  className="rounded bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
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

      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary">
                  Forget Unwanted Charges
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Simplify Your Recurring Payments with SubsTracker
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  With our solution, you can effortlessly manage all your
                  recurring payments, avoid payment surprises, and keep track of
                  your expenses.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Stay in Control of Your Recurring Payments
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose SubsTracker?
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unveil the powerful tools that set us apart.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {usp.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
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
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
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
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Take Control of Your Recurring Payments
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              Never miss a payment or pay for a forgotten subscription again and navigate your financial commitments with ease. Get started with SubsTracker today.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <button
                  onClick={() => navigate("/signup")}
                  className="rounded bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </button>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2023 SubsTracker. All Rights Reserved.</p>
          <div className="space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
export default Home;