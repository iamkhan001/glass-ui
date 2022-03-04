import Moment from 'moment';
import moment from 'moment-timezone';

export const getRoleId = (r) => {
    if(r === 'Member') {
      return "U";
    }
    return "A";
  }

export const getRoleName = (r) => {
    if(r === 'U') {
      return "Member";
    }
    return "Admin";
}

export default getRoleName

export const dateToShowFormat = (value, zone) => {
  try{
    // Moment.locale('en');
    return Moment(value).tz(zone).format('dddd Do MMM YYYY hh:mm a');
  }catch (e) {
    console.log(e);
  }
  return value;
} 

export const dateToServerFormat = (date, time) => {
  try{
    // Moment.locale('en');
    return `${Moment(date).format("YYYY-MM-DD")}T${time}:00Z`
  }catch (e) {
    console.log(e);
  }
  return `${date}T${time}`;
} 

export function getTimeZone(){
  return moment.tz.guess();
}