function ButtonSmall({ content, type }) {
  const bgColor = type === "primary" ? "bg-primary" : "bg-primary-bg";
  const textColor = type === "primary" ? "text-white" : "text-primary";

  return (
    <div className={`flex items-center justify-center w-22 md:-w-30 h-10 mb-3 ${textColor} rounded-md cursor-pointer ${bgColor}`}>
      <h2 className="font-semibold">{content}</h2>
    </div>
  );
}

export default ButtonSmall;
