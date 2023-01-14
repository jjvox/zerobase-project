import {
  makeDOM,
  linkCSS,
  setNavDOM,
  setGridDOM
} from "../utils/dom.js"

linkCSS();

const CALENDAR_MIN_WIDTH = 250;
const CALENDAR_MAX_WIDTH = 500;
const STORAGE_DATE_KEY = 'selected-date';

const $bodyDOM = document.querySelector('body');
const $inputButton = document.querySelector('input');

const $calendarContainer = makeDOM('div', {
  className: 'calendar',
});

const today = new Date();

const setCalendarDOM = (year, month, min, max) => {  // 달력 그리기
  
  const calendarNav = setNavDOM(year,month);
  const calendarGrid = setGridDOM(year,month);
  
  $calendarContainer.append(calendarNav, calendarGrid);
  $bodyDOM.appendChild($calendarContainer);

  $calendarContainer.style.setProperty('--min-width', `max(${min}px, 100%)`);
  $calendarContainer.style.setProperty('--max-width', `${max}px`);

  const now = `${year}-${String(month + 1).padStart(2, '0')}-01`
    
  localStorage.setItem(STORAGE_DATE_KEY,now)
};

setCalendarDOM(today.getFullYear(), today.getMonth(), CALENDAR_MIN_WIDTH, CALENDAR_MAX_WIDTH);


const arrowEvent = () => {

  const $arrowLeft = document.querySelector('.arrow-left');
  const $arrowRight = document.querySelector('.arrow-right');
  const storageYear = localStorage.getItem(STORAGE_DATE_KEY).split('-')[0];
  const storageMonth = localStorage.getItem(STORAGE_DATE_KEY).split('-')[1];

  $arrowRight.addEventListener('click', () => {
    $calendarContainer.innerHTML = '';
    $calendarContainer.remove();

    const rightMonth = Number(storageMonth) === 12 ? 0 : Number(storageMonth);
    const rightYear = Number(storageMonth) === 12 ? Number(storageYear)+1 : Number(storageYear);
    setCalendarDOM(rightYear, rightMonth, CALENDAR_MIN_WIDTH, CALENDAR_MAX_WIDTH);
    arrowEvent();
  });
  

  $arrowLeft.addEventListener('click', () => {
    $calendarContainer.innerHTML = '';
    $calendarContainer.remove();
    
    const leftMonth = Number(storageMonth) - 2 === -1 ? 11 : Number(storageMonth) - 2; 
    const leftYear = Number(storageMonth) - 2 === -1 ? Number(storageYear)-1 : Number(storageYear);
    
    setCalendarDOM(leftYear, leftMonth, CALENDAR_MIN_WIDTH, CALENDAR_MAX_WIDTH);
    arrowEvent();
  });
};
  

window.addEventListener('DOMContentLoaded', () => {
  $bodyDOM.style.visibility = 'visible';
  
  const now = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
  localStorage.setItem(STORAGE_DATE_KEY, now)
    
  const $dateInner = document.querySelectorAll('.date-inner.main');
    
  $dateInner.forEach((element) => {
    if (element.dataset.cal === now) {
      element.style.setProperty('--border', '1px solid yellowgreen');
      element.style.setProperty('--border_radius', '50%');
    };
  });
});

$inputButton.addEventListener('click', (e) => {
  $calendarContainer.classList.toggle('active');
});

window.addEventListener('click', (e) => {
  
  let node;
  e.path.find((element) => {
    node = String(element.className).includes('calendar') ? true : node;
  });
  if (node) return;
  
  const inputButton = e.target.localName
  if (inputButton === 'input') return;
  
  $calendarContainer.classList.remove('active');
});

$calendarContainer.addEventListener('click', (e) => {
  const $dateInner = document.querySelectorAll('.date-inner.main');
  const selectedDate = e.target.dataset.cal
  if (selectedDate) {
    $inputButton.value = selectedDate;
  };
  
  $dateInner.forEach((element) => {
    element.style.setProperty('--border', '');
    element.style.setProperty('--border_radius', '');
  });
  
  if (e.target.classList.contains('main')) {
    e.target.style.setProperty('--border', '1px solid greenyellow');
    e.target.style.setProperty('--border_radius', '50%');
  }
  
  if (selectedDate === localStorage.getItem(STORAGE_DATE_KEY)) {
    e.target.style.setProperty('--border', '');
    e.target.style.setProperty('--border_radius', '');
    localStorage.removeItem(STORAGE_DATE_KEY);
    $inputButton.value = '';
  } else if (selectedDate) {
    localStorage.setItem(STORAGE_DATE_KEY, selectedDate)
  }

});


arrowEvent();