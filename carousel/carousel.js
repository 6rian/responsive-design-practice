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
  PREV_BUTTON_CLASS = 'prev';
  NEXT_BUTTON_CLASS = 'next';

  constructor(element) {
    this.container = element;
    this.slidesContainer = this.container.querySelector(`.${this.SLIDES_CONTAINER_CLASS}`);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  setCurrentIndex(n) {
    this.container.dataset.currentIndex = n;
  }
  
  getCurrentIndex() {
    return parseInt(this.container.dataset.currentIndex);
  }

  getMaxIndex() {
    return (this.countSlides() > 0) ? this.countSlides() - 1 : 0;
  }

  countSlides() {
    return this.slidesContainer.children.length;
  }

  prev() {
    let nextIndex = this.getCurrentIndex() - 1;
    if (nextIndex < 0) {
      nextIndex = this.getMaxIndex();
    }
    this.setActiveSlide(nextIndex);
  }

  next() {
    const nextIndex = (this.getCurrentIndex() + 1) % this.countSlides();
    this.setActiveSlide(nextIndex);
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

    const prevButton = this.container.querySelector(`.${this.PREV_BUTTON_CLASS}`);
    const nextButton = this.container.querySelector(`.${this.NEXT_BUTTON_CLASS}`);
    prevButton.addEventListener('click', this.prev);
    nextButton.addEventListener('click', this.next);
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
