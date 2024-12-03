import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../core/http/client";
import BoxModel from "../../../core/models/box_model";
import Location from "../../../core/models/location";
import AppQuery from "../../../core/querys/appQuery";
import { GeoSearchImpl, GeoSerach } from "../../../core/services/geosearch";

export default function MapController() {
  const geoService: GeoSerach = new GeoSearchImpl();

  const getBox = async () => {
    const { data } = await httpClient.auth.get("/api/box");
    return data;
  };

  const { data, error, isLoading } = useQuery<BoxModel[]>({
    queryKey: [AppQuery.getBoxs],
    queryFn: getBox,
    staleTime: 0,
    refetchOnMount: false,
  });

  const getGeoByAddress = async (address: string): Promise<Location[]> => {
    return geoService.serachByAddres(address);
  };

  return { data, error, isLoading, getGeoByAddress };
}
