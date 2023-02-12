import Moment from 'moment';
import 'moment-timezone';
//import "moment/locale/tr";

/*
 *
 * 
 *
 */  
export function FormatSimpleDate(date, locale = 'tr', format = 'D MMMM YYYY') {

  //return Moment(date).tz("Europe/Istanbul").format('D MMMM YYYY');
  return Moment(new Date(date)).locale(locale).format(format);
  //return Moment(date).locale('en').format('MMMM D YYYY ');

}

/*
 *
 * 
 *
 */  
export function FormatDate(date, locale = 'tr', format = 'D MMMM YYYY dddd') {

  //return Moment(date).tz("Europe/Istanbul").format('D MMMM YYYY dddd');
  return Moment(new Date(date)).locale(locale).format(format);
  //return Moment(date).locale('en').format('dddd, MMMM D YYYY ');

}

/*
 *
 * 
 *
 */  
export function FormatTime(time, locale = 'tr', format = 'HH:mm') {

  //return Moment(time).tz("Europe/Istanbul").format('HH:mm');
  return Moment(time).locale(locale).format(format);

}

/*
 *
 * 
 *
 */  
export function FormatDateTime(date, locale = 'tr', format = 'D MMMM YYYY dddd - HH:mm') {

  //return Moment(time).tz("Europe/Istanbul").format('D MMMM YYYY dddd - HH:mm');
  return Moment(new Date(date)).locale(locale).format(format);

}

/*
 *
 * 
 *
 */  
export function FormatSimpleDateTime(date, locale = 'tr', format = 'MM/DD/YYYY - HH:mm') {

  //return Moment(time).tz("Europe/Istanbul").format('MM/DD/YYYY - HH:mm');
  return Moment(new Date(date)).locale(locale).format(format);

}
