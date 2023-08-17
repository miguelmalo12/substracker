import DoubleArrow from "../assets/icons/double_arrow.svg";

function DropdownFilter({ options, onChange }) {
  const handleDropdownChange = (event) => {
    if (onChange && typeof onChange === 'function') {
      onChange(event.target.value);
    }
  };
  
  return (
    <div className="relative w-32">
      <select onChange={handleDropdownChange} className="relative w-full h-10 px-2 font-semibold double-arrow-dropdown">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        className="absolute top-3 right-2.5 pointer-events-none"
        src={DoubleArrow}
        alt=""
      />
    </div>
  );
}

export default DropdownFilter;
