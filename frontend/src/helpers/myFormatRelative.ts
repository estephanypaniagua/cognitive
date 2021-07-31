import { formatRelative } from "date-fns";
import { es } from "date-fns/locale";

const removeOffsetToDate = (date: Date) => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};

const myFormatRelative = (dateInput: Date) => {
  const result = formatRelative(removeOffsetToDate(dateInput), new Date(), { locale: es });
  return result;
};

export default myFormatRelative;
