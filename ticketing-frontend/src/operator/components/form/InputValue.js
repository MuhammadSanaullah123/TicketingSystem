import React from "react";
import { Input } from "@windmill/react-ui";

const InputValue = ({ required, maxValue, minValue, defaultValue, name, label, type, placeholder, onChange }) => {
  const value = {
    valueAsNumber: true,
    required: required ? false : `${label} is required!`,
    max: {
      value: maxValue,
      message: `Maximum value ${maxValue}!`,
    },
    min: {
      value: minValue,
      message: `Minimum value ${minValue}!`,
    },
  };
  return (
    <>
      <Input
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
      />
    </>
  );
};

export default InputValue;
