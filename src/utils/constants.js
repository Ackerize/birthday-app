import moment from "moment";

export const API_URL = "https://birthday-reminder-app-api.herokuapp.com";

const addYear = (date) => {
  const aux = new Date(date);
  const tomorrow = new Date(date);
  tomorrow.setFullYear(aux.getFullYear() + 1);
  return tomorrow;
}

export const formatMySQLDate = (date) => moment(date).format("YYYY-MM-DD");

export const fomartItemDate = (date) => {
  return moment(date).add(1, 'days').format("MMMM D");
};

export const diffTotal = (date) => {
  const today = moment().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  
  const target = moment(date).add(1, 'days').set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  return today.diff(target, 'days');
}

export const diffDays = (date) => {
  const today = moment()
  const totalDiff = diffTotal(date);

  if(totalDiff <= 0){
    return totalDiff * -1;
  }else if(totalDiff > 0){
    const newDate = moment(addYear(date))
    const diff = newDate.diff(today, 'days')
    return diff;
  }
}