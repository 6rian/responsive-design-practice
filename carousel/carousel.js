class Carousel {
  constructor(element) {
    this.container = element;
    this.init();
  }

  init() {
    console.log('init');
  }
}

var carouselEl = document.querySelector('.carousel');
var carousel = new Carousel(carouselEl);