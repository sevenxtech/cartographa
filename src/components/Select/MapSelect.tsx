import useClient from '@clients/useClient';
import { useEffect, useRef, useState } from 'react'
import { GetLayerOnIsoQuery, GetOneCoordinatesDocument, GetOneCoordinatesQuery, useGetLayerOnIsoQuery, useGetOneCoordinatesQuery } from 'src/graphql/generated/graphql';
import Map from '@components/Map';
import styles from "@../../styles/Home.module.css";
import { LatLngExpression, Polygon, GeoJSON } from 'leaflet';
import { GetStaticProps } from 'next/types';
import { GraphQLClient } from 'graphql-request';

const languages = [
  { iso: "ars", language: "Nadji Arabic" },
  { iso: "sin", language: "Singalese" },
  { iso: "tso", language: "Tsongo" },
  { iso: "gan", language: "Chinese, Gan" },
]
const DEFAULT_CENTER: LatLngExpression = [28.70, 77.10]

const MapSelect = (props: any) => {
  // let mapData;
  const [isoCode, setIsoCode] = useState('ars');
  const [language, setLanguage] = useState('Nadji Arabic');
  const [mapData, setmapData] = useState();
  const [isLoading, setLoading] = useState(false);

  const onSelect: any = (data: any) => {
    setIsoCode(data.iso);
    setLanguage(data.language);
  }

  useEffect(() => {
    setLoading(true);
    fetch('/api/graphqlapi', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        isoCode,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setmapData(data)
        setLoading(false)
        console.log("apiresponse", data)
      })
  }, [isoCode, setIsoCode])

  const geoJsonRef = useRef();
  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers();
      geoJsonRef.current.addData(mapData.postgis);
    }
  }, [mapData]);

  const onEachLayer = (feature: any, layer: any) => {
    const iso = feature.properties.iso;
    const tier = feature.properties.Level;
    const lang = feature.properties.language;
    layer.bindPopup(`${iso} ${tier}  ${lang}`)
    // layer.bindTooltip("desc",  {permanent: false, direction:"auto"}) 
  }

  return (
    <div>
      <h2>Select Language</h2>
      <ul>
        {languages.map((e, i) => {
          return <li key={i}> <button onClick={() => onSelect(e)}>{e.iso} - {e.language}</button></li>
        })}
      </ul>
      {isLoading && <p>Loading Map...</p>}
      {!isLoading && <p>{language}</p>}
      {mapData && <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={4} dragging={true} attributionControl={false} zoomControl={false}>
        {({ TileLayer, Marker, Popup, GeoJSON }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <GeoJSON ref={geoJsonRef} data={mapData.postgis} onEachFeature={onEachLayer}>
            </GeoJSON>
          </>
        )}
      </Map>}
    </div>
  )
}

export default MapSelect;

