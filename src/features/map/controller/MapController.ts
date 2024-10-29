import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../core/http/client";
import BoxModel from "../../../core/models/box_model";
import AppQuery from "../../../core/querys/appQuery";

export default function MapController() {
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

  return { data, error, isLoading };
}
