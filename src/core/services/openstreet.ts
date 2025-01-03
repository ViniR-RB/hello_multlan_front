import axios from "axios";
import EnvConfig from "../enviroment";
import Location from "../models/location";
import { GeoSerach } from "./geosearch";

export class OpenStreetImpl implements GeoSerach {
  enviroment: EnvConfig;

  constructor() {
    this.enviroment = EnvConfig.getInstance();
  }
  async serachByAddres(address: string) {
    try {
      const apiUrl = this.enviroment.VITE_GEOSEARCH_API_URL;
      const endpoint = apiUrl + `?q=${address}&format=json`;
      const response = await axios.get(endpoint);
      const data = response.data as Array<any>;
      const locations = data.map((locations) =>
        Location.fromJsonOpenStreet(locations)
      );
      return locations;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
