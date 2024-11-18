import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs();

const render_date_br = (date: Date | string) => {
  return dayjs(date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
};

export default render_date_br;
