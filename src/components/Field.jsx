function Field({ title, type, options, defaultValue }) {
  if (type === "dropdown" && (!options || options.length === 0)) return null;

  return (
    <div className="pb-4">
      <h2 className="pb-2">{title}</h2>
      {type === "dropdown" ? (
        <select className="w-full p-2" defaultValue={defaultValue}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="w-full p-2"
          type={type}
        />
      )}
    </div>
  );
}

export default Field;
