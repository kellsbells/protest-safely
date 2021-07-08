import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { googleMapsKey } from '../config';
import Body from '../map/body';
// import * as scripts from './scripts';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    state = {
       lat : 39.739235,
       long: -104.990250,
    }

  render() {

  

    return (
        <>
    <Body />
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
         lat: this.state.lat,
         lng: this.state.long,
        }}
      />
      </>
    );
  }
}

//TODO figure out how to get this into secret key stuff for launch

export default GoogleApiWrapper({
  apiKey: googleMapsKey
})(MapContainer);