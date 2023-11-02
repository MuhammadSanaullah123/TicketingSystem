import React from 'react';
import { Badge } from '@windmill/react-ui';

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {status === 'Not Available' && <Badge type="warning">{status}</Badge>}
        {status === 'cancelled' && <Badge>{status}</Badge>}
        {status === 'In Journey' && <Badge>{status}</Badge>}
        {status === 'Yet To Depart' && <Badge type="success">{status}</Badge>}
        {status === 'Approved' && <Badge type="success">{status}</Badge>}
        {status === 'Yet To Arrive' && <Badge type="danger">{status}</Badge>}
      </span>
    </>
  );
};

export default Status;
