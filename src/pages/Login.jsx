import Navbar from "../components/Navbar";
import Field from "../components/Field";
import Button from "../components/Button";
import Footer from "../components/Footer";

function Login() {
  return (
    <div className="flex flex-col min-h-screen responsive-navbar-padding">
      <Navbar content={"Select Account"} />

      <div className="flex-grow">
        <div className="max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl text-left">Login</h1>
            <div className="mt-1 mb-5 border-4 w-18 border-primary"></div>
          </div>
          <a href="/login/google">
            <button className="flex items-center justify-center w-full h-12 p-2 mb-4 border-2 rounded bg-green border-dark-grey">
              <div className="flex">
                <img
                  className="pr-3"
                  src="https://i.postimg.cc/HLpc7TsB/google-icon.png"
                />
                <h3>Login with Google</h3>
              </div>
            </button>
          </a>
          <div className="flex-col items-center justify-center mt-6 mb-3">
            <div className="border border-border dark:border-dark-grey"></div>
            <h3 className="flex items-center justify-center w-3 mx-auto -mt-3 bg-white px-7">
              or
            </h3>
          </div>
          <Field title={"Email"} type={"email"} />
          <Field title={"Password"} type={"password"} className="pt-0" />
          <Button content={"Login"} />
          <p className="text-center">
            Don't have an account?{" "}
            <a href="/signup" className="font-bold cursor-pointer text-primary">
              Signup
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
