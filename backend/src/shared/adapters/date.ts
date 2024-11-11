import { format as dateFnsFormat, subHours } from 'date-fns';

function format({ date, mask }: { date: Date; mask: string }): string {
  return dateFnsFormat(date, mask);
}

function getCurrentDate(): Date {
  const date = new Date();
  const dateParsed = subHours(date, 3);
  return dateParsed;
}

const dateAdapter = {
  format,
  getCurrentDate,
};

export default dateAdapter;
