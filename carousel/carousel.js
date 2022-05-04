// ================================================
// Generate Demo Content
// ================================================
const NUM_SLIDES_TO_MAKE = 5;

const getRandomImageUrl = () => {
  const random = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/500/400/?${random}`;
};

const makePhotoCards = () => {
  const photos = [];

  for (let i=0; i<NUM_SLIDES_TO_MAKE; i++) {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');
    const image = new Image();
    image.src = getRandomImageUrl();
    photoCard.appendChild(image);
    photos.push(photoCard);
  }

  return photos;
}

// ================================================
// Carousel
// ================================================

class Carousel {
  ACTIVE_CLASS = 'active';
  SLIDES_CONTAINER_CLASS = 'slides';
  SLIDE_CLASS = 'slide';

  constructor(element) {
    this.container = element;
    this.slidesContainer = this.container.querySelector(`.${this.SLIDES_CONTAINER_CLASS}`);
  }

  setCurrentIndex(n) {
    this.container.dataset.currentIndex = n;
  }
  
  getCurrentIndex() {
    return parseInt(this.container.dataset.currentIndex);
  }
  
  makeAndAppendSlide(content) {
    const slide = document.createElement('div');
    slide.classList.add(this.SLIDE_CLASS);
    slide.appendChild(content);
    this.slidesContainer.appendChild(slide);
  }

  getCurrentSlide() {
    return this.slidesContainer.querySelector(`.${this.ACTIVE_CLASS}`);
  }

  setActiveSlide(n) {
    const current = this.getCurrentSlide();
    if (current) {
      current.classList.remove(this.ACTIVE_CLASS);
    }

    const next = this.slidesContainer.children[n];
    next.classList.add(this.ACTIVE_CLASS);
    this.setCurrentIndex(n);
  }

  debug() {
    console.log({
      slidesContainer: this.slidesContainer,
      currentIndex: this.getCurrentIndex(),
      currentSlide: this.slidesContainer.children[this.getCurrentIndex()]
    });
  }

  start() {
    this.setCurrentIndex(0);
    this.setActiveSlide(0);
    this.debug();
  }
}

// ================================================
// Main
// ================================================

var carouselEl = document.querySelector('.carousel');
var carousel = new Carousel(carouselEl);

const photos = makePhotoCards();
photos.forEach(photo => carousel.makeAndAppendSlide(photo));

carousel.start();
