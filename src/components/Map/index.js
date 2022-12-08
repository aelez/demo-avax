import * as React from 'react';
import cx from 'classnames';
import GoogleMapReact from 'google-map-react';
import noop from 'utils/noop';
import s from './styles.module.scss';

/**
 * Map component
 *
 * Uses google-map-react for rendering Google Maps
 * https://github.com/istarkov/google-map-react/
 *
 * Sample usage:
      import Map from 'components/Map';
      import Marker from 'components/Map/Marker';

      const Marker = ({ text }) => <div className={s.marker}>{text}</div>;

      <Card title="Map">
        <Map onMarkerClick={console.log} onClick={console.log}>
          <Marker lat={43.51284322686024} lng={16.444437913162034} label="Appacus" />
        </Map>
      </Card>
 *
 */

const MAP_API_CONFIG = {
  key: 'AIzaSyCFkKUqa4nxv67d3ljQbQQx1t8TmJTWdoY',
  libraries: 'places',
  region: 'hr',
  language: 'en',
};

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

const UI_OPTIONS = maps => ({
  zoomControl: true,
  mapTypeControl: true,
  panControl: false,
  scrollwheel: false,
  mapTypeControlOptions: {
    position: maps.ControlPosition.LEFT_TOP,
  },
  styles: [{
    stylers: [{
      saturation: -75
    }]
  }]
});

let CACHED_POSITION = null;

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 43.5117416,
      lng: 16.4465468,
    }, // defaults to Split
    zoom: 12,
    className: '',
    children: undefined,
    onInit: noop,
    centerUser: false,
  };

  state = {
    zoom: this.props.zoom,
    center: this.props.center,
  };

  // google maps API object
  gMaps = null;

  // map instance
  map = null;

  // When this flag is true then getCurrentPosition request is in process
  // this is how we know whether to NOT set state on unmounted components
  geoPosRequest = null;

  // This number is used for predicting zoom level and map position
  markerCount = 0;

  componentDidMount() {
    if (this.props.centerUser === true) {
      this.getUsersLocation();
    }
  }

  componentWillUnmount() {
    // Clear pointers to Google Map instances
    this.gMaps = null;
    this.map = null;
    this.geoPosRequest = null;
    this.calculateNumberOfMarkers();
  }

  componentWillReceiveProps(nextProps) {
    // update zoom when new value comes in
    if (nextProps.zoom !== this.props.zoom) {
      this.setZoom(nextProps.zoom);
    }

    // update center when new value comes in
    if (nextProps.center !== this.props.center) {
      this.setCenter(nextProps.center);
    }

    if (nextProps.children !== this.props.children) {
      this.calculateNumberOfMarkers();
    }
  }

  getUsersLocation = () => {
    if (CACHED_POSITION) {
      this.setUsersLocation(CACHED_POSITION);
      return;
    }

    if (window.navigator.geolocation) {
      this.geoPosRequest = true;
      window.navigator.geolocation.getCurrentPosition(position => {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const zoom = 10;

        if (this.geoPosRequest && this.markerCount < 1) {
          CACHED_POSITION = { center, zoom };
          this.setUsersLocation(CACHED_POSITION);
          this.geoPosRequest = null;
        }
      });
    }
  };

  setUsersLocation = ({ zoom, center }) => {
    this.setState({ center, zoom });
    this.setZoom(zoom);
  };

  calculateNumberOfMarkers = () => {
    this.markerCount = React.Children.count(this.props.children);
  };

  /**
   * Google Maps API will load after this component mounts
   * When it loads, we want to cache instances of
   *  map: Map instance
   *  gMaps: Google Maps API instance
   */
  onMapLoaded = ({ map, maps }) => {
    this.map = map;
    this.gMaps = maps;
    window.map = map;

    const { zoom, center } = this.state;

    // try to restore zoom and center if it was set before map was initialized
    if (zoom) this.setZoom(this.state.zoom);
    if (center) this.setCenter(this.state.center);

    // tell other components that maps are ready
    this.props.onInit({ map, maps });
  };

  setZoom = zoom => {
    if (this.map && zoom) {
      this.setState({ zoom });
      this.map.setZoom(zoom);
    }
  };

  setCenter = center => {
    if (this.map && center) {
      this.setState({ center });
      this.map.setCenter(center);
    }
  };

  render() {
    // override properties
    const overrides = {};

    if (this.markerCount < 1) {
      // if no markers then center should be user's location
      overrides.center = this.state.center;
      overrides.zoom = 6;
    }

    return (
      <section className={cx(s.map, this.props.className)}>
        <GoogleMapReact
          bootstrapURLKeys={MAP_API_CONFIG}
          options={UI_OPTIONS}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
          hoverDistance={K_HOVER_DISTANCE}
          onGoogleApiLoaded={this.onMapLoaded}
          yesIWantToUseGoogleMapApiInternals
          {...this.props}
          {...overrides}
        />
      </section>
    );
  }
}
