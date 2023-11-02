import React, {useEffect} from "react";
import { Select } from "@windmill/react-ui";

const SelectBusType = ({ register, name, label, onChange, defaultValue}) => {
  

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        name={name}
        onChange={onChange}
      >
        <option value={defaultValue}>{defaultValue}</option>
        <option value="Luxury">Luxury</option>
        <option value="Executive">Executive</option>
        <option value="Executive Plus">Executive Plus</option>
        <option value="Business">Business</option>
      </Select>
    </>
  );
};

export default SelectBusType
