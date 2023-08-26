import { useState } from 'react';

function Switch() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      onClick={toggleSwitch}
      className={`relative h-[1.25rem] w-[2.5rem] md:h-6 md:w-12 items-center flex rounded-full transition-colors duration-200 cursor-pointer ${isOn ? 'bg-success' : 'bg-gray-300'}`}
    >
      <span
        className={`h-3 w-3 md:h-4 md:w-4 left-1 md:left-1 block absolute bg-white rounded-full transition-transform duration-200 transform ${isOn ? 'translate-x-[160%] md:translate-x-[140%]' : 'translate-x-0'}`}
      ></span>
    </div>
  );
}

export default Switch;
