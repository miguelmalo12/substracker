import Navbar from '../components/Navbar'
import Field from '../components/Field'

import logo from '../assets/logos/SubsTracker-Logo.png';

function Login() {
  return (
    <div className='responsive-padding'>
        <Navbar content={'Select Account'} />
        <div className='flex justify-center'>
            <img className='w-40 responsive-margin' src={logo} alt="" />
        </div>
        <div className="mt-4 mb-4 border"></div>
        <div>
            <h1 className="text-2xl text-left">Login</h1>
            <div className='mt-1 mb-5 border-4 w-18 border-primary'></div>
        </div>
        <Field title={'Email'} type={"text"} />
        <Field title={'Password'} type={"password"} className="pt-0" />

    </div>
  )
}

export default Login