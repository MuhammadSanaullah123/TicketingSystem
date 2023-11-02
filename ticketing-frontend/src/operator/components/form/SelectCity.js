import React, {useEffect} from "react";
import { Select } from "@windmill/react-ui";

const SelectCity = ({ register, name, label, onChange, defaultValue}) => {
  
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        name={name}
        onChange={onChange}
      >
        <option value={defaultValue}>{defaultValue}</option>
        <option value="Multan">Multan</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Rawalpindi">Rawalpindi</option>
        <option value="Sargodha">Sargodha</option>
        <option value="Peshawar">Peshawar</option>
      </Select>
    </>
  );
};

export default SelectCity
