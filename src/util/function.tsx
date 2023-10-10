export const getHeader = () => {
  if (localStorage.getItem('accessToken')) {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    };
  } else return { 'Content-Type': 'application/json', Accept: 'application/json' };
};

export const getAuthHeader = () => {
  if (localStorage.getItem('accessToken')) {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    };
  } else return null;
};

export const getDateDDMMYYYY = (date: Date) => {
  return (
    ('0' + (date.getDate() + 1)).slice(-2) +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    date.getFullYear() +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2));
};
