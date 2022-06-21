import { useEffect, ReactElement } from 'react';

import L from 'leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import * as ReactLeaflet from 'react-leaflet';

import styles from './Map.module.css';

export interface MapPropType {

  children: (RL: typeof ReactLeaflet) => ReactElement;
  className?: string;
  center?: LatLngExpression;
  zoom?: number;
  dragging?:boolean;
  attributionControl:boolean;
  zoomControl:boolean;
}

const { MapContainer } = ReactLeaflet;

const Map = ({ children, ...rest }: MapPropType, className: string) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      // delete L.Icon.Default.prototype._getIconUrl;

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