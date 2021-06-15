import moment from "moment";

export const API_URL = "http://localhost:3001";

const addYear = (date) => {
  const aux = new Date(date);
  const tomorrow = new Date(date);
  tomorrow.setFullYear(aux.getFullYear() + 1);
  return tomorrow;
}

export const formatMySQLDate = (date) => moment(date).format("YYYY-MM-DD");

export const fomartItemDate = (date) => {
  moment.locale("es");
  return moment(date).format("MMMM D");
};

export const diffDays = (date) => {
  const today = moment()
  const target = moment(date);
  const totalDiff = today.diff(target, 'days');

  if(totalDiff <= 0){
    return totalDiff * -1;
  }else if(totalDiff > 0){
    const newDate = moment(addYear(date))
    return newDate.diff(today, 'days');
  }
}
