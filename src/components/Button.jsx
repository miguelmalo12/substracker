function Button({ content, onClick }) {
  return (
    <button className="flex items-center justify-center w-full h-12 mb-3 text-base font-bold text-white rounded-md cursor-pointer bg-primary hover:bg-primary-dark" onClick={onClick} >
      {content}
    </button>
  );
}

export default Button;
