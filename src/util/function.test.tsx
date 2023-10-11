import { getDateDDMMYYYY } from '../util/function';

test('current date in dd-MM-yyyy format', () => {
  const date = new Date();
  const stringDate = getDateDDMMYYYY(date);
  expect(stringDate.length).toBe(16);
  expect(stringDate.substring(0, 2)).toBe(('0' + (date.getDate() + 1)).slice(-2));
});
