export const getCalMonth = (month) => {
  let calMonth;
  switch (month) {
    case 0: calMonth = 'January';
      break;
    case 1: calMonth = 'February';
      break;
    case 2: calMonth = 'March';
      break;
    case 3: calMonth = 'April';
      break;
    case 4: calMonth = 'May';
      break;
    case 5: calMonth = 'Jun';
      break;
    case 6: calMonth = 'July';
      break;
    case 7: calMonth = 'Agust';
      break;
    case 8: calMonth = 'September'
      break;
    case 9: calMonth = 'October';
      break;
    case 10: calMonth = 'November';
      break;
    case 11: calMonth = 'December';
      break;
    default: calMonth = 'Month'
  };

  return calMonth;
};

export const drawDay = (num) => {
    let calDay; 
  switch (num) {
    case 0: calDay = 'SUN';
      break;
    case 1: calDay = 'MON';
      break;
    case 2: calDay = 'TUE';
      break;
    case 3: calDay = 'WED';
      break;
    case 4: calDay = 'THU';
      break;
    case 5: calDay = 'FRI';
      break;
    case 6: calDay = 'SAT';
      break;
    default: calDay = 'Day';
  };

  return calDay;
}
