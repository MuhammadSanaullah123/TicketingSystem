import React from 'react';
import { ReactComponent as AC } from '../../assets/air-conditioner.svg';
import { ReactComponent as WC } from '../../assets/headphones (1).svg';
import { ReactComponent as Sleeper } from '../../assets/headphones (2).svg';
import { ReactComponent as TV } from '../../assets/headphones (3).svg';
import { ReactComponent as Food } from '../../assets/headphones (4).svg';
import { ReactComponent as Emergency } from '../../assets/plastic-bottle (1).svg';
import { ReactComponent as Drinks } from '../../assets/plastic-bottle.svg';
import { ReactComponent as Charging } from '../../assets/phone-charger.svg';
import { ReactComponent as Headphones } from '../../assets/headphones.svg';
import { ReactComponent as Wifi } from '../../assets/wifi.svg';

const Icon = ({ icon }) => {
  switch (icon) {
    case 'AC':
      return <AC />;
    case 'WC':
      return <WC />;
    case 'Sleeper':
      return <Sleeper />;
    case 'TV':
      return <TV />;
    case 'Food':
      return <Food />;
    case 'Emergency':
      return <Emergency />;
    case 'Drinks':
      return <Drinks />;
    case 'Charging':
      return <Charging />;
    case 'Headphones':
      return <Headphones />;
    case 'Wifi':
      return <Wifi />;
    default:
      return null; // Handle any other cases as needed
  }
};

export default Icon;
