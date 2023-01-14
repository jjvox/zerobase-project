import { observe, observable } from "../core/Objerver.js";

export default class NewsList {

  constructor($target) {
    this.$target = $target;
    this.selected = observable({ category: "all" });
    this.$rootDOM = document.querySelector("#root");
    this.$newsListContainer = document.createElement("div");
    this.$newsListContainer.className = "news-list-container";
    this.$newsList = document.createElement("article");
    this.$newsList.className = "news-list";
    this.$scrollDOM = document.createElement("div");
    this.$scrollDOM.className = "scroll-observer";
    this.scrollImage = document.createElement("img");
    this.scrollImage.src = "img/ball-triangle.svg";
    this.scrollImage.alt = "Loading...";
    this.page = 1;
    this.render();
    this.setEvent();
  };

  async getData(num = 1) {
    try {
    const category = this.selected["category"];
    let page = num;
    const pageSize = 5;
    const API_URL = `https://newsapi.org/v2/top-headlines?country=kr&category=${
      category === "all" ? "" : category
    }&page=${page}&pageSize=${pageSize}&apiKey=51ed336bcf294d76a744be905632fb73`;

    const response = await axios.get(API_URL);

    return response.data.articles;
    } catch {
      console.error(error);
    };
  };

  setEvent() {
    this.$target.querySelector("ul").addEventListener("click", (e) => {
      if (e.target.id !== this.selected.category && e.target.id) {

        this.$newsList.innerHTML = "";
        this.page = 1;
        this.selected.category = e.target.id;
      }
    });
  };

  async template(page) {
    const newsData = await this.getData(page);

    newsData.map((item) => {
      const $newsItem = document.createElement("section");
      $newsItem.className = "news-item";

      $newsItem.innerHTML = `<div class="thumbnail">
              <a href=${item.url} target="_blank" rel="noopener noreferrer">
                <img
                  src=${item.urlToImage}
                  alt="thumbnail" />
              </a>
            </div>
            <div class="contents">
              <h2>
                <a href=${item.url} target="_blank" rel="noopener noreferrer">
                  ${item.title}
                </a>
              </h2>
              <p>
                ${item.description}
              </p>
            </div>`;
      this.$newsList.appendChild($newsItem);
    });

    if (
      newsData && this.$rootDOM.offsetHeight < document.documentElement.clientHeight
    ) {
      this.template(++this.page);
    };
    this.scrollImage.style.opacity = "0";
  };

  scrollEvent() {
    const options = {
      rootMargin: "0px",
      threshold: 1,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          if (this.$newsList.children.length >= 5) {
          this.scrollImage.style.opacity = '1'
          this.template(++this.page);
          } 
        };
      });
    };

    const observer = new IntersectionObserver(callback, options);
    
    observer.observe(this.scrollImage);
  };

  render() {
    observe(() => this.template());

    this.$scrollDOM.appendChild(this.scrollImage);
    this.$newsListContainer.append(this.$newsList, this.$scrollDOM);
    this.$target.append(this.$newsListContainer);

    this.scrollEvent();
  };
};
