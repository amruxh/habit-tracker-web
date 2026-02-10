import { forwardRef } from "react";

const InputBox = forwardRef(
  (
    {
      label,
      type = "text",
      id,
      value,
      onChange,
      placeholder,
      className = "",
      error,
      required = false,
      disabled = false,
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col items-start gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`
            retro-border bg-card-base min-h-10 rounded px-3 w-full
            outline-none focus:ring-2 focus:ring-gray-600
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-500" : ""}
            ${className}
          `}
        />

        {error && (
          <p
            id={errorId}
            className="text-red-500 text-sm"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputBox.displayName = "InputBox";

export default InputBox;