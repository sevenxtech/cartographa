import useClient from '@clients/useClient';
import { useEffect, useState } from 'react'
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

const hasuraUrl = process.env.HASURA_GRAPHQL_URL;
const token = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const client = new GraphQLClient(hasuraUrl as string, {
  headers: {
    "x-hasura-admin-secret": token!,
  },
});


const MapSelect = (props: any) => {
  // let mapData;
  const [language, setLanguage] = useState();
  const [mapData, setmapData] = useState()
  const [isLoading, setLoading] = useState(false)

  const onSelect: any = (data: any) => {
    setLanguage(data.iso);
  }

    useEffect(() => {
    setLoading(true)
    fetch('/api/graphqlapi', {
      method: "post",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',                  
      },
      body: JSON.stringify({
          language,
      })
  })
      .then((res) => res.json())
      .then((data) => {
//         mapData = mapData.slice(0);
// mapData[0] = data.postgis[0];
// setmapData(mapData);
        setmapData(data)
        setLoading(false)
        console.log("apiresponse", data)
      })
  }, [language,setLanguage])

  const onEachLayer = (feature: any, layer: any) => {
    const iso = feature.properties.iso;
    const tier = feature.properties.Level;
    const lang = feature.properties.language;
    layer.bindPopup(`${iso} ${tier}  ${lang}`)
    // layer.bindTooltip("desc",  {permanent: false, direction:"auto"}) 
  }

  return (
    <div>Select
      <ul>
        {languages.map((e, i) => {
          return <li key={i}> <button onClick={() => onSelect(e)}>{e.iso}</button></li>
        })}</ul>
        
      {isLoading && <p>Loading Map</p>}
      {mapData && <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={4} dragging={true} attributionControl={false} zoomControl={false}>
        {({ TileLayer, Marker, Popup, GeoJSON }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <GeoJSON data={mapData.postgis} onEachFeature={onEachLayer}>
            </GeoJSON>
          </>
        )}
      </Map>}
    </div>
  )
}

export default MapSelect;

