function Field({ title, type, value, options, onChange }) {
  if (type === "dropdown" && (!options || options.length === 0)) return null;

  return (
    <div className="pb-4">
      <h2 className="pb-2">{title}</h2>
      {type === "dropdown" ? (
        <select className="w-full p-2 text-dark-grey" value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input className="w-full p-2 text-dark-grey" type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
}

export default Field;
