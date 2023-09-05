function Button({ content, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center w-full h-12 mb-3 text-base font-bold text-white rounded-md cursor-pointer bg-primary hover:bg-primary-dark ${disabled ? 'opacity-40' : ''}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
