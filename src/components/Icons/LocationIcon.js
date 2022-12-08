import * as React from 'react';
import AirportIcon from './Airport';
import HotelIcon from './Hotel';
import MeetGreetIcon from './MeetGreet';
import CityIcon from './Office';

export default class LocationIcon extends React.Component {
  render() {
    const { type, className } = this.props;

    if (type === 'airport') {
      return <AirportIcon className={className} />;
    } else if (type === 'hotel') {
      return <HotelIcon className={className} />;
    } else if (type === 'city' || type === 'office') {
      return <CityIcon className={className} />;
    } else if (type === 'meet-greet') {
      return <MeetGreetIcon className={className} />;
    }
    return null;
  }
}
