import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../core/http/client";
import AppQuery from "../../../core/querys/appQuery";

export default function MapController() {
  const summary = async () => {
    const response = await httpClient.auth.get("/api/box/summary");
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [AppQuery.getSummary],
    queryFn: summary,
    staleTime: 0,
    refetchOnMount: false,
  });

  return { data, isLoading, error };
}
