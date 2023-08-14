function Button({ content }) {
  return (
    <div className="flex items-center justify-center w-full h-12 mb-3 text-white rounded-md cursor-pointer bg-primary">
      <h2>{content}</h2>
    </div>
  );
}

export default Button;
