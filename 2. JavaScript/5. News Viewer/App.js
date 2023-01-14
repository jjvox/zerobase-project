import { Nav, NewsList } from "./components/index.js";

class App {
  constructor() {
    const $root = document.querySelector("#root");

    const category = [
      {
        id: 'all',
        name: '전체보기'
      },
      {
        id: 'business',
        name: '비즈니스'
      },
      {
        id: 'entertainment',
        name: '엔터테인먼트'
      },
      {
        id: 'health',
        name: '건강'
      },
      {
        id: 'science',
        name: '과학'
      },
      {
        id: 'sports',
        name: '스포츠'
      },
      {
        id: 'technology',
        name: '기술'
      }
    ];

    new Nav($root, category);
    new NewsList($root);
  }
};

new App();
