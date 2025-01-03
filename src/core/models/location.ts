export default class Location {
  label: string;
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number, label: string) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.label = label;
  }

  static fromJsonGeoSearch(json: any) {
    const { lat, lng } = json.geometry;
    const label = json.formatted;
    return new Location(lat, lng, label);
  }
  static fromJsonOpenStreet(json: any) {
    const { lat, lon, display_name } = json;

    return new Location(lat, lon, display_name);
  }
}
