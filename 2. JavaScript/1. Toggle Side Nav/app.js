const navButton = document.querySelector('.toggle');
const nav = document.querySelector('nav');
const body = document.querySelector('body');

const ACTIVE_NAVI = 'active-navigation'

let navActive = false;

const activeNav = () => {
  nav.classList.toggle('active');
  navActive = navActive ? false : true;
  localStorage.setItem(ACTIVE_NAVI, navActive);
};

window.addEventListener('DOMContentLoaded', () => {

  const storageNaveActive = localStorage.getItem(ACTIVE_NAVI);

  if(storageNaveActive === 'true') {
    activeNav();
  };
  body.style.visibility = 'visible';
});

window.addEventListener('load', () => {
  body.classList.remove('preload');
})

navButton.addEventListener('click', activeNav);