import {Map, MapRef, Marker, NavigationControl} from "react-map-gl";
import {FC, useEffect, useRef, useState} from "react";
import {Property} from "@/types";
import {MAP_BOX_TOKEN} from "../config/env.ts";
import {useProperties} from "@/api";
import {useCriteria} from "@/hooks";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  property: Property
}

const MarkerHit: FC<Props> = ({ property }) => {
  return (
      <Marker key={property.id} longitude={Number(property._geo.lng)} latitude={Number(property._geo.lat)}>
        <div className="p-2">
          <img src="./pin.svg" width={40} height={40} />
        </div>
      </Marker>
  );
};


export const MapSection = () => {
  const [viewState] = useState({
    longitude: -17.858696,
    latitude: 53.957243,
    zoom: 3,
  });


  const {criteria, remove, setParams} = useCriteria();

  const {data: properties } = useProperties({
    criteria: {
      ...criteria,
      size: 100
    }
  });

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const geoBounds = criteria["geoBounds[]"].map(value => value.split(",").reverse()).reverse();

    if (geoBounds.length === 0) return;

    // @ts-ignore
    mapRef.current.fitBounds(geoBounds);


  }, [mapRef.current])

  const handleMapMoveEnd = () => {
      if (mapRef.current) {
        const bounds = mapRef.current.getMap().getBounds();
        if (!bounds) return;
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        const bondingBox = [
          [ne.lat, ne.lng], // northeast
          [sw.lat, sw.lng], // southwest
        ];

        const params = remove("geoBounds");
        params.set("page", "0")

        bondingBox.forEach(value => params.append("geoBounds", value.toString()));

        setParams(params);
      }
  }

  return (
      <Map
          ref={mapRef}
          mapboxAccessToken={MAP_BOX_TOKEN}
          initialViewState={viewState}
          onMoveEnd={handleMapMoveEnd}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {properties?.data?.map((property) => (
            <MarkerHit key={property.id} property={property} />
        ))}
        <NavigationControl />
      </Map>
  )
}