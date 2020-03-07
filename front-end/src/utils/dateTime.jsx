import { weeksMonths } from "../constants/weeksMonths";

export default function eventCardDate(date) {
  const modHrs = date.getHours() % 12;
  return (
    weeksMonths.daysOfWeek[date.getDay()] +
    ", " +
    weeksMonths.months[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    (date.getHours() / 12 < 1
      ? (date.getHours() === 0
          ? 12
          : date.getHours() < 10
            ? "0" + date.getHours()
            : date.getHours()) +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        " AM"
      : (modHrs === 0 ? 12 : modHrs < 10 ? "0" + modHrs : modHrs) +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        " PM")
  );
}
