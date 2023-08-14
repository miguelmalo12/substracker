import Navbar from '../components/Navbar'
import Field from '../components/Field'
import Button from '../components/Button'

import logo from '../assets/logos/SubsTracker-Logo.png';

function Signup() {
  return (
    <div className='responsive-padding'>
        <Navbar content={'Create Account'} />
        <div className='flex justify-center'>
            <img className='w-40 responsive-margin' src={logo} alt="" />
        </div>
        <div className="mt-4 mb-4 border"></div>
        <div>
            <h1 className="text-2xl text-left">Signup</h1>
            <div className='mt-1 mb-5 border-4 w-22 border-primary'></div>
        </div>
        <Field title={'Email'} type={"text"} />
        <Field title={'Password'} type={"password"} className="pt-0" />
        <Field title={'Repeat Password'} type={"password"} className="pt-0" />
        <Field title={'Currency'} type={"dropdown"} options={[
          "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
        ]} defaultValue={"CAD"} className="pt-0" />
        <Button content={'Signup'} />
        <p className='text-center'>Don't have an account? <a className='font-bold cursor-pointer text-primary' >Login</a></p>
    </div>
  )
}

export default Signup