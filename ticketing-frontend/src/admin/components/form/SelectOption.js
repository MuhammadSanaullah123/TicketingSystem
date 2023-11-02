import React, {useEffect} from "react";
import { Select } from "@windmill/react-ui";
// Redux
import { adminBus } from "../../../Redux/userReducer";
import { useSelector, useDispatch } from "react-redux";

const SelectOption = ({ busArray,operatorId, register, name, label, onChange, defaultValue}) => {
  const dispatch = useDispatch();

  const busData = useSelector(
    (state) => state?.userReducer?.adminBusData
  );

  // console.log(busData)

  useEffect(() => {
    dispatch(adminBus());
  }, []);
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        name={name}
        onChange={onChange}
      >
        <option value="" defaultValue>{defaultValue}</option>
        {busArray != undefined && busArray.map((bus) => (
          <option key={bus._id} value={bus.busNumber}>{bus.busNumber}</option>
        ))}
        
      </Select>
    </>
  );
};

export default SelectOption;
