import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const MultiSelectAddBus = (props) => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      {/* <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={props.options}
        value={props.selected}
        onChange={(e) => props.setSelected(e)}
        labelledBy="Select Amenties"
      />
    </div>
  );
};

export default MultiSelectAddBus;
