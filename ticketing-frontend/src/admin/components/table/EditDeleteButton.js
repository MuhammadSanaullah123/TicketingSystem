import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import Tooltip from '../tooltip/Tooltip';

const EditDeleteButton = ({ id, onClickDeleteBus,handleUpdate,busData, handleModalOpen,code,couponData }) => {

  console.log("onClickDeleteBusEditButton",onClickDeleteBus)
  return (
    <>
      <div className="flex justify-end text-right topTrashIcon">
       {code && <div
          onClick={() => handleUpdate(id,couponData)}
          className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
        >
          <Tooltip id="edit" Icon={FiEdit} width="100px" title="Edit" bgColor="#d3a74b" />
        </div>
}
        <div
          onClick={() => handleModalOpen(id,onClickDeleteBus,busData)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            title="Delete"
            bgColor="#EF4444"
          />
        </div>
      </div>
    </>
  );
};

export default EditDeleteButton;
