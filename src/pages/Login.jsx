import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";

import logo from "../assets/logos/SubsTracker-Logo.png";

function Login() {
  return (
    <div className="responsive-padding">
      <div>
        <Navbar content={"Select Account"} />
        <div className="flex justify-center">
          <img className="w-40 responsive-margin" src={logo} alt="" />
        </div>
        <div className="mt-4 mb-4 border"></div>
      </div>
      <div className="max-w-sm md:mx-auto">
        <div>
          <h1 className="text-2xl text-left">Login</h1>
          <div className="mt-1 mb-5 border-4 w-18 border-primary"></div>
        </div>
        <Field title={"Email"} type={"text"} />
        <Field title={"Password"} type={"password"} className="pt-0" />
        <Button content={"Login"} />
        <p className="text-center">
          Don't have an account?{" "}
          <a className="font-bold cursor-pointer text-primary">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
