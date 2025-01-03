import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../../core/http/client";
import BoxModel from "../../../core/models/box_model";
import Location from "../../../core/models/location";
import AppQuery from "../../../core/querys/appQuery";
import { GeoSerach } from "../../../core/services/geosearch";
import { OpenStreetImpl } from "../../../core/services/openstreet";

export default function MapController() {
  const geoService: GeoSerach = new OpenStreetImpl();
  const queryClient = useQueryClient();

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

  const deleteBox = async (id: string) => {
    await httpClient.auth.delete(`/api/box/${id}`);

    queryClient.invalidateQueries({
      queryKey: [AppQuery.getBoxs],
      exact: true,
    });
  };

  return { data, error, isLoading, getGeoByAddress, deleteBox };
}
