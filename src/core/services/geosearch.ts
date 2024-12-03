import axios from "axios";
import EnvConfig from "../enviroment";
import Location from "../models/location";

export interface GeoSerach {
  serachByAddres(address: string): Promise<Location[]>;
}

export class GeoSearchImpl implements GeoSerach {
  enviroment: EnvConfig;

  constructor() {
    this.enviroment = EnvConfig.getInstance();
  }
  async serachByAddres(address: string) {
    try {
      const apiKey = this.enviroment.VITE_GEOSEARCH_API_KEY;
      const apiUrl = this.enviroment.VITE_GEOSEARCH_API_URL;
      const endpoint = apiUrl + `?q=${address}&key=${apiKey}`;
      const response = await axios.get(endpoint);
      const data = response.data.results as Array<any>;

      const locations = data.map((locations) => Location.fromJson(locations));

      return locations;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
