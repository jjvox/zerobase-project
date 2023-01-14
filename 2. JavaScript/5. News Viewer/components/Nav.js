
export default class Nav {

  constructor($target, category) {
    this.$target = $target;
    this.category = category;
    this.render();
  };

  template() {
    const $navCategory = document.createElement('nav');
    $navCategory.className = 'category-list';

    $navCategory.innerHTML = `<ul>${this.category.map((element) => {
        return `<li id=${element.id} class="category-item">${element.name}</li>`;
      })
      .join("")}</ul>`;
    
    const allCategory = $navCategory.querySelector('#all');
    allCategory.classList.add('active');
  
    return $navCategory;
  };
    
  setEvent() {
    this.$target.querySelector("ul").addEventListener("click", (e) => {
      const $li = this.$target.querySelectorAll("li");
      if (e.target.id) {
        $li.forEach((element) => element.classList.remove('active'));
      
        e.target.classList.add('active');
      }
    });
  };

  render() {
    this.$target.appendChild(this.template());
    this.setEvent();
  };
};