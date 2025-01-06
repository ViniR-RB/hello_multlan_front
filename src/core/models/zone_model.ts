type ZoneType = "MODERATE" | "SAFE" | "DANGER"; // Adicione outras zonas, se necessário

export default interface ZoneData {
  zone: ZoneType;
  zone_count: number;
}
