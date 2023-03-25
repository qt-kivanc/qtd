import React, { forwardRef, useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from 'axios';
//import "moment/locale/tr";

import DaysOfMonth from './dates.js';
import Day from "./day/Day.jsx";
import Header from "./header/Header.jsx";
import QTDContext from "../context/QTDContext.jsx";

import { Wrapper, Days, WeekShortDays, Separator } from './styled.components';

const Calendar = forwardRef((props, ref) => {

  const { dateFormat, language } = useContext(QTDContext);

  const {
    value = "",
    defaultValue = "",
    className = null,
    onChange = null,
    disabledDate = null
  } = props;

  const [firstDayOfWeek, SetFirstDayOfWeek] = useState(0);
  const [weekdaysShort, SetWeekdaysShort] = useState([]);
  
  const [data, SetData] = useState(null);
  const [dateObject, SetDateObject] = useState(moment());
  const [selectedDay, SetSelectedDay] = useState(null);

  const convertToMoment = (date) => moment(date, "MM/DD/YYYY");
  //const month = () => dateObject.format("MMMM");
  const year = () => dateObject.format("Y");
  //const currentDay = () => dateObject.format("D");
  const monthOrder = () => dateObject.format("M");

  useEffect(() => {

    load();
    formatAndSaveDay(defaultValue);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    formatAndSaveDay(value);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {

    getDays();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateObject]);

  const formatAndSaveDay = (_day) => {

    if ( _day === "" ) return;

    const day = moment(moment(_day, dateFormat), 'MM/DD/YYYY');

    SetSelectedDay(day);
    SetDateObject(day);

  }

  const load = () => {

    axios.get(`/locales/${language}/calendar.json`,)
      .then((response) => {
        success(response.data)
      })
      .catch(function (err) {
        console.error(err);        
      });

  }

  const success = (result) => {  

    moment.locale("en");

    SetData(result);
    SetWeekdaysShort(result.weekdaysShort);
    SetFirstDayOfWeek(result.firstDay);

    /*
    console.table("year");
    console.table(year());
    console.table("currentDay");
    console.table(currentDay());
    console.table("month");
    console.table(month());
    console.table("monthOrder");
    console.table(monthOrder());

    console.log("moment().endOf('day'): " + moment().endOf('day'));
    */

  }

  const isDisabledDate = (current) => {

    if (disabledDate)
      return disabledDate(current);

    return false;

  }

  const handleDayClick = (date) => {

    var localizatedDate = moment(new Date(date)).format(dateFormat);

    if ( onChange ){

      onChange({
        localizated: localizatedDate,
        global: moment(new Date(date)).format("YYYY-MM-DD")
      });

    }

  }

  const getDays = () => {

    const fullDays = DaysOfMonth(monthOrder(), year(), firstDayOfWeek);

    let days = [];

    for(let i=0;i<fullDays.length;i++) {
      
      const date = convertToMoment(fullDays[i]);

      let dayProps = {
        key:i,
        date: date,
        handleClick:handleDayClick
      }

      if ( date.isSame(convertToMoment(moment().format('MM/DD/YYYY'))) )
        dayProps.today = true;

      if ( date.isSame(selectedDay) )
        dayProps.selected = true;
      
      if ( date.format("M") === monthOrder() )
        dayProps.current = true;

      if ( isDisabledDate(date) )
        dayProps.disabled = true;

      days.push(

        <Day {...dayProps}>
          {date.format("D")}
        </Day>

      );
      
    }

    return days;

  }
  
  const getWeekShortDays = () => {

    let days = [];

    for(let i=0;i<weekdaysShort.length;i++) {

      days.push(

        <div key={i}>
          <span>
            {weekdaysShort[i]}
          </span>
        </div>

      );
      
    }

    return days;

  }

  const onPrev = (type) => {
    
    SetDateObject(
      dateObject.clone().subtract(1, type)
    );

  };
  
  const onNext = (type) => {
    
    SetDateObject(
      dateObject.clone().add(1, type)
    );

  };

  const getCalendar = () => (

    <Wrapper className={className}>
      <Header 
        month={data.months[monthOrder()-1]}
        year={year()}
        onPrevYear={() => onPrev("year")}
        onPrevMonth={() => onPrev("month")}
        onNextYear={() => onNext("year")}
        onNextMonth={() => onNext("month")}
      />
      <Separator />
      <WeekShortDays>
        { getWeekShortDays() }
      </WeekShortDays>
      <Days>
        { getDays() }
      </Days>
    </Wrapper>
    
  )

  return !data ? null : getCalendar();

});

export default Calendar;