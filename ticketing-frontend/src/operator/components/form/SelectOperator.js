import React, { useEffect, useState } from "react";
import { Select } from "@windmill/react-ui";
// API
import { getAllOperators } from "../../../actions/operators";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const SelectOperator = ({
  register,
  name,
  label,
  defaultValue,
  onChange,
  operators: { operators },
  busData,
  setBusData,
}) => {
  const [allOperators, setAllOperators] = useState(null);
  const [filteredOperators, setFilteredOperators] = useState(operators);

  let defaultName;
  let filtered = [];
  let filteredOut = [];

  if (allOperators && defaultValue) {
    filtered = allOperators?.filter(
      (operator) => operator._id !== defaultValue
    );
    filteredOut = allOperators?.filter(
      (operator) => operator._id === defaultValue
    );
    defaultName = filteredOut[0]?.operatorName;
    // setBusData({...busData, operatorId: filteredOut[0]?._id})
  }

  useEffect(() => {
    store.dispatch(getAllOperators());
    setAllOperators(operators);
  }, [store]);

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        name={name}
        onChange={(e) => setBusData({ ...busData, operatorId: e.target.value })}
      >
        {/* {operators !== null && 
          operators.map((operator) =>
          <option value={operator._id}>{operator.operatorName}</option>
          )
        } */}
        {operators !== null && defaultName ? (
          <>
            <option value={defaultValue}>{defaultName}</option>
            {filtered?.map((operator, index) => (
              <option key={index} value={operator?._id}>
                {operator?.operatorName}
              </option>
            ))}
          </>
        ) : (
          operators?.map((operator, index) => (
            <option key={index} value={operator?._id}>
              {operator?.operatorName}
            </option>
          ))
        )}
      </Select>
    </>
  );
};

SelectOperator.propTypes = {
  // addBus: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  operators: state.operators,
});

export default connect(mapStateToProps, null)(SelectOperator);
