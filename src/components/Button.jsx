function Button({ content, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`flex items-center  justify-center w-full h-12 mb-3 text-base font-bold text-white rounded-md bg-primary ${disabled ? 'opacity-40 cursor-default' : 'cursor-pointer hover:bg-primary-dark'}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
