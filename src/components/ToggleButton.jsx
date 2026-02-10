const ToggleButton = ({
  value = false,
  onChange,
  disabled = false,
}) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!value);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative w-14 h-7 flex items-center rounded-full px-1
        transition-colors duration-300
        ${value ? "bg-green-500" : "bg-gray-400"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          w-5 h-5 bg-white rounded-full shadow
          transform transition-transform duration-300
          ${value ? "translate-x-7" : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default ToggleButton;

