import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../../core/http/client";
import BoxSummary from "../../../core/models/box_summary_model";
import AppQuery from "../../../core/querys/appQuery";

export default function MapController() {
  const summary = async () => {
    const response = await httpClient.auth.get<BoxSummary>("/api/box/summary");
    return response.data;
  };

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [AppQuery.getSummary],
    queryFn: summary,
    staleTime: 0,
    refetchOnMount: false,
  });

  const revalideQuerySearchSummary = () => {
    queryClient.invalidateQueries({
      queryKey: [AppQuery.getSummary],
      exact: true,
    });
  };

  return { data, isLoading, error, revalideQuerySearchSummary };
}
