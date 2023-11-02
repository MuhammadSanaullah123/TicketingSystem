import React from 'react';
import { Input } from '@windmill/react-ui';

const InputArea = ({
  defaultValue,
  required,
  name,
  label,
  type,
  onChange,
  placeholder,
}) => {
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

export default InputArea;
