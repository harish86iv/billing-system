import moment from 'moment';


export const formatDate=(date:any,format?:string)=>{
  return moment(date).format(format || 'MMM-DD-yyyy');
}