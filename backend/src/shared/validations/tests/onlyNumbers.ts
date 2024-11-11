import helpers from '@shared/helpers';

function onlyNumbers(text?: string): boolean {
  if (!text) {
    return true;
  }
  const isOnlyNumbers = helpers.verifyOnlyNumbers(text);
  return isOnlyNumbers;
}

export default onlyNumbers;
