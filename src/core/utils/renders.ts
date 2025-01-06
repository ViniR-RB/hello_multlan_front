import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs();

export const render_date_br = (date: Date | string) => {
  return dayjs(date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
};

const render_data_box = (box_zone: string) => {
  switch (box_zone) {
    case "MODERATE":
      return "Moderada";
    case "SAFE":
      return "Segura";
    case "DANGER":
      return "Perigosa";
  }
};

export default { render_date_br, render_data_box };
