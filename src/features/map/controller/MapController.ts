import { httpClient } from "../../../core/http/client";

export default function MapController() {
  const getBox = async () => {
    const result = await httpClient.auth.get("/api/box");
    console.log(result.data);

    return result.data;
  };

  return { getBox };
}
