export default interface BoxModel {
  id: string;
  label: string;
  latitude: string;
  longitude: string;
  freeSpace: number;
  filledSpace: number;
  signal: number;
  listUser: Array<string>;
  note: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}
