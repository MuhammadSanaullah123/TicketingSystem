import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import StaffDrawer from '../drawer/StaffDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import ShowHideButton from '../table/ShowHideButton'
import Status from "../table/Status"

const StaffTable = ({ staffs }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {/* {staffs?.map((staff) => ( */}
          <TableRow>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {' '}
                {/* {staff._id.substring(20, 24)} */}
                43546
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                {/* <Avatar
                  className="hidden mr-3 md:block bg-gray-50"
                  src={staff.image}
                  alt={staff.name}
                /> */}
                <div>
                  <h2 className="text-sm font-medium">
                    {/* {staff.name} */}
                    Abdullah
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {staff.email} */}
                abc@gmail.com
              </span>{' '}
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {staff.email} */}
+878764325            </span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm ">
                {/* {staff.phone} */}
                Thank you for the quick response and even faster fix !! :D Now <br/> that I can get to rate, I'd give it five.. My co-workers<br/> love the "fun/new" dummy text the documents!! Works like<br/> a charm, as you might be able to figure out
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(staff.joiningData).format('MMM D, YYYY')} */}
                09/08/2021
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {/* {staff.role} */}
                <Status status={'Processing'} />
              </span>
            </TableCell>
            {/* <TableCell>
              <EditDeleteButton
                // id={staff._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell> */}
          </TableRow>
        {/* ))} */}
      </TableBody>
    </>
  );
};

export default StaffTable;
