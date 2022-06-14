import { ReactChildren, useEffect, ReactElement } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as BaseMap } from 'leaflet';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';

import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import internal from 'stream';

export interface MapPropType {
  children: (RL: typeof ReactLeaflet,  map: BaseMap) => ReactElement;
  className?:string;
  center?:LatLngExpression;
  zoom?:number;

}


const { MapContainer } = ReactLeaflet;

const Map = ({ children, ...rest }: MapPropType,className:string) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet)}
    </MapContainer>
  )
}

export default Map;