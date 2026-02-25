import type React from "react";
import { useState } from "react";
import Input, { type InputProps } from "./InputField";

type NumberInputProps = Omit<InputProps, "type" | "min">;

const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  onKeyDown,
  error = false,
  hint,
  ...props
}) => {
  const [showNegativeError, setShowNegativeError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    if (nextValue === "") {
      setShowNegativeError(false);
      onChange?.(e);
      return;
    }

    const numericValue = Number(nextValue);
    if (!Number.isFinite(numericValue)) {
      return;
    }

    if (numericValue < 0) {
      const target = e.target as HTMLInputElement;
      target.value = "0";
      setShowNegativeError(true);
      onChange?.(e);
      return;
    }

    setShowNegativeError(false);
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
      setShowNegativeError(true);
    }
    onKeyDown?.(e);
  };

  return (
    <Input
      {...props}
      type="number"
      min="0"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      error={error || showNegativeError}
      hint={showNegativeError ? "Negative values are not allowed." : hint}
    />
  );
};

export default NumberInput;
