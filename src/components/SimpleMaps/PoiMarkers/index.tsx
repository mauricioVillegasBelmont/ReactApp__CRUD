import  { FC } from "react";
// import styles from "./PoiMarkers.module.scss";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export type Poi = { key: string; location: google.maps.LatLngLiteral };
interface PoiMarkersProps {
  pois: Poi[];
}
const PoiMarkers: FC<PoiMarkersProps> = (props:PoiMarkersProps) =>{
  const { pois } = props;
  return (
    <>
      {pois.map((poi: Poi) => (
        <AdvancedMarker key={poi.key} position={poi.location} >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
}

export default PoiMarkers;
