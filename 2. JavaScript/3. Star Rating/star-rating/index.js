const $children = document.querySelector('link:last-of-type');


const makeDOM = (domType, property) => { 
  const dom = document.createElement(domType);
  Object.keys(property).map((key) => {
    dom[key] = property[key];
  });
  return dom;
};

const boxicons = makeDOM('link', {
  href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
  rel: 'stylesheet'
});
const cssDOM = makeDOM('link', {
  href: "star-rating/theme.css",
  rel: "stylesheet"
});
$children.after(boxicons, cssDOM);



export default function starRatingfnc(container) {
  
  const starRatingContainer = makeDOM('div', {
    className: 'star-rating-container'
  });

  for (let i = 0; i < container.dataset.maxRating; i++) {
    let starDOM = makeDOM('i', {
      className: `bx bxs-star`,
    });
    starDOM.setAttribute('data-id',`${i}`)
    starRatingContainer.appendChild(starDOM);
  };
  container.appendChild(starRatingContainer);


  const iconAll = document.querySelectorAll('i');

  starRatingContainer.addEventListener('mouseover', (e) => {
    let icon = e.target
    if (icon.nextSibling?.classList.contains('hovered')) {
      icon.nextSibling.classList.remove('hovered');
    }
    for (let i = 0; i <= e.target.dataset.id; i++) {
      icon.classList.add('hovered');
      icon = icon.previousSibling;
    };
  });

  starRatingContainer.addEventListener('mouseleave', () => {
    iconAll.forEach((e) => e.classList.remove('hovered'));
  });

  starRatingContainer.addEventListener('click', (e) => {
    let icon = e.target;
    const parent = icon.parentNode 
    const child = parent.childNodes 
    const id = e.target.dataset.id;

    const ratingChangeFnc = (num) => {
      if (isNaN(num)) return;
      let ratingChange = new CustomEvent('rating-change', {
        detail: `${num}`
      });
      container.dispatchEvent(ratingChange);
    };
    
    const ratingRemove = () => {
      child.forEach((element) => element.classList.remove('selected'));
    };

    const ratingMake = () => {
      for (let i = 0; i <= id; i++) {
        icon.classList.add('selected');
        icon = icon.previousSibling;
      };  
    }

    if (icon.classList.contains('selected') && !icon.nextSibling?.classList.contains('selected')) {
      ratingRemove()
      ratingChangeFnc(0)

    } else if (icon.classList.contains('selected')) {
      ratingRemove();
      ratingMake();
      ratingChangeFnc(Number(id) + 1);

    } else {
      ratingMake();
      ratingChangeFnc(Number(id) + 1);    
    } 
  });


};  