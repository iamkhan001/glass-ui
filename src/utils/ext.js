import Moment from 'moment';

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

export const formatDate = (value) => {
  try{
    // Moment.locale('en');
    const dt = '2016-05-02T00:00:00';
    return Moment(dt).format('dddd Do MMM YYYY hh:mm a');
  }catch (e) {
    console.log(e);
  }
  return value;
} 