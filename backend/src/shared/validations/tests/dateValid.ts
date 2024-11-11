import { isValid } from 'date-fns';

function dateValid(date?: string): boolean {
  if (!date) {
    return true;
  }
  const dateParsed = new Date(date);
  return isValid(dateParsed);
}

export default dateValid;
