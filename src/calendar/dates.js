import moment from "moment";

const DaysOfMonth = (month, year, firstDayOfWeek) => {

  const startOfMonth = moment()
    .month(month - 1)
    .year(year)
    .startOf("month");

  const endOfMonth = moment()
    .month(month - 1)
    .year(year)
    .endOf("month");

  const finalsOfPrevMonth = [];
  const currentMonth = [];
  const startsOfNextMonth = [];
  let iteratedDate = null;

  iteratedDate = startOfMonth.clone();

  while (iteratedDate.day() !== firstDayOfWeek) {
    iteratedDate.subtract(1, "day");
    finalsOfPrevMonth.push(iteratedDate.format("L"));
  }

  iteratedDate = startOfMonth.clone();

  while (iteratedDate.month() === month - 1) {
    currentMonth.push(iteratedDate.format("L"));
    iteratedDate.add(1, "day");
  }

  iteratedDate = endOfMonth.clone();

  while (finalsOfPrevMonth.length + currentMonth.length + startsOfNextMonth.length < 42) {
    iteratedDate.add(1, "day");
    startsOfNextMonth.push(iteratedDate.format("L"));
  }

  return [...finalsOfPrevMonth.reverse(), ...currentMonth, ...startsOfNextMonth];

}

export default DaysOfMonth;