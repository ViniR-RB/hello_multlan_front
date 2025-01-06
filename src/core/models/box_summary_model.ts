import ZoneData from "./zone_model";

export default interface BoxSummary {
  totalBoxes: number;
  totalCustomers: number;
  zoneInfo: ZoneData[];
}
