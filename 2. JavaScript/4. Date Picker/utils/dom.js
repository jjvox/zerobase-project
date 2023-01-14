import {
  getCalMonth,
  drawDay
} from "./utils.js";

export const makeDOM = (domType, property) => {
  const dom = document.createElement(domType);
  Object.keys(property).map((key) => {
    dom[key] = property[key];
  });
  return dom;
};

export function linkCSS() {

  const linkDOM = document.querySelector('head link');
  const cssDOM = makeDOM('link', {
    href: "./calendar/calendarStyle.css",
    rel: "stylesheet"
  });
  
  linkDOM.after(cssDOM);
};

export const setNavDOM = (year, month) => {

  const $calendarNav = makeDOM('nav', {
    className: 'calendar-nav',
  });

  const $calendarArrowLeft = makeDOM('div', {
    className: 'arrow-left',
  });
  const $calendarArrowLeftInner = makeDOM('div', {
    className: 'arrow-left-inner',
  });
  const $calendarArrowRight = makeDOM('div', {
    className: 'arrow-right',
  });
  const $calendarArrowRightInner = makeDOM('div', {
    className: 'arrow-right-inner',
  })
  
  const $calendarMonthYear = makeDOM('div', {
    className: 'calendar-month-year',
  });
  const $calendarMonth = makeDOM('div', {
    className: 'calendar-month',
    innerText: `${getCalMonth(month)}`
  });
  const $calendarYear = makeDOM('div', {
    className: 'calendar-year',
    innerText: year
  });

  $calendarArrowLeft.appendChild($calendarArrowLeftInner);
  $calendarArrowRight.appendChild($calendarArrowRightInner);
  $calendarMonthYear.append($calendarMonth, $calendarYear);
  $calendarNav.append($calendarArrowLeft, $calendarMonthYear, $calendarArrowRight);

  return $calendarNav;
};


// grid

// day

const setDay = () => {

  const $dayContainer = makeDOM('div', {
    className: 'day-container'
  });

  for (let i = 0; i < 7; i++) {

    if (drawDay(i) === 'SUN') {
      let day = makeDOM('div', {
        className: 'day sun',
        innerText: `${drawDay(i)}`
    });
      $dayContainer.appendChild(day);      

    } else {

      let day = makeDOM('div', {
        className: 'day',
        innerText: `${drawDay(i)}`
      });
      $dayContainer.appendChild(day);
    };

  };

  return $dayContainer
};


//date

const monthLastDate = (year, month) => {
  return (new Date(year, month, 0)).getDate();
};
const monthStartDay = (year, month) => {
  return (new Date(year, month, 1)).getDay();
};


export const setGridDOM = (year, month) => {

  const $calendarGrid = makeDOM('div', {
    className: 'calendar-grid',
  });
  const $dateContainer = makeDOM('div', {
  className: 'date-container',
  });

  const setPrevDate = (year, month) => {
    const prevDate = monthLastDate(year, month) - monthStartDay(year, month) + 1;
    const prevLastDate = monthLastDate(year, month);

    for (let i = prevDate; i <= prevLastDate; i++) {
      let date = makeDOM('div', {
          className: 'date'
        });
        let dateInner = makeDOM('div', {
          className: 'date-inner prev',
          innerText: `${i}`
        });
        date.appendChild(dateInner);
        $dateContainer.appendChild(date);
      };
    return $dateContainer
  };

  const setMainDate = (year, month) => {
    const mainLastDate = monthLastDate(year, month + 1);
    const mainDate = monthStartDay(year, month)
    
    for (let i = 1; i <= mainLastDate; i++) {
      if ((mainDate + i) % 7 === 1 ) {
        let date = makeDOM('div', {
          className: 'date'
        });

        let dateInner = makeDOM('div', {
          className: 'date-inner main sun',
          innerText: `${i}`
        });

        dateInner.setAttribute('data-cal',
          `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        );

        date.appendChild(dateInner);
        $dateContainer.appendChild(date);
        
      } else {
        
        let date = makeDOM('div', {
          className: 'date'
        });

        let dateInner = makeDOM('div', {
          className: 'date-inner main',
          innerText: `${i}`
        });

        dateInner.setAttribute('data-cal',
          `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        );

        date.appendChild(dateInner);
        $dateContainer.appendChild(date);
        };
    };
    return $dateContainer
  };
  
  const setNextDate = (year, month) => {
    const prevMainDate = monthStartDay(year, month) + monthLastDate(year, month + 1);
    let nextDate = 0;
    if (28 < prevMainDate && prevMainDate <= 35) {
      nextDate = 35 - prevMainDate;
    } else if (35 < prevMainDate && prevMainDate <= 42) {
      nextDate = 42 - prevMainDate;
    };

    for (let i = 1; i <= nextDate; i++) {
      let date = makeDOM('div', {
        className: 'date'
      });
      let dateInner = makeDOM('div', {
        className: 'date-inner next',
        innerText: `${i}`
      });

      date.appendChild(dateInner);
      $dateContainer.appendChild(date);
    };
  return $dateContainer
};

  $calendarGrid.append(
    setDay(),
    setPrevDate(year, month),
    setMainDate(year, month),
    setNextDate(year, month)
  );

  return $calendarGrid;
};
