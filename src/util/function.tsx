export const generateRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
