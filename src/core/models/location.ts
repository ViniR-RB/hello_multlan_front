export default class Location {
  label: string;
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number, label: string) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.label = label;
  }

  static fromJson(json: any) {
    const { lat, lng } = json.geometry;
    const label = json.formatted;
    return new Location(lat, lng, label);
  }
}
