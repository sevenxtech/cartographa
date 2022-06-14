import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { GraphQLClient } from "graphql-request";
import { GetStaticProps } from "next";
import { GeoJsonObject } from 'geojson';

import Map from '../src/components/Map';
import { GetCoordinatesDocument,GetCoordinatesQuery,GetOneCoordinatesQuery,GetOneCoordinatesDocument} from '../src/graphql/generated/graphql';
import styles from "../styles/Home.module.css";

const DEFAULT_CENTER: LatLngExpression = [28.70,77.10]

const hasuraUrl = process.env.HASURA_GRAPHQL_URL;
const token = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const client = new GraphQLClient(hasuraUrl as string, {
  headers: {
    "x-hasura-admin-secret" : token!,
  },
});

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const data: GetOneCoordinatesQuery = await client.request(GetOneCoordinatesDocument);
    console.log(data);
    return {
      props: data,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export interface GeoJSONPropType {
  // children: (RL: typeof ReactLeaflet,  map: BaseMap) => ReactElement;
  data?:string;
  // center?:LatLngExpression;
  // zoom?:number;

}

const Home: NextPage = (props) => {
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Cartographa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {<Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
          {({ TileLayer, Marker, Popup, GeoJSON, Circle, Polygon, Polyline, Rectangle }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <GeoJSON data={props.postgis}>
                {/* {props.postgis[0].properties.language} */}
              </GeoJSON>
              <GeoJSON data={{ type: "Feature",geometry: {type: "Point",coordinates: [125.6, 10.1] }} as GeoJsonObject }/>
              <Marker position={DEFAULT_CENTER}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}
        </Map>}
      </main>
    </div>
  );
};

export default Home;
