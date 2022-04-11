export const dateCalc = (value) => {
  const result = new Date();
  result.setTime(value);
  const year = result.getFullYear();
  let month = result.getMonth() + 1;
  let date = result.getDate();
  const hour = result.getHours();
  const min = result.getMinutes();
  const second = result.getSeconds();

  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;

  return `${year}-${month}-${date} @ ${hour}:${min}:${second}`;
};

export const thirtySecondsBeforeNow = () => new Date().getTime() - 40000;

export const dateConvert = (value = null) => {
  const result = new Date(value).getTime();

  return result;
};
