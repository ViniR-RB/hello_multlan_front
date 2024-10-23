import { httpClient } from "../../../core/http/client";

export default function MapController() {
  const summary = async () => {
    const response = await httpClient.auth.get("/api/box/summary");
    console.log(response.data);
    return response.data;
  };

  return { summary };
}
