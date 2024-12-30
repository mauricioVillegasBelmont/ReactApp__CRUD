import  { FC } from "react";
// import styles from "./SimpleMaps.module.scss";
import {
  // AdvancedMarker,
  APIProvider,
  Map,
  // MapCameraChangedEvent,
  MapMouseEvent,
  // Pin,
} from "@vis.gl/react-google-maps";
import PoiMarkers, { Poi } from "./PoiMarkers";



interface SimpleMapsProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  locations?: Poi[];
  locationsCallback?: (detail: MapMouseEvent["detail"]) => void;
}

const SimpleMaps: FC<SimpleMapsProps> = (props:SimpleMapsProps) =>{
  const { center, zoom, locations = [], locationsCallback } = props;
  const doubleClickHandler = (event: MapMouseEvent) => {
    if(locationsCallback !== undefined) locationsCallback(event.detail);
  };
  return (
    <>
      <APIProvider
        apiKey={process.env.REACT_APP_MAPS_API_KEY ?? ""}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          mapId={process.env.REACT_APP_MAP_ID}
          defaultZoom={zoom}
          defaultCenter={center}
          onDblclick={doubleClickHandler}
          streetViewControl={false}
          mapTypeControl={false}
        >
          <PoiMarkers pois={locations} />
        </Map>
      </APIProvider>
    </>
  );
}

export default SimpleMaps;
